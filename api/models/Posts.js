/**
 * Posts.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    title: {
      type: 'string',
      required: true
    },
    subtitle: {
      type: 'string',
      allowNull: true
    },
    author: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      allowNull: true
    },
    content: {
      type: 'string',
      required: true
    },
    location: {
      type: 'string',
      required: true
    },
    post_image: {
      type: 'string',
      allowNull: true
    },
    status: {
      type: 'number',
      defaultsTo: 1
    },
    tags: {
      type: 'string',
      allowNull: true
    },
    posted_at: {
      type: 'string',
      allowNull: true
    }
  },

};
