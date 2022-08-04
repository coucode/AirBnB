'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 3,
        startDate: "2022-09-01",
        endDate: "2022-09-05",
      },
      {
        spotId: 2,
        userId: 1,
        startDate: "2022-09-05",
        endDate: "2022-09-10",
      },
      {
        spotId: 3,
        userId: 2,
        startDate: "2022-09-10",
        endDate: "2022-09-15",
      },
      {
        spotId: 3,
        userId: 1,
        startDate: "2022-09-20",
        endDate: "2022-09-30",
      },

    ])
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Bookings', {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
