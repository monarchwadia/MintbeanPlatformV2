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
            projects.push(projectFactory.one({
              UserId: user.id,
              MbEventId: mbEvent.id
            }))
          })
        });

        queryInterface.bulkInsert('Projects', projects)
          .then(resolve)
          .catch(reject);
      } catch (e) {
        reject(e);
      }
    })

    const users = mbEventFactory.bulk(10);


    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
