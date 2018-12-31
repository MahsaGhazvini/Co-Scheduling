const DBUtils = require('../../utils/DBUtils');
const express = require('express');
const router = express.Router();
const mail = require('../../services/sendingEmail');

router.post('/', async function createPoll(req, res){
    var addedOptions, deletedOptions;
    try {
        addedOptions = JSON.parse(req.body.addedOptions);
        deletedOptions = JSON.parse(req.body.deletedOptions);
    }catch(e){
        addedOptions = req.body.addedOptions;
        deletedOptions = req.body.deletedOptions;
    }
    let title = req.body.title;
    let description = req.body.description;
    console.log("________________________________");
    console.log(title);
    console.log(description);
    console.log(addedOptions);
    console.log(deletedOptions);

    return res.status(200).json({'message':'successful'});
});

module.exports = router;