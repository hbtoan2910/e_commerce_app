const mongoose = require("mongoose");

async function connectDb() {
//for nodejs ver > 17.0, use '127.0.0.1' instead of 'localhost'
  const uri = "mongodb://127.0.0.1:27017/e_commerce_shop"; 
  /*     Use promise
    mongoose.connect(uri)
    .then(
        () => { console.log('Connected to MongoDb.') },
        (err) => { console.log(err) }
    ) */

  //Use async/await & try&catch
    try {
        await mongoose.connect(uri, () => {
            console.log('Connected to MongoDb.')
        })
    } catch (err) {
        console.log('Error occured: ', err)
    }
}
module.exports = connectDb;