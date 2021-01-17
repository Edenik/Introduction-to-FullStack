const express = require("express");
const router = express.Router();
const postsController = require("./../controllers/postsControllers");

router.param("id", postsController.checkID);

router
  .route("/")
  .get(postsController.getAllPosts)
  .post(postsController.createNewPost);
router
  .route("/:id")
  .get(postsController.getPostById)
  .patch(postsController.updatePost)
  .delete(postsController.deletePost);

module.exports = router;
