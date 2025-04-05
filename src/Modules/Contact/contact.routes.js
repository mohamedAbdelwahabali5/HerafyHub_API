const { contactSchemaValidation } = require("./contact.schema");
const { protectionMW } = require("../../middlewares/authMiddleware");
const validateSchema = require("../../utils/validation/validateSchema");

const router = require("express").Router();
const contactController = require("./contact.controller");

router.post("/", contactController.sendContactEmail);

module.exports = router;
