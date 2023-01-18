const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  highScore: {
    type: Number,
    default: 0
  },
  resetToken: {
    type: String
  },
  resetTokenExp: {
    type: Date
  }
});

UserSchema.pre('save', async function (next) {
  const user = this;
  this.password =  bcrypt.hashSync(this.password);
  next();

});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  return bcrypt.compareSync(password, user.password);

}

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
