'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        url: "https://images.unsplash.com/photo-1619709086082-832a3b6f7411?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80",
        previewImage: true,
        spotId: 1,
        userId: 1
      },
      {
        url: "https://images.unsplash.com/photo-1659367324680-ac58865b4cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        previewImage: true,
        spotId: 2,
        userId: 1
      },
      {
        url: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2108&q=80",
        previewImage: true,
        spotId: 3,
        userId: 2
      },
      {
        url: "https://images.unsplash.com/photo-1472377723522-4768db9c41ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        previewImage: true,
        spotId: 4,
        userId: 3
      },
      {
        url: "https://images.unsplash.com/photo-1528828271616-f3e6411aaf6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80",
        previewImage: true,
        spotId: 5,
        userId: 4
      },
      {
        url: "https://images.unsplash.com/photo-1443181994330-3e365ff8949e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2081&q=80",
        previewImage: true,
        spotId: 6,
        userId: 5
      },
      {
        url: "https://images.unsplash.com/photo-1494472155656-f34e81b17ddc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1888&q=80",
        previewImage: true,
        spotId: 7,
        userId: 6
      },
      {
        url: "https://images.unsplash.com/photo-1618670708374-1a05d6c4b0b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
        previewImage: true,
        spotId: 8,
        userId: 7
      },
      {
        url: "https://images.unsplash.com/photo-1561022107-23ba5b910e02?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1965&q=80",
        previewImage: true,
        spotId: 9,
        userId: 8
      },
      {
        url: "https://images.unsplash.com/photo-1622209470866-3692e27d665c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2113&q=80",
        previewImage: true,
        spotId: 10,
        userId: 9
      },
      {
        url: "https://images.unsplash.com/photo-1423347673683-ccdb7f6a948f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
        previewImage: true,
        spotId: 11,
        userId: 9
      },
      {
        url: "https://images.unsplash.com/photo-1572587356426-b33bf42f999b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
        previewImage: true,
        spotId: 12,
        userId: 10
      },
      // Review Images
      {
        url: "https://images.unsplash.com/photo-1585572395221-e5c088aff518?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80",
        previewImage: false,
        spotId: 4,
        reviewId: 1,
        userId: 1
      },
      {
        url: "https://images.unsplash.com/photo-1659367324680-ac58865b4cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        previewImage: false,
        spotId: 2,
        reviewId: 2,
        userId: 2
      },
      {
        url: "https://images.unsplash.com/photo-1552273582-07e2a8a8de70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1915&q=80",
        previewImage: false,
        spotId: 1,
        reviewId: 3,
        userId: 2
      },
      {
        url: "https://images.unsplash.com/photo-1647716968590-373733b06c93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        previewImage: false,
        spotId: 3,
        reviewId: 4,
        userId: 3
      },
      {
        url: "https://images.unsplash.com/photo-1541526855570-9154d61f6a8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80",
        previewImage: false,
        spotId: 6,
        reviewId: 5,
        userId: 4
      },
      {
        url: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        previewImage: false,
        spotId: 5,
        reviewId: 6,
        userId: 5
      },
      {
        url: "https://images.unsplash.com/photo-1525824236856-8c0a31dfe3be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1888&q=80",
        previewImage: false,
        spotId: 7,
        reviewId: 7,
        userId: 5
      },
      {
        url: "https://images.unsplash.com/photo-1628047546938-0beb1a10ff9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        previewImage: false,
        spotId: 6,
        reviewId: 8,
        userId: 6
      },
      {
        url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
        previewImage: false,
        spotId: 5,
        reviewId: 9,
        userId: 6
      },
      {
        url: "https://images.unsplash.com/photo-1512359953714-f0c9a632ab85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1990&q=80",
        previewImage: false,
        spotId: 9,
        reviewId: 10,
        userId: 7
      }

    ])
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Images', {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22] }
    })
  }
};
