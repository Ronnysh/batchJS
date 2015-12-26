/*jslint node: true */
var appConfig = require('../../appConfig');
var repository = require('../../models/machines/machinesModel');

module.exports = function ()
    {
    function initialize(router) {

        router.route('/machines/list').get(function (req, res) {

            var result = null;
            var isRequestValid = true; // perform here validations on the request query

            if (isRequestValid) {
                result = repository.get();

                res.json(result);
            } else {
                res.json({error: 'missing_query'});
            }
        });
    }

    return { initialize: initialize };

}();