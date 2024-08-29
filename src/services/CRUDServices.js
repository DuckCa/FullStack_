const conn = require("../config/database");
const getAllUsers = async () => {
  let [results, fields] = await conn.query(`Select * from Users`);

  return results;
};
const getUserByID = async (id) => {
  let [results, fields] = await conn.query(
    `
    Select * from Users u 
    WHERE u.id= ? `,
    [id]
  );

  let user = results && results.length > 0 ? results[0] : {};
  return user;
};

const updateUserByID = async (req) => {
  let email = req.body.email;
  let name = req.body.myname;
  let city = req.body.city;
  let userId = req.body.userid;
  console.log(">>>>>>CHECK:", userId);
  let [results, fields] = await conn.query(
    `UPDATE Users
     SET email = ?, name = ?, city=?
     WHERE id=?;`,
    [email, name, city, userId]
  );
};
const deleteUserByID = async (userid) => {
  await conn.query(`DELETE FROM Users WHERE id=?;`, [userid]);
};
module.exports = {
  getAllUsers,
  getUserByID,
  updateUserByID,
  deleteUserByID,
};
