/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  // Auth
  'POST /api/v1/auth/login': { controller: 'Auth', action: 'login'},
  'POST /api/v1/auth/logout': { controller: 'Auth', action: 'logout'},

  // User
  'GET /api/v1/user/get': { controller: 'User', action: 'getAll' },
  'GET /api/v1/user/get/:id': { controller: 'User', action: 'getByID' },
  'POST /api/v1/user/create': { controller: 'User', action: 'create' },
  'PUT /api/v1/user/update/:id': { controller: 'User', action: 'update' },
  'DELETE /api/v1/user/delete': { controller: 'User', action: 'delete' },

  // Post
  'GET /api/v1/post/get': { controller: 'Post', action: 'getAll' },
  'GET /api/v1/post/get/:id': { controller: 'Post', action: 'getByID' },
  'POST /api/v1/post/create': { controller: 'Post', action: 'create' },
  'PUT /api/v1/post/update/:id': { controller: 'Post', action: 'update' },
  'DELETE /api/v1/post/delete': { controller: 'Post', action: 'delete' },

  // Settings
  'GET /api/v1/settings/get': { controller: 'Setting', action: 'getAll' },
  'GET /api/v1/settings/get/:id': { controller: 'Setting', action: 'getByID' },
  'POST /api/v1/settings/create': { controller: 'Setting', action: 'create' },
  'PUT /api/v1/settings/update/:id': { controller: 'Setting', action: 'update' },
  'DELETE /api/v1/settings/delete': { controller: 'Setting', action: 'delete' },
};
