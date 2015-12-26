/*jslint node: true */
var appConfig = require('../../appConfig');
var repository = require('../../models/machines/machinesModel');
var admin = require('../../models/admin/adminModel');

module.exports = function ()
    {
    function initialize(router) {

        router.route('/admin/flush').get(function (req, res) {

            var result = null;
            var isRequestValid = true; // perform here validations on the request query

            if (isRequestValid) {
                result = admin.flush(function(error,result){
                    if (error) {
                        res.status(500).json(error)
                    }
                    res.json(result);
                });
            } else {
                res.json({error: 'missing_query'});
            }
        });
        
        
        router.route('/admin/demodata').get(function (req, res) {

            var result = null;
            var isRequestValid = true; // perform here validations on the request query

            if (isRequestValid) {
                admin.demodata(function(error,result){
                    if (error) {
                        res.status(500).json(error)
                    }
                    res.json(result);
                });
            } else {
                res.json({error: 'missing_query'});
            }
        });

        router.route('/admin/reload').get(function (req, res) {

            var result = null;
            var isRequestValid = true; // perform here validations on the request query

            if (isRequestValid) {
                result = admin.reload(function(error,result){
                    if (error) {
                        res.status(500).json(error)
                    }
                    res.json(result);
                });
            } else {
                res.json({error: 'missing_query'});
            }
        });
    }

    return { initialize: initialize };

}();