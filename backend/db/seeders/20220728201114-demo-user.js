'use strict';
const bcrypt = require("bcryptjs")


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Jon',
        lastName: 'Snowson',
        email: 'demo1@user.io',
        username: 'demo1',
        hashedPassword: bcrypt.hashSync('pass1')
      },
      {
        firstName: 'Sansa',
        lastName: 'Starksa',
        email: 'demo2@user.io',
        username: 'demo2',
        hashedPassword: bcrypt.hashSync('pass2')
      },
      {
        firstName: 'Davos',
        lastName: 'Seaworthson',
        email: 'demo3@user.io',
        username: 'demo3',
        hashedPassword: bcrypt.hashSync('pass3')
      },
      {
        firstName: 'Kuni',
        lastName: 'Garuson',
        email: 'demo4@user.io',
        username: 'demo4',
        hashedPassword: bcrypt.hashSync('pass4')
      },
      {
        firstName: 'Gin',
        lastName: 'Mazotisa',
        email: 'demo5@user.io',
        username: 'demo5',
        hashedPassword: bcrypt.hashSync('pass5')
      },
      {
        firstName: 'Jia',
        lastName: 'Matizasa',
        email: 'demo6@user.io',
        username: 'demo6',
        hashedPassword: bcrypt.hashSync('pass6')
      },
      {
        firstName: 'Bellatrix',
        lastName: 'Lestrangesa',
        email: 'demo7@user.io',
        username: 'demo7',
        hashedPassword: bcrypt.hashSync('pass7')
      },
      {
        firstName: 'Hermoine',
        lastName: 'Grangersa',
        email: 'demo8@user.io',
        username: 'demo8',
        hashedPassword: bcrypt.hashSync('pass8')
      },
      {
        firstName: 'Aloy',
        lastName: 'Sobecksa',
        email: 'demo9@user.io',
        username: 'demo9',
        hashedPassword: bcrypt.hashSync('pass9')
      },
      {
        firstName: 'Elisabet',
        lastName: 'Sobecksa',
        email: 'demo10@user.io',
        username: 'demo10',
        hashedPassword: bcrypt.hashSync('pass10')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = 'Users';

    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['demo1', 'demo2', 'demo3', 'demo4', 'demo5', 'demo6', 'demo7', 'demo8', 'demo9', 'demo10'] }
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
