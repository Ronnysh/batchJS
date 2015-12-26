/*jslint node: true */
var appConfig = require('../../appConfig');
var data = require('../data/dataModel');


module.exports = function () {
    
    function flush() {
        console.log("Admin Flushing bucket");
        data.flush(function (err) {
            if (err) {
                throw err;
            }
            console.log("data flush called back")
        })
        
    }

    function demodata(){
        console.log("Admin Loading Demo Data to bucket");
        var counter = 0;
        var fs = require('fs')
        var obj

        // Read the file and send to the callback
        fs.readFile('./app/resources/demoData.json', handleFile)

        // Write the callback function
        function handleFile(err, filedata) {
            if (err) throw err
            obj = JSON.parse(filedata)
            // You can now play with your datas
            console.log(obj)
            
            for(var i = 0; i < obj.length; i++) {
                data.insert(obj[i].key,JSON.stringify(obj[i].value))
            }
        }

        return 'app/resources/demoData.json queued for loading'
    }
    
    function reload() {
        console.log("Admin Reload Called")
        data.flush(function(){
            console.log("Flush Done, calling demodata")
            demodata()
            })
    }
    
    return {
        flush: flush,
        demodata: demodata,
        reload: reload
    };
}();







