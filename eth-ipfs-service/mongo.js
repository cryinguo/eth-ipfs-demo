const Mongolass = require('mongolass')
const fs = require("fs");
const ipfs = require('../eth-ipfs/ipfs');
const config = require('../config')
const Rx = require('rxjs/Rx');

// const mongolass = new Mongolass
// mongolass.connect(config.mongodb)

let self
class Mongo {
    constructor() {
        self = this
        self.download$ = new Rx.Subject()
        self.storeInMongo$ = new Rx.Subject()
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
            .then( () => {
                //console.log("data saved"),
                self.storeInMongo$.next("data saved")
            })
            .catch(function (e) {
              console.error(e)
              console.error(e.stack)
            })
    }
    searchFile (para) {
        console.log("(mongodb) searching... ", para);
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

    downloadFile (cid, fileName) {
        //console.log("download file ",cid,fileName)
        ipfs.get(cid, function (err, files) {
            if (err) console.log("ipfsGetErr", err);
            files.forEach((file) => {
                console.log("(mongodb) downloading file :",file.path)
                //console.log(file.content.toString('utf8'))
                fs.writeFile("./download/" + fileName, file.content, err => {
                    if(err) console.log("fs.write Err:",err);
                    //console.log("downloading finished")
                    self.download$.next("downloading finished")
                })
            })
        })
    }
}

module.exports = Mongo;

