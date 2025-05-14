// const express = require("express");
// const router = express.Router();
// const { recordPayment } = require("../controllers/paymentController");

// router.post("/payments/record", recordPayment);

// module.exports = router;


const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/create", paymentController.createPayment);

module.exports = router;
