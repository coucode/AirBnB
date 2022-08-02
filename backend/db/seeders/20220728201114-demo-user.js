'use strict';
const bcrypt = require("bcryptjs")


module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Jon',
        lastName: 'Snow',
        email: 'demo1@user.io',
        username: 'Demo1',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        firstName: 'Sansa',
        lastName: 'Stark',
        email: 'demo2@user.io',
        username: 'Demo2',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Davos',
        lastName: 'Seaworth',
        email: 'demo3@user.io',
        username: 'Demo3',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo1', 'Demo2', 'Demo3'] }
    }, {});
  }
};

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.bulkInsert('Users', [{
//       email: 'demo@user.io',
//       username: 'Demo-lition',
//       hashedPassword: bcrypt.hashSync('password')
//     },
//     {
//       email: 'user1@user.io',
//       username: 'FakeUser1',
//       hashedPassword: bcrypt.hashSync('password2')
//     },
//     {
//       email: 'user2@user.io',
//       username: 'FakeUser2',
//       hashedPassword: bcrypt.hashSync('password3')
//     }])
//   },
//   async down(queryInterface, Sequelize) {
//     const Op = Sequelize.Op;
//     await queryInterface.bulkDelete('Users', {
//       username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
//     })
//   }
// };
