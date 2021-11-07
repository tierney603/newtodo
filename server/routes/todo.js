const { query } = require('express');
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/getTodo', async function (req, res, next) {
    try {
        const db = await req.app.get('dbClient')
        let query = {}
        if (req.query && req.query.check) {
            query.check = req.query.check === "false" ? false : true
        }
        const data = await db.collection('todolist').find(query).toArray()
        return res.status(200).send(data)
    } catch (err) {
        res.status(400).send(err)
    }
});

router.post('/add', async function (req, res, next) {
    try {

        const db = await req.app.get('dbClient')
        const data = await db.collection('todolist').insertOne(req.body)
        return res.status(200).send(data)
    } catch (err) {
        res.status(400).send(err)
    }

});
router.post('/deletei', async function (req, res, next) {
    try {
        const db = await req.app.get('dbClient')
        const data = await db.collection('todolist').deleteMany({ _id: req.body.id })
        return res.status(200).send(data)
    }
    catch (err) {
        res.status(400).send(err)
    }
})
router.post('/empty', async function (req, res, next) {
    try {
        const db = await req.app.get('dbClient')
        const data = await db.collection('todolist').drop()
        return res.status(200).send(data)
    }
    catch (err) {
        res.status(400).send(err)
    }

})
router.post('/check', async function (req, res, next) {
    const db = await req.app.get('dbClient')
    const { _id, check } = req.body
    const data = await db.collection('todolist').updateOne({ _id: _id }, { $set: { check: !check } })
    return res.status(200).send(data)
})
router.post('/alldone', async function (req, res, next) {
    const db = await req.app.get('dbClient')
    const data = await db.collection('todolist').updateMany({ check: false }, { $set: { check: true } })
    return res.status(200).send(data)



})

module.exports = router;
