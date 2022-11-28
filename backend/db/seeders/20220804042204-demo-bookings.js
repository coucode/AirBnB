'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Bookings';  
    await queryInterface.bulkInsert(options, [
      {
        spotId: 4,
        userId: 1,
        startDate: new Date("2022-08-01"),
        endDate: new Date("2022-08-05"),
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date("2022-08-06"),
        endDate: new Date("2022-08-10"),
      },
      {
        spotId: 1,
        userId: 2,
        startDate: new Date("2022-08-15"),
        endDate: new Date("2022-08-25"),
      },
      {
        spotId: 3,
        userId: 3,
        startDate: new Date("2022-09-01"),
        endDate: new Date("2022-09-10"),
      },
      {
        spotId: 6,
        userId: 4,
        startDate: new Date("2022-09-11"),
        endDate: new Date("2022-09-15"),
      },
      {
        spotId: 5,
        userId: 5,
        startDate: new Date("2022-09-03"),
        endDate: new Date("2022-09-12"),
      },
      {
        spotId: 7,
        userId: 5,
        startDate: new Date("2022-09-20"),
        endDate: new Date("2022-09-25"),
      },
      {
        spotId: 6,
        userId: 6,
        startDate: new Date("2022-09-30"),
        endDate: new Date("2022-10-05"),
      },
      {
        spotId: 5,
        userId: 6,
        startDate: new Date("2022-10-07"),
        endDate: new Date("2022-10-23"),
      },
      {
        spotId: 9,
        userId: 7,
        startDate: new Date("2022-10-31"),
        endDate: new Date("2022-11-03"),
      },
      {
        spotId: 8,
        userId: 8,
        startDate: new Date("2022-12-01"),
        endDate: new Date("2022-12-05"),
      },
      {
        spotId: 3,
        userId: 8,
        startDate: new Date("2022-09-11"),
        endDate: new Date("2022-09-15"),
      },
      {
        spotId: 12,
        userId: 9,
        startDate: new Date("2022-12-01"),
        endDate: new Date("2022-12-05"),
      },
      {
        spotId: 8,
        userId: 9,
        startDate: new Date("2022-12-24"),
        endDate: new Date("2022-12-31"),
      },
      {
        spotId: 10,
        userId: 10,
        startDate: new Date("2022-07-15"),
        endDate: new Date("2022-07-20"),
      },
      {
        spotId: 11,
        userId: 10,
        startDate: new Date("2022-07-25"),
        endDate: new Date("2022-07-31"),
      }

    ])
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    options.tableName = 'Bookings';  
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }
    }, {});
  }
};
