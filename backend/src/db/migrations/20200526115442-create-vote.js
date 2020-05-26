'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Votes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
      },
      UserId: {
        type: Sequelize.UUID,
        references: {
          model: 'Users', // name of Target model
          key: 'id', // key in Target model that we're referencing
        }
      },
      ProjectId: {
        type: Sequelize.UUID,
        references: {
          model: 'Projects', // name of Target model
          key: 'id', // key in Target model that we're referencing
        }
      },
      rating: {
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => {
      return queryInterface.addConstraint('Votes', ['UserId', 'ProjectId'], {
        type: 'unique',
        name: 'unique_user_project_index'
      });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Votes');
  }
};