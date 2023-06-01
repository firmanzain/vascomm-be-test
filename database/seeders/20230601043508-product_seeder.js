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
    let dataProduct = []
    for (let i = 1; i <= 8; i++) {
      let data = {
        name: `Product ${i}`,
        description: 'Suspendisse vulputate, ipsum eu egestas ornare, odio sem rhoncus augue, eu fermentum est massa in velit. Nunc posuere tempus urna, condimentum fermentum nibh commodo sit amet. Etiam sodales elit sit amet magna sagittis, eu sagittis diam sodales. Aenean id sodales nulla. Suspendisse pretium accumsan dui, nec mattis lacus mollis non. Aenean ante ex, malesuada a porta in, ullamcorper eget quam. Etiam justo est, convallis a scelerisque sed, pulvinar vitae nulla. Vivamus rhoncus tellus orci, at dictum quam aliquet sit amet. Sed quis ligula lobortis, rutrum lacus sed, placerat tellus. Vivamus sit amet orci maximus, tincidunt justo sit amet, bibendum diam. Sed justo urna, fermentum et felis accumsan, dapibus laoreet sapien. Curabitur sit amet volutpat mi.',
        image: `product${i}.jpeg`,
        created_at: new Date(),
        updated_at: new Date(),
      }
      dataProduct.push(data)
    }

    await queryInterface.bulkInsert('products', dataProduct, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('products', null, {});
  }
};
