module.exports = function () {

    var model = {
        machines: [
            {
                machineId: '123'
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







