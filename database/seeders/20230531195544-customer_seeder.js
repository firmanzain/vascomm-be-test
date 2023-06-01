'use strict';

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require('bcrypt');

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
    const saltRounds = 10;

    await queryInterface.bulkInsert('customers', [
      {
        name: 'Firman Zain',
        email: 'firmanzainf@gmail.com',
        password: await bcrypt.hash('password', saltRounds),
        profile_picture: 'default.png',
        status: 'approved',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('customers', null, {});
  }
};
