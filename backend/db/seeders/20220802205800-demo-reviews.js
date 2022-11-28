'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Reviews'; 
    await queryInterface.bulkInsert(options, [
      {
        review: "The Onion Manor was okay. Very aromatic though",
        stars: 3,
        userId: 1,
        spotId: 4,
      }, {
        review: "Castle Black was really cool, literally and figuratively",
        stars: 5,
        userId: 2,
        spotId: 2,
      }, {
        review: "The Wall was an interesting experience. Don't think i'd visit again",
        stars: 4,
        userId: 2,
        spotId: 1,
      }, {
        review: "Visiting Winterfell has always been on my bucket list. I wish it was under better management, though",
        stars: 3,
        userId: 3,
        spotId: 3,
      }, {
        review: "These islands are not as modern as their surrounding islands, but a great experience nonetheless",
        stars: 5,
        userId: 4,
        spotId: 6,
      }, {
        review: "What a relaxing place to stay!",
        stars: 5,
        userId: 5,
        spotId: 5,
      }, {
        review: "It was definitely worth staying here. The Ruftzo Falls was only a short distance away",
        stars: 5,
        userId: 5,
        spotId: 7,
      }, {
        review: "This island needs a lot of updates and modern amenities",
        stars: 2,
        userId: 6,
        spotId: 6,
      }, {
        review: "One of my favorite places to visit of all time!",
        stars: 5,
        userId: 6,
        spotId: 5,
      }, {
        review: "Meh, not a big fan",
        stars: 1,
        userId: 7,
        spotId: 9,
      }, {
        review: "This place was horrible...or worse...atrocious",
        stars: 1,
        userId: 8,
        spotId: 8,
      }, {
        review: "I had such an amazing experience taking in all of the history and reading the books of the Winterfell Castle",
        stars: 5,
        userId: 8,
        spotId: 3,
      }, {
        review: "Gaia Prime is a goldmine of technology and innovation.",
        stars: 5,
        userId: 9,
        spotId: 12,
      }, {
        review: "This place is cold, drafty, and feels haunted",
        stars: 1,
        userId: 9,
        spotId: 8,
      }, {
        review: "What a quaint cottage!!",
        stars: 5,
        userId: 10,
        spotId: 10,
      }, {
        review: "Seeing San Francisco in this state is incredibly captivating",
        stars: 5,
        userId: 10,
        spotId: 11,
      },

    ])
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    options.tableName = 'Reviews'; 
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }
    })
  }
};
