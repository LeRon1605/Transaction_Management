const mongoClient = require('mongoose');
module.exports = {
    connect(){
        mongoClient.connect('mongodb://localhost:27017/bank', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log('Connect successfully to MongoDB!!'))
        .catch((err) => console.log(`Connect failure to MongoDB: ${err}`))
    }
}