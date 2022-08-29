const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const Middleware = require('../middleware/commonMiddleware');

router.post("/users", userController.createUser)
router.post("/login", userController.loginUser)
router.get("/users/:userId", Middleware.mid, Middleware.mid2, userController.getUserData)
router.put("/users/:userId", Middleware.mid, Middleware.mid2, userController.updateUser)
router.delete("/users/:userId", Middleware.mid, Middleware.mid2, userController.deleteUser)

module.exports = router;    