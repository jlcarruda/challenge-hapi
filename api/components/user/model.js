const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { Schema } = mongoose

const PhoneSchema = new Schema({
  numero: String,
  ddd: String
})

const UserSchema = new Schema({
  nome: String,
  email: {
    type: String,
    unique: [true, 'o campo {PATH} contém um registro já cadastrado'],
    required: [true, 'o campo {PATH} é obrigatório']
  },
  senha: { type: String, required: [ true, 'o campo {PATH} é obrigatório' ] },
  telefones: [ PhoneSchema ],
  ultimo_login: { type: Date, default: Date.now },
  token: String
}, { timestamps: true })

UserSchema.pre('save', function(next){
  if (!this.isModified('senha')) return next()

  bcrypt.hash(this.senha, 10, (err, hash) => {
    if (err) return next(err)
    this.senha = hash;

    next()
  })
})

UserSchema.methods.comparePassword = async function(passwordCandidate) {
  return await bcrypt.compare(passwordCandidate, this.senha)
}

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)