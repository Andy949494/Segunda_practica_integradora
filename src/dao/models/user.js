import mongoose from 'mongoose';

const collection = 'user';

const schema = mongoose.Schema({
    firstname:String,
    lastname:String,
    email:{
        type:String,
        Unique: true
    },
    age: Number,
    password: String,
    cart: Number,
    role: String
})

const userModel = mongoose.model(collection, schema);
export default userModel;