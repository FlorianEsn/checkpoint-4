const router = require("express").Router();

const userControllers = require("../controllers/userControllers");

router.post("/", userControllers.hashPassword, userControllers.add);
router.get("/", userControllers.browse);
router.post(
  "/login",
  userControllers.login,
  userControllers.verifyPassword,
  userControllers.createToken
);
router.post(
  "/readCookie",
  userControllers.autoVerifyToken,
  userControllers.autoLogin
);

module.exports = router;
