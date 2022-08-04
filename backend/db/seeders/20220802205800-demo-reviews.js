'use strict';


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
      {
        review: "This castle is a castle",
        stars: 3,
        userId: 1,
        spotId: 3,
      },
      {
        review: "Wow, a cabin",
        stars: 5,
        userId: 2,
        spotId: 1,
      },
      {
        review: "Old McStark had a farm",
        stars: 1,
        userId: 3,
        spotId: 2,
      },
      {
        review: "This castle is astounding",
        stars: 5,
        userId: 3,
        spotId: 3,
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Reviews', {
      spotId: { [Op.in]: [1, 2, 3] }
    })
  }
};
