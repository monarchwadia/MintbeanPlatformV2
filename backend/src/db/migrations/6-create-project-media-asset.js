'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProjectMediaAssets', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
      },
      // the creator
      MediaAssetId: {
        type: Sequelize.UUID,
        references: {
          model: 'MediaAssets', // name of Target model
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
      listOrder: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(() => {
      return queryInterface.addConstraint('ProjectMediaAssets', ['ProjectId', 'MediaAssetId'], {
        type: 'unique',
        name: 'unique_project_media_asset_index'
      });
    })

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ProjectMediaAssets');
  }
};