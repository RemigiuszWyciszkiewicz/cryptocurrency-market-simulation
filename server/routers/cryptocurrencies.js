const { Router } = require("express");
const cryptoController = require("../controller").cryptoController;
const router = Router();

router.get("/all", cryptoController.getAll);

module.exports = router;
