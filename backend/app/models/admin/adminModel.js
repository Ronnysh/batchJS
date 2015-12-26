/*jslint node: true */
var appConfig = require('../../appConfig');
var data = require('../data/dataModel');


module.exports = function () {
    
    function flush(callback) {
        console.log("Admin Flushing bucket");
        data.flush(function (err, result) {
            if (err) {
                return callback(err,null)
            } else {
                console.log("data flush called back")
                callback(null,{status: "success"})
            }
        })
        
    }

    function demodata(callback){
        console.log("Admin Loading Demo Data to bucket");
        var counter = 0;
        var fs = require('fs')
        var obj

        // Read the file and send to the callback
        fs.readFile('./app/resources/demoData.json', handleFile)

        // Write the callback function
        function handleFile(err, filedata) {
            if (err) return callback(err,null)
            try {
                obj = JSON.parse(filedata)
            }
            catch (ex){
                console.error(ex);
                return callback({status: "failed", message: "Failed to parse demoData.json" , exception: { name: ex.name, message:  ex.message}},null)
                }
            // You can now play with your datas
            console.log(obj)
            
            insertCount = 0;
            for(var i = 0; i < obj.length; i++) {
                data.insert(obj[i].key,JSON.stringify(obj[i].value),function(error,result){
                    insertCount +=1;
                    if (error) {
                        return callback(error, null);
                    } else {
                        if (insertCount == obj.length) {
                            callback(null,{status: "success"})
                        }
                    }
                })
            }
        }
}
    
    function reload(callback) {
        console.log("Admin Reload Called")
        data.flush(function(err,result){
            if (err) {
                return callback(err,null)
            }
            console.log("Flush Done, calling demodata")
            demodata(function(err,result){
                if (err) {
                    return callback(err,null)
                } else {
                    console.log("Admin reload demodata OK")
                    callback(null,{status: "success"})
                }
            })
            })
    }
    
    return {
        flush: flush,
        demodata: demodata,
        reload: reload
    };
}();







