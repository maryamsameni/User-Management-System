const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const db_url = 'mongodb://0.0.0.0:27017/userManagementSystem'

const connectDB = async (req, res) => {
    try {
        const connect = await mongoose.connect(db_url)
        console.log('connected To mongodb ' + connect.connection.host);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB