/*jslint node: true */
var appConfig = require('../../appConfig');

module.exports = function () {

    var model = {
        machines: [
            {
                machineId: '12344'
            },
            appConfig.couchbaseURL
            
                
        ]
    };

    function get() {
        return model;
    }

    return {
        get: get
    };
}();







