/**
 * PostController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 const multer = require('multer');
 const upload = multer({dest: __dirname + '/uploads/images'}).array('images',2);

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
  getByQuery: (req, res) => {
    let params = req.query;
    let searchQuery = {}
    if (params.title) searchQuery.title = { 'contains': params.title }
    if (params.city) searchQuery.location = { 'contains': params.city }
    if (params.type) searchQuery.type = { 'contains': params.type}
    let tasks = {
      getPost: async (next) => {
        let title = params.title;
        console.time('Request Time [GET POST]');
        let getPost = await Posts.find(searchQuery);
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
        let meta_data = {
          area: _.get(body, 'area', '-'),
          garage: _.get(body, 'garage', '-'),
          bedrooms: _.get(body, 'bedrooms', '-'),
          bathrooms: _.get(body, 'bathrooms', '-')
        }
        let postRecord = {
          title: _.get(body, 'title', 'Untitled Post'),
          subtitle: body.subtitle,
          author: _.get(body, 'author', 'Anonymous'),
          description: _.get(body, 'description', 'No Description.'),
          content: _.get(body, 'content', 'No content available.'),
          location: body.location,
          post_image:JSON.stringify(_.get(body, 'images', 'img/noimage.jpg')),
          image_list:JSON.stringify(_.get(body, 'images', 'img/noimage.jpg')),
          tags: body.tags,
          meta_data: JSON.stringify(body.meta_data)
        };
        console.time('Request Time [CREATE POST]');
        await Posts.create(postRecord)
          .fetch()
          .then((newPost) => {
            sails.log.info(`Post [${newPost.id}] has been created successfully by '${newPost.author}'.`)
            return next(null, {
              message: `Post [${newPost.id}] has been created successfully.`,
              data: newPost
            });
          })
          .catch(function(err) {
            if (err) {
              return next({
                code: err.code,
                message: err.message
              });
            }
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
  },
  delete: (req, res) => {
    return res.ok();
  },
  uploadImages: (req, res) => {
    req.file('post_images').upload({
      dirname: require('path').resolve('uploads/images'),
      saveAs: function(file, cb) {
        cb(null, file.filename);
      }
    },function (err, uploadedFiles) {
      if (err) return res.error(err)
      return res.ok(uploadedFiles)
    });
  }
};
