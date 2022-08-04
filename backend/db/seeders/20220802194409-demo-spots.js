'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '1 Winterfell Way',
        city: 'North',
        state: 'California',
        country: 'United States of America',
        lat: 85,
        lng: -120,
        name: 'Winterfell Cabin',
        description: 'A fantastic cabin',
        price: 100
      },
      {
        ownerId: 2,
        address: '2 Winterfell Way',
        city: 'North',
        state: 'California',
        country: 'United States of America',
        lat: 85,
        lng: -121,
        name: 'Winterfell Farm',
        description: 'A fantastic farm',
        price: 125
      },
      {
        ownerId: 3,
        address: '3 Winterfell Way',
        city: 'North',
        state: 'California',
        country: 'United States of America',
        lat: 85,
        lng: -121,
        name: 'Winterfell Castle',
        description: 'A fantastic castle',
        price: 500
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      name: { [Op.in]: ['Winterfell Cabin', 'Winterfell Farm', 'Winterfell Castle'] }
    }, {});
  }
};
