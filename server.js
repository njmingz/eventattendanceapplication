const express = require('express');
const fs = require('fs');
const moment = require('moment');
const Promise = require('bluebird');

//CSV to be in format "DisplayName,UUID,SeatNo";
const guestListPath = './static/guestList.csv';

const app = express();
const port = 80;

Promise.promisifyAll(fs);

const dateNow = () => {
    return moment().format();
}

app.use(express.static('dist'));

app.get('/api/getGuestList',(req, res)=>{
    console.log("["+dateNow()+"]API Enter. /api/getGuestList.");
    fs.readFileAsync(guestListPath,"utf8").then((data)=>{
        console.log("["+dateNow()+"]readFile at "+ guestListPath +".");
        let lines = data.split('\r\n');
        let guestList = [];
        for(let i=0; i<lines.length; i ++){
            let tempReadLine = lines[i].split(',');
            guestList.push({
                "displayName":tempReadLine[0],
                "UUID":tempReadLine[1],
                "table":tempReadLine[2],
                "arrived":false
            })
        }
        console.log("["+dateNow()+"]readFile DONE.");
        res.send({"success":true, 'guestList':guestList});
        console.log("["+dateNow()+"]API DONE. /api/getGuestList.");
    }).catch((err)=>{
        console.log("["+dateNow()+"]Error occurred. /api/getGuestList.", err.Error);
    });
});

app.listen(port, () => console.log("Listening on port, " + port + "."));