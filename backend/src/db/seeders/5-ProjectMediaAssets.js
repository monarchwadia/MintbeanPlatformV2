'use strict';

const mbEventFactory = require('../factories/mb-event.factory');
const projectFactory = require('../factories/project.factory');
const mediaAssetFactory = require('../factories/media-asset.factory');
const voteFactory = require('../factories/vote.factory');
const { User, Project, Vote, MediaAsset } = require('../models');
const uuid = require('uuid').v4;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise(async (resolve, reject) => {
      try {
        const projects = await Project.findAll({ where: {} });
        projects.forEach(async p => {
          
          const mediaAsset = await MediaAsset.create(mediaAssetFactory.one({
            UserId: p.UserId
          }));

          p.addMediaAsset(mediaAsset);

          await p.save();
        });

        resolve();

        // const votes = [];
        // users.forEach(user => {
        //   projects.forEach(project => {
        //     if (Math.random() <= 0.4) {
        //       return;
        //     }
        //     votes.push(voteFactory.one({
        //       UserId: user.id,
        //       ProjectId: project.id
        //     }))
        //   })
        // });

        // queryInterface.bulkInsert('Votes', votes)
        //   .then(resolve)
        //   .catch(e => {
        //     console.log(e);
        //     reject(e);
        //   });
      } catch (e) {
        console.log(e);
        reject(e);
      }
    })

    // const users = mbEventFactory.bulk(10);


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