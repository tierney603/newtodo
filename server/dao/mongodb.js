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
module.exports = async function (app) {
    const mongourl = config.url
    if (!mongourl || typeof mongourl !== 'string')
        throw new err("the 'logdb' config need a string value with key ")
    const client = await MongoClient.connect(config.url)
    const db = client.db('todo')
    app.set('dbClient', db)

}