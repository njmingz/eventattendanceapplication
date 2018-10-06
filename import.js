const fs = require('fs');
const importFilePath = "C:/Users/njmin/Desktop/guestName_UUID.csv";
const Datastore = require('@google-cloud/datastore');
const kind = 'Guest';
const datastore = Datastore({
    project: 'WeddingGuestAppHost',
    keyFilename: './secret/WeddingGuestAppHost-44a3193cf057.json'
});

const getRandomInt = () => {
    return Math.floor(Math.random() * Math.floor(36));
}

const insert_data = (lines, count) =>{
    if(count < lines.length){
		if(lines[count] == ""){
			let temp_count = count + 1;
			insert_data(lines, temp_count)
		}
		let temp = lines[count].split(',');
        let temp_data = {
            guestName:temp[1]==""?temp[0]:temp[0] + " (" + temp[1] + ")", 
            UUID:temp[2],
            relationship:temp[3],
            side:temp[4],
            hadArrived:false,
            modifiedDatetime:new Date(0),
            tableNumber:temp[5]

        };
        let taskKey = datastore.key(kind);
        let insertEntity = {
            key:taskKey,
            data:temp_data
        }
        datastore.insert(insertEntity).then(()=>{
            console.log("success",count,temp[0]);
            let temp_count = count + 1;
            insert_data(lines, temp_count)
        });
    }
    else{
        console.log('complete');
        return;
    }
}

const main = () =>{
    const query = datastore.createQuery('Guest').order('tableNumber');
    let filecontent = fs.readFileSync(importFilePath,{encoding:"utf8"});
    let lines = filecontent.split('\r\n');
    insert_data(lines, 0);
    /*
    return datastore.runQuery(query).then((results)=>{
        const entities = results[0];
        resolve(entities);
        console.log("["+dateNow()+"]func DONE. getAllGuest.");
    }).catch((err)=>{
        reject(err);
        console.log("["+dateNow()+"]func ERROR. getAllGuest.");
    });*/
}

main()