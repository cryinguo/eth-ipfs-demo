const Mongolass = require('mongolass')
const fs = require("fs");
const ipfs = require('./ipfs');
const config = require('./config')
// const mongolass = new Mongolass
// mongolass.connect(config.mongodb)

class Mongo {
    constructor() {
        this.mongolass = new Mongolass(config.db.url)
        this.file = this.mongolass.model('ipfsfiles', {
            name: { type: 'string' },
            hash: { type: 'string' }
        })    
    }

    storgeFile( name_, hash_) {
        this.file
            .insertOne({ name: name_, hash: hash_})
            .exec()
            .then(console.log("data saved"))
            .catch(function (e) {
              console.error(e)
              console.error(e.stack)
            })
    }
    searchFile (para) {
        console.log("searching...", para);
        if (para.length === 46 && para.indexOf("Qm") === 0) {            
            return (this.file
                .findOne({ 'hash': para })
                .exec())

        } else {
            return (this.file
                .findOne({ 'name': para })
                .exec())
        }  
    }

    async downloadFile (cid, fileName) {
        console.log("download file ",cid,fileName)
        await ipfs.files.get(cid, function (err, files) {
            if (err) console.log("ipfsGetErr", err);
            files.forEach((file) => {
                console.log("downloading file0 :",file.path)
                //console.log(file.content.toString('utf8'))
                fs.writeFile("./download/" + fileName, file.content.toString('utf8'), err => {
                    if(err) console.log("fs.write Err:",err);
                    console.log("downloading finished")
                })
            })
        })
    }
}

module.exports = Mongo;

