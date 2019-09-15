module.exports = {


  friendlyName: 'Create',


  description: 'Create user.',


  inputs: {
    username: {
      type: 'string',
      unique: true,
      required: true,
    },
    fullname: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      required: true,
      maxLength: 15,
      minLength: 6
    }
  },


  exits: {
    invalid: {}
  },


  fn: async function (inputs, exits) {
    let userRecord = {
      username: inputs.username,
      fullname: inputs.fullname,
      email: inputs.email,
      password: inputs.password
    }
    let newUser = await Users.create(userRecord)
      .fetch()
      .catch(function(err) {
        return exits.invalid({
          code: err.code,
          message: `The attribute '${err.attrNames}' already exists.`
        });
      });
    return exits.success({
      message: 'User has been created successfully.',
      data: newUser
    });
  }


};
