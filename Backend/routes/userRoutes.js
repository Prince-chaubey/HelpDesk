const express = require("express");
const router = express.Router();
const { getMe, updateMe } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");


// console.log("getMe:", getMe);
// console.log("updateMe:", updateMe);
// console.log("protect:", authMiddleware);

router.get("/me", authMiddleware, getMe);   // line 7
router.put("/me", authMiddleware, updateMe);

module.exports = router;
