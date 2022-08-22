'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: "1 Wall Way",
        city: "North",
        state: "California",
        country: "United States of America",
        lat: 82.37,
        lng: -67.51,
        name: "The Wall",
        description: "A vast ice and stone structure 300 miles long and 700 feet high. Enjoy a nice vacation in freezing temps and the possibility of a wight sighting.",
        price: 50
      },
      {
        ownerId: 1,
        address: "1 Castle Black Ave",
        city: "North",
        state: "California",
        country: "United States of America",
        lat: 85.37,
        lng: -66.41,
        name: "Castle Black",
        description: "Enjoy a stay at the headquarters of the NIght's Watch.",
        price: 75
      },
      {
        ownerId: 2,
        address: "2 Winterfell Way",
        city: "North",
        state: "California",
        country: "United States of America",
        lat: 75.17,
        lng: -81.57,
        name: "Winterfell Castle",
        description: "Book a trip at this historic castle that has stood for millenia and belonged to the Stark family.",
        price: 150
      },
      {
        ownerId: 3,
        address: "3 Flea Blvd",
        city: "South",
        state: "California",
        country: "United States of America",
        lat: 57.95,
        lng: -64.69,
        name: "Onion Manor",
        description: "Don't let the name fool you! The onion manor is a piece of history!",
        price: 80
      },
      {
        ownerId: 4,
        address: "4 Cocru Circle",
        city: "West",
        state: "California",
        country: "United States of America",
        lat: 45.535,
        lng: -110.578,
        name: "Garu Homestead",
        description: "Visit Zudi! The land of the windmills",
        price: 100
      },
      {
        ownerId: 5,
        address: "5 Dasu Drive",
        city: "West",
        state: "California",
        country: "United States of America",
        lat: 47.7121,
        lng: -123.762,
        name: "Gefica Grounds",
        description: "This is the best aircnc on the Xana islands. Meet the legendary General Gin Mazoti!",
        price: 70
      },
      {
        ownerId: 6,
        address: "6 Faca Ave",
        city: "East",
        state: "California",
        country: "United States of America",
        lat: 42.117,
        lng: -73.488,
        name: "Highland Falls",
        description: "Visit the beautiful highlands of Faca and the amazing Ruftzo Falls",
        price: 200
      },
      {
        ownerId: 7,
        address: "7 Lestrange Drive",
        city: "East",
        state: "California",
        country: "United States of America",
        lat: 40.798,
        lng: -3.23,
        name: "Azkaban Fortress",
        description: "Located in a beautiful island in the middle of the sea. Be among the first to stay in this fortress on holiday.",
        price: 500
      },
      {
        ownerId: 8,
        address: "8 Heathgate Blvd",
        city: "East",
        state: "California",
        country: "United States of America",
        lat: 51.687,
        lng: -2.73,
        name: "Granger Abode",
        description: "Don't miss out on the opportunity to stay in the childhood home of Hermoine Grangersa!",
        price: 300
      },
      {
        ownerId: 9,
        address: "9 Rost Circle",
        city: "South",
        state: "California",
        country: "United States of America",
        lat: -8.991,
        lng: -68.83,
        name: "Rost Cottage",
        description: "A homey and comfy cabin on the outskirts of the Nora lands.",
        price: 60
      },
      {
        ownerId: 9,
        address: "9 Isle Street",
        city: "West",
        state: "California",
        country: "United States of America",
        lat: 38.22,
        lng: -122.97,
        name: "Isle of Spires",
        description: "Historic ruins of San Francisco",
        price: 400
      },
      {
        ownerId: 10,
        address: "10 Gaia Circle",
        city: "West",
        state: "California",
        country: "United States of America",
        lat: 37.21,
        lng: -125.97,
        name: "Gaia Prime",
        description: "Ancient ruins holding ancient technology.",
        price: 125
      }

    ])
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      name: {
        [Op.in]: ['The Wall',
          'Castle Black',
          'Winterfell Castle',
          'Onion Manor',
          'Garu Homestead',
          'Gefica Grounds',
          'Highland Falls',
          'Azkaban Fortress',
          'Granger Abode',
          'Rost Cottage',
          'Isle of Spires',
          'Gaia Prime']
      }
    }, {});
  }
};
