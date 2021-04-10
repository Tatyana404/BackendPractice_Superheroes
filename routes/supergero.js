const { Router } = require('express');
const SupergeroController = require('../controller/supergero.controller');
const paginate = require('../middlewares/paginate.mw');

const supergeroRouter = Router();

supergeroRouter.post('/', SupergeroController.createSupergero);
supergeroRouter.get('/', paginate, SupergeroController.getAllSupergeroes);
supergeroRouter.patch('/:id', SupergeroController.updateSupergero);
supergeroRouter.delete('/:supergeroId', SupergeroController.deleteSupergero);

module.exports = supergeroRouter;




// 'use strict';

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.createTable('superheroes_to_superpowers', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER,
//       },
//       heroId: {
//         field: 'hero_id',
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         references: {
//           model: 'supergeroes',
//           key: 'id',
//         },
//         onDelete: 'cascade',
//         onUpdate: 'cascade',
//       },
//       superpowerId: {
//         field: 'superpower_id',
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         references: {
//           model: 'superpowers',
//           key: 'id',
//         },
//         onDelete: 'cascade',
//         onUpdate: 'cascade',
//       },
//     });
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.dropTable('superheroes_to_superpowers');
//   }
// };