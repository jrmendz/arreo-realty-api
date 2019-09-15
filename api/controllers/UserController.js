/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getAll: async (req, res) => {
    let query = req.query;
    let tasks = {
      getUsers: async (next) => {
        let getUsers = [];
        let totalUsers = await Users.count();
        let page = query.page ? query.page : 0;
        let limit = query.limit ? query.limit : 10
        console.time('Request Time [GET USERS]');
        getUsers = await Users.find({
            select: ['id', 'username','fullname','email','status','logged','permission_id','createdAt']
          })
          .sort('id DESC')
          .paginate(page, limit);

        if (!getUsers.length) {
          return next({
            message: 'User is empty.',
            code: 404
          });
        }
        // All done.
        return next(null, {
          message: 'Posts Fetched Successfully',
          data: getUsers,
          total: totalUsers
        });
      }
    };

    async.auto(tasks, async (err, results) => {
      if (err) { return res.status(err.code).json(err); }
      console.timeEnd('Request Time [GET USERS]');
      return res.ok(results.getUsers);
    });
  },
  getByID: (req, res) => {
    let params = req.params;
    let tasks = {
      getUser: async (next) => {
        let userID = params.id;
        console.time('Request Time [GET USER]');
        let getUser = await Users.findOne({
          where: { id: userID },
          select: ['id', 'username','fullname','email','status','logged','permission_id','createdAt']
        });
        if (!getUser) {
          return next({
            message: 'User not found.',
            code: 404
          });
        }
        // All done.
        return next(null, {
          message: 'User Fetched Successfully',
          data: getUser
        });
      }
    };

    async.auto(tasks, async (err, results) => {
      if (err) { return res.status(err.code).json(err); }
      console.timeEnd('Request Time [GET USER]');
      return res.ok(results.getUser);
    });
  },
};
