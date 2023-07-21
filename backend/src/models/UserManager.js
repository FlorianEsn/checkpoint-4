const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (nickname, email, hashedPassword) values (?, ?, ?)`,
      [user.nickname, user.email, user.hashedPassword, user.id]
    );
  }

  findAllUsers() {
    return this.database.query(
      `select id, nickname, email from  ${this.table}`
    );
  }

  findByEmail(email) {
    return this.database.query(`SELECT * FROM  ${this.table} WHERE email=?`, [
      email,
    ]);
  }

  findOneUser(id) {
    return this.database.query(
      `select id, nickname, email from  ${this.table} where id = ?`,
      [id]
    );
  }
}

module.exports = UserManager;
