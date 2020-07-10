'use strict';

const { MbConfig, Project } = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    // create'featured project' sections
    return new Promise(async (resolve, reject) => {
      try {
        const sectionTitles = ["ReactJS Projects", "API Integration Projects", "Creative Projects"]
        const sections = [];
        for (var i = 0; i < sectionTitles.length ; i++) {
          const title = sectionTitles[i];
          const projects = await Project.findAll({ order: [Sequelize.fn('RANDOM')] , limit: 10 });
          const section = {
            title,
            projectIds: projects.map(p=>p.id)
          }
          sections.push(section);
        }

        const config = {
          configKey: "featuredSections",
          configValue: JSON.stringify({sections}),
          createdAt: new Date(),
          updatedAt: new Date()
        }
        queryInterface.bulkInsert('MbConfigs', [config], {})
          .then(resolve)
          .catch(e => {
            console.log(e);
            reject(e);
          });
      }
      catch (e) {
        console.log(e);
        reject(e);
      }
    })
  },
};
