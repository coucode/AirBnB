'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1514539079130-25950c84af65?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
        previewImage: true,
        spotId: 3,
        reviewId: 1,
        userId: 1
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
        previewImage: true,
        spotId: 1,
        reviewId: 2,
        userId: 2
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1609610535559-65c157786ad2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        previewImage: true,
        spotId: 2,
        reviewId: 3,
        userId: 3
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1557217713-d9fd1a8370d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80",
        previewImage: true,
        spotId: 3,
        reviewId: 4,
        userId: 3
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Images', {
      id: { [Op.in]: [1, 2, 3] }
    })
  }
};
