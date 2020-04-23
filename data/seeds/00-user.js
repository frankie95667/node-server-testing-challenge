
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([{
        name: "Coralyn Squirrell",
        email: "csquirrell0@dot.gov",
        gender: "Female",
        ip_address: "83.23.227.208"
      }, {
        name: "Sheila Eaton",
        email: "seaton1@umn.edu",
        gender: "Female",
        ip_address: "113.193.63.107"
      }, {
        name: "Gaelan Pavey",
        email: "gpavey2@hostgator.com",
        gender: "Male",
        ip_address: "253.2.171.213"
      }, {
        name: "Val Nuemann",
        email: "vnuemann3@yolasite.com",
        gender: "Male",
        ip_address: "230.104.206.65"
      }, {
        name: "Janenna Audus",
        email: "jaudus4@un.org",
        gender: "Female",
        ip_address: "35.23.3.230"
      }]);
    });
};
