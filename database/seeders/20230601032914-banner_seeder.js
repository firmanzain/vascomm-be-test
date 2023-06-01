'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let dataBanner = []
    for (let i = 1; i <= 3; i++) {
      let data = {
        title: `Banner ${i}`,
        image: `banner${i}.jpeg`,
        created_at: new Date(),
        updated_at: new Date(),
      }
      dataBanner.push(data)
    }

    await queryInterface.bulkInsert('banners', dataBanner, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('banners', null, {});
  }
};
