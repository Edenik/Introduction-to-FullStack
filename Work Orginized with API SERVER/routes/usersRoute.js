const express = require("express");
const router = express.Router();
const usersController = require("./../controllers/usersControllers");

///////////// user route

//get all users
router
  .route("/")
  .get(usersController.getUsers)
  .post(usersController.createUser);
router
  .route("/:id")
  .get(usersController.getUserById)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;
