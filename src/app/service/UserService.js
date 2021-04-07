const userModel = require('../models/User');
class UserService {
  //GET
  async queryAll() {
    return await userModel.find({})
      .exec()
      .then((users) => {
        if (users == null) {
          throw new Error("query error");
        }
        return users
      })
      .catch((err) => {
        throw new Error(err.message);
      })
  }

  async queryWithId(id) {

    return await userModel.findById(id)
      .exec()
      .then((user) => {
        if (user == null) {
          throw new Error("invalid user");
        }
        return user
      })
      .catch((err) => {
        throw new Error(err.message);
      })
  }

  //POST
  async create(username, password,token,eauth,start,expire) {
    var newUser = new userModel();
    newUser.username = username
    newUser.password = password
    newUser.token = token
    newUser.eauth = eauth
    newUser.start = start
    newUser.expire = expire
    return await userModel.findOne({ username: username })
      .exec()
      .then(async (user) => {
        if (user != null) {
          throw new Error(`user is exists`)
        }
        try {
          let result = await newUser.save()
          console.log(`create user =${result}`)
          return result
        } catch (err) {
          throw new Error(err.message)
        }

      })
      .catch((err) => {
        throw new Error(err.message)
      })
  }

 
  validateParam(param) {
    return (
      param == "user" || param == "password" | param == "mail" ||
      param == "status" || param == "city" || param == "numberphone"
    )
  }
}

module.exports = new UserService;