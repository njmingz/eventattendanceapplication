const express = require('express');
const fs = require('fs');
const moment = require('moment');
const Promise = require('bluebird');
const bodyParser = require('body-parser');
const Datastore = require('@google-cloud/datastore');
const production = true;

const app = express();
app.enable('trust proxy');
const port = 8080;
const datastore = production? Datastore(): Datastore({
    project: 'WeddingGuestAppHost',
    keyFilename: 'secret/WeddingGuestAppHost-44a3193cf057.json'
});

Promise.promisifyAll(fs);

const dateNow = () => {
    return moment().format();
}

const getAllGuest = () =>{
    console.log("["+dateNow()+"]func ENTER. getAllGuest.");
    return new Promise((resolve, reject)=>{
        const query = datastore.createQuery('Guest').order('tableNumber');
        return datastore.runQuery(query).then((results)=>{
            //console.log("results", results);
            let bride_family =[], bride_friend =[], bride_colleague =[];
            let groom_family =[], groom_friend =[], groom_colleague =[];
            for(let i=0; i< results[0].length; i++){
                let val =  results[0][i];
                //console.log("val",val);
                if(val.side.toLowerCase() == "bride"){
                    //console.log("val_side_bride_relationship",val.relationship.toLowerCase());
                    if(val.relationship.toLowerCase() == "family"){
                        bride_family.push({label:val.guestName,value:val.UUID});
                    }
                    else if(val.relationship.toLowerCase() =="friend"){
                        bride_friend.push({label:val.guestName,value:val.UUID});
                    }
                    else{
                        bride_colleague.push({label:val.guestName,value:val.UUID});
                    }
                }
                else{
                    //console.log("val_side_groom_relationship",val.relationship.toLowerCase());
                    if(val.relationship.toLowerCase() == "family"){
                        groom_family.push({label:val.guestName,value:val.UUID});
                    }
                    else if(val.relationship.toLowerCase() == "friend"){
                        groom_friend.push({label:val.guestName,value:val.UUID});
                    }
                    else{
                        groom_colleague.push({label:val.guestName,value:val.UUID});
                    }
                }
            }
            //console.log("groom_colleague",groom_colleague)
            let entities ={bride:{}, groom:{}};
            entities["bride"]={
                family:bride_family,
                friend:bride_friend,
                colleague:bride_colleague
            };
            entities["groom"] = {
                family:groom_family,
                friend:groom_friend,
                colleague:groom_colleague
            };
            resolve(entities);
            console.log("["+dateNow()+"]func DONE. getAllGuest.");
        }).catch((err)=>{
            reject(err);
            console.log("["+dateNow()+"]func ERROR. getAllGuest.");
        });
    });
}

const getNotArriveGuest = () =>{
    return  new Promise((resolve, reject)=>{
        console.log("["+dateNow()+"]func ENTER. getNotArriveGuest.");
        const query = datastore.createQuery('Guest').filter('hadArrived',false).order('tableNumber');
        return datastore.runQuery(query).then((results)=>{
            const entities = results[0];
            resolve(entities);
            console.log("["+dateNow()+"]func DONE. getNotArriveGuest.");
        }).catch((err)=>{
            reject(err);
            console.log("["+dateNow()+"]func ERROR. getNotArriveGuest.");
        });
    });
}

const queryGuestWithUUID = (uuid) => {
    console.log("["+dateNow()+"]func ENTER. queryGuestWithUUID.", uuid);
    return new Promise((resolve, reject)=>{
        const query = datastore.createQuery('Guest').filter('UUID', uuid);
        return datastore.runQuery(query).then((results)=>{
            const entities = results[0];
            resolve(entities);
            console.log("["+dateNow()+"]func DONE. queryGuestWithUUID.");
        }).catch((err)=>{
            reject(err);
            console.log("["+dateNow()+"]func ERROR. queryGuestWithUUID.");
        });
    });
}

const updateGuestArrival = (uuid) =>{
    console.log("["+dateNow()+"]func ENTER. updateGuestArrival.");
    return new Promise((resolve, reject)=>{
        queryGuestWithUUID(uuid).then((result) => {
            console.log("["+dateNow()+"]updateGuestArrival. numGuestRetuned:", result.length);
            let guest = result[0];
            console.log("["+dateNow()+"]updateGuestArrival. guest:", guest[Datastore.KEY]['id']);
            if(guest.hadArrived){
                console.log("["+dateNow()+"]updateGuestArrival. Guest already arrived.");
                resolve(guest);
            }
            else{
                console.log("["+dateNow()+"]updateGuestArrival. Guest arrive.");
                guest.hadArrived = true;
                guest.modifiedDatetime = new Date();
                datastore.save(guest).then(()=>{
                    resolve(guest);
                    console.log("["+dateNow()+"]func DONE. updateGuestArrival.");
                }).catch((err)=>{
                    reject(err);
                    console.log("["+dateNow()+"]func ERROR. updateGuestArrival.");
                })
            }
        }).catch((err) =>{
            reject(err);
        })
    });
}

app.use(bodyParser.json());

app.get('/api/getAllGuest',(req, res)=>{
    console.log("["+dateNow()+"]API ENTER. /api/getAllGuest.");
    getAllGuest().then((result) => {
        res.send({"success":true, 'guestList':result});
        console.log("["+dateNow()+"]API DONE. /api/getAllGuest.");
    }).catch((err)=>{
        console.log("["+dateNow()+"]API ERROR. /api/getAllGuest.", err.Error);
        res.send({"success":false});
    });
});

app.post('/api/postUpdateGuestArrival', (req, res)=>{
    let uuid = req.body.uuid;
    console.log("["+dateNow()+"]API ENTER. /api/postUpdateGuestArrival.");
    updateGuestArrival(uuid).then((result) => {
        res.send({"success":true, 'guest':result});
        console.log("["+dateNow()+"]API DONE. /api/postUpdateGuestArrival.");
    }).catch((err)=>{
        console.log("["+dateNow()+"]API ERROR. /api/postUpdateGuestArrival.", err.Error);
        res.send({"success":false});
    });
});
app.use('/',express.static('dist'));
app.get('/*', (req, res) => {
    console.log("dirname", __dirname);
    res.sendFile(__dirname + '/dist/index.html');
})

app.listen(port, () => console.log("Listening on port, " + port + "."));