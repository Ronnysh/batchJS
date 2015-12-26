/*jslint node: true */
var appConfig = require('../../appConfig');
var couchbase = require('couchbase');

module.exports = function(){
    var cluster
    var bucket 
    var manager
    
    function initialize(){
        cluster = new couchbase.Cluster(appConfig.couchbaseURL,function (err, result) {
           if (err) throw err; 
            console.log("CouchBase Cluster Connected")
        });
        bucket = cluster.openBucket(appConfig.couchbaseBucket,function (err, result) {
           if (err) throw err; 
            console.log("CouchBase Bucket Opened")
            console.log("bucket.connected: " + bucket.connected)
        });
        manager = bucket.manager();
    }

    function flush(callback) {
        console.log("Data Flushing Bucket")
        manager.flush(function (error, result) { 
            if(error) {
                console.log("Data Flushing Failed " + error)
                return callback({status: "failed", message: "Data Flushing Failed with " + error}, null);
            }
            console.log("Bucket Flushed")
            callback(null,{message: "success"})
        })
    }
    
    function insert(key,jsonObject,callback){
        bucket.upsert(key, jsonObject, function (error, result) {
            if(error) {
                console.log("Data Insert Failed " + error)
                return callback(error, null);
                
            }
        console.log("Added doc" + key + " " + JSON.stringify(jsonObject))
        callback(null, {message: "success", data: result});
        })
    }
                             

    return {
        initialize: initialize,
        flush: flush,
        insert: insert
    };
}();
