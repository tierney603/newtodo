var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/all', async function (req, res, next) {
    // try {
    const db = await req.app.get('dbClient')
    const data = await db.collection('todo').find()
    return res.status(200).send(data)

    // } catch (err) {
    //     res.status(400).send(err)
    // }
});

module.exports = router;
