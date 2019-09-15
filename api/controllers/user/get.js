module.exports = {


  friendlyName: 'Get',


  description: 'Get user.',


  inputs: {
    page: {
      type: 'number',
      defaultsTo: 0
    },
    limit: {
      type: 'number',
      defaultsTo: 10
    }
  },


  exits: {
    notFound: {
      statusCode: 404
    }
  },


  fn: async function (inputs, exits) {
    let getUsers = []
    let totalUsers = await Users.count();
    let page = inputs.page ? inputs.page : 0
    let limit = inputs.limit ? inputs.limit : 10

    getUsers = await Users.find()
      .sort('id DESC')
      .paginate(page, limit);

    if (!getUsers.length) {
      return exits.notFound({
        message: 'User is empty.',
        code: 404
      });
    }
    // All done.
    return exits.success({
      message: 'Users Fetched Successfully',
      data: getUsers,
      total: totalUsers
    });

  }


};
