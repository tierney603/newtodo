const { MongoClient } = require('mongodb')
// http://nodejs.cn/api/process.html#processenv
const { env } = process

const config = {
    url: 'mongodb://localhost:27017/todo',
    // options: {
    //     poolSize: 100,
    //     auto_reconnect: true
    // },
    dbName: 'todo',
}
module.exports = function (app) {
    const mongourl = config.url
    if (!mongourl || typeof mongourl !== 'string')
        throw new err("the 'logdb' config need a string value with key ")
    const promise = MongoClient.connect(mongourl, Object.assign({ useNewUrlParser: true },
        (client) => {
            const db = config.dbName ? client.db(config.dbName) : client.collection ? client : null
            if (!db) throw new Error("the 'logdb' config need a string value with key 'dbName'")
            db.executeDbAdminCommand({ setFeatureCompatibilityVersion: '3.6' })
            return db
        },
    )
    )
    app.set('dbClient', promise)
}