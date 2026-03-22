import mongoose from "mongoose";

const AuthorSchema= new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    birthDate: String,
    avatar: String
})

const Author= mongoose.model('Author',AuthorSchema) // diciamo a mongoose di creare nel db 

export default Author