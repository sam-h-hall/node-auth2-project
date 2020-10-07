const db = require("../data/db-config");

const find = () => {
  return db("users1");
};

const findBy = (filter) => {
  return db("users1").where(filter);
}

const findById = (id) => {
  return db("users1")
    .where({
      id,
    })
    .first();
};

const add = async (user) => {
  try {
    const [id] = await db("users1").insert(user, "id");
    return findById(id);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  find,
  findBy,
  findById,
  add,
};