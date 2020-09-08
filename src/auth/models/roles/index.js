'use strict';

const RolesModel = require('./roles-model.js');

RolesModel.find({})
  .then(roles => {
    if (!roles.length) {
      ['user', 'editor', 'admin'].forEach(role => {
        let capabilities = [];

        switch (role) {
          case 'user':
            capabilities = ['read'];
            break;
          case 'editor':
            capabilities = ['read', 'create', 'update'];
            break;
          case 'admin':
            capabilities = ['read', 'create', 'update', 'delete'];
            break;
          default:
            break;
        }

        new RolesModel({ role, capabilities }).save();
      });
    }
  });