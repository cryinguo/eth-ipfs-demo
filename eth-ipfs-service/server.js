const express = require("express");
const Mongo = require('./mongo')
const config = require('./config')

const app = express();
const mongo = new Mongo();

app.get('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    let cid = req.query.cid;
    let filename = req.query.filename;
    console.log("stor data: ",cid,filename);
    mongo.storgeFile(filename, cid); 
    res.send("done");
});

app.get('/search',   async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    let para = req.query.filePara;
    let searchresult = await mongo.searchFile(para);
    console.log("search result: ", searchresult);
    res.send(searchresult);
});

app.get('/topic', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    let cid = req.query.cid;
    let filename = req.query.filename;

    await mongo.downloadFile(cid, filename);    
    res.send("unknow");
});

app.listen(config.express.port);
