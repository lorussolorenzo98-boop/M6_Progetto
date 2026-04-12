import mongoose from "mongoose";
import bcrypt from "bcrypt"

const AuthorSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    birthDate: String,
    avatar: String
});

//prima che venga salvato nel db esegui questa funzione
AuthorSchema.pre('save', async function () {
    //se un utente modifica tutto ma non la password non dobbiamo eseguire il codice e passare a next
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)


})

const Author = mongoose.model('Author', AuthorSchema) // diciamo a mongoose di creare nel db come definito nello schema

export default Author