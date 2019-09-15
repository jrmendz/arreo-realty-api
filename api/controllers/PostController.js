/**
 * PostController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getAll: (req, res) => {
    let query = req.query;
    let tasks = {
      getPosts: async (next) => {
        let getPosts = [];
        let totalPosts = await Posts.count();
        let page = query.page ? query.page : 0;
        let limit = query.limit ? query.limit : 10
        console.time('Request Time [GET POSTS]');
        getPosts = await Posts.find()
          .sort('id DESC')
          .paginate(page, limit);

        if (!getPosts.length) {
          return next({
            message: 'Post is empty.',
            code: 404
          });
        }
        // All done.
        return next(null, {
          message: 'Posts Fetched Successfully',
          data: getPosts,
          total: totalPosts
        });
      }
    };

    async.auto(tasks, async (err, results) => {
      if (err) { return res.status(err.code).json(err); }
      console.timeEnd('Request Time [GET POSTS]');
      return res.ok(results.getPosts);
    });
  },
  getByID: (req, res) => {
    let params = req.params;
    let tasks = {
      getPost: async (next) => {
        let postID = params.id;
        console.time('Request Time [GET POST]');
        let getPost = await Posts.findOne({id: postID});
        if (!getPost) {
          return next({
            message: 'Post not found.',
            code: 404
          });
        }
        // All done.
        return next(null, {
          message: 'Post Fetched Successfully',
          data: getPost
        });
      }
    };

    async.auto(tasks, async (err, results) => {
      if (err) { return res.status(err.code).json(err); }
      console.timeEnd('Request Time [GET POST]');
      return res.ok(results.getPost);
    });
  },
  create: (req, res) => {
    let body = req.body;
    let tasks = {
      createPost: async (next) => {
        let postRecord = {
          title: _.get(body, 'title', 'Untitled Post'),
          subtitle: body.subtitle,
          author: _.get(body, 'author', 'Anonymous'),
          description: body.description,
          content: _.get(body, 'content', 'No content available.'),
          location: body.location,
          post_image: body.post_image,
          tags: body.tags
        };
        console.time('Request Time [CREATE POST]');

        let newPost = await Posts.create(postRecord)
          .fetch()
          .catch(function(err) {
            return next({
              code: err.code,
              message: err.message
            });
          });
        sails.log.info(`Post [${newPost.id}] has been created successfully by '${newPost.author}'.`)
        return next(null, {
          message: `Post [${newPost.id}] has been created successfully.`,
          data: newPost
        });
      }
    };

    async.auto(tasks, async (err, results) => {
      if (err) { return res.status(err.code).json(err); }
      console.timeEnd('Request Time [CREATE POST]');
      return res.ok(results.createPost);
    });
  },
  update: (req, res) => {
    let body = req.body;
    let params = req.params;
    let tasks = {
      updatePost: async (next) => {
        let postRecord = {
          title: _.get(body, 'title', 'Untitled Post'),
          subtitle: body.subtitle,
          author: _.get(body, 'author', 'Anonymous'),
          description: body.description,
          content: _.get(body, 'content', 'No content available.'),
          location: body.location,
          post_image: body.post_image,
          tags: body.tags
        };
        console.time('Request Time [UPDATE POST]');
        let updatePost = await Posts.updateOne({id: params.id})
          .set(postRecord);

        if (!updatePost) {
          return next({
            message: 'Post not found.',
            code: 404
          });
        }

        sails.log.info(`Post [${updatePost.id}] has been updated successfully by '${updatePost.author}'.`)
        return next(null, {
          message: `Post [${updatePost.id}] has been updated successfully.`,
          data: updatePost
        });
      }
    };

    async.auto(tasks, async (err, results) => {
      if (err) { return res.status(err.code).json(err); }
      console.timeEnd('Request Time [UPDATE POST]');
      return res.ok(results.updatePost);
    });
  }
};
