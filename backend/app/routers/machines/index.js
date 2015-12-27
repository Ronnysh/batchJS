var appConfig = require('../../appConfig');
var model = require('../../models/machines/machinesModel');

var self = { initialize: initialize };

var innerCache = {};

function initialize(router) {

    router.route('/machines/list').get(function (req, res) {

        var result = null;
        var isRequestValid = true; // perform here validations on the request query

        if (isRequestValid) {
            result = model.get();

            res.json(result);
        } else {
            res.json({error: 'missing_query'});
        }
    });
}

module.exports = self;
