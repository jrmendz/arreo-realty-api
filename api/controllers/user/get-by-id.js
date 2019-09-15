module.exports = {


  friendlyName: 'Get by id',


  description: '',


  inputs: {

  },


  exits: {
    notFound: {
      statusCode: 404
    }
  },


  fn: async function (inputs, exits) {
    let userID = this.req.params.id;
    let getUser = {}
    getUser = await Users.findOne({id: userID});
    if (!getUser) {
      return exits.notFound({
        message: 'User not found.',
        status: 404
      });
    }
    // All done.
    return exits.success({
      message: 'User Fetched Successfully',
      data: getUser
    });

  }


};
