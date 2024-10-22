const mongoose = require('mongoose');

const validator = require('validator');

const validateEmail = (email) => validator.isEmail(email);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Explorer',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,

    validate: {
      validator(v) {
        return /^(https?):\/\/(www\.)?[\w-@:%+~#=]+[.][.\w/\-?#=&~@:()!$+%]*$/gm.test(
          v
        );
      },
      message: (props) => `${props.value} no es valido!`,
    },
    default:
      'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
  },
  email: {
    type: String,
    required: [true, 'Campo Obligatorio.'],
    unique: true,
    validate: [validateEmail, 'Email invalido.'],
  },
  password: {
    type: String,
    required: [true, 'Campo Obligatorio'],
    minlength: 8,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);