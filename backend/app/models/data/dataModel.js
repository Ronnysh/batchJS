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
        manager.flush(function (err, result) { 
            if (err) throw err;
            console.log("Bucket Flushed")
            callback()
        })
    }
    
    function insert(key,value){
        bucket.upsert(key, value, function (err, result) {
            if (err) throw err;
            console.log("Added doc" + key + " " + JSON.stringify(value))
        })
    }
                             

    return {
        initialize: initialize,
        flush: flush,
        insert: insert
    };
}();
