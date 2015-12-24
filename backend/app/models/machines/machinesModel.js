module.exports = function () {

    var model = {
        machines: [
            {
                machineId: '12344'
            }
        ]
    };

    function get() {
        return model;
    }

    return {
        get: get
    };
}();







