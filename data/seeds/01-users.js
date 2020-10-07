exports.seed = function (knex) {
  return knex("users1").del()
    .then(function () {
      // Inserts seed entries
      return knex("users1").insert([{
          id: 1,
          username: "hello",
          password: "password",
          department: "accounting"
        },
        {
          id: 2,
          username: "goodbye",
          password: "password",
          department: "sales"
        }
      ]);
    });
};