'use strict';

const mbEventFactory = require('../factories/mb-event.factory');
const projectFactory = require('../factories/project.factory');
const { User, MbEvent } = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise(async (resolve, reject) => {
      try {
        const users = await User.findAll({where: {}});
        const mbEvents = await MbEvent.findAll({ where: {} });

        const projects = [];
        users.forEach(user => {
          mbEvents.forEach(mbEvent => {
            // slim down. reject 80% of matches.
            if (Math.random() > 0.8) return;

            projects.push(projectFactory.one({
              UserId: user.id,
              MbEventId: mbEvent.id
            }))
          })
        });

        queryInterface.bulkInsert('Projects', projects)
          .then(resolve)
          .catch(e => {
            console.log(e);
            reject(e);
          });
      } catch (e) {
        console.log(e);
        reject(e);
      }
    })
  }
};
