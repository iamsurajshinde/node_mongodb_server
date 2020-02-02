
class SampleController {

    constructor(router) {
        router.get('/', this.getSample.bind(this));
    }

    getSample(req, res) {
        res.send('Get customer api called')
    }
}

module.exports = SampleController;
