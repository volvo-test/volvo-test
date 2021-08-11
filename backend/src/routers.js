const express = require("express");
const { celebrate, Joi, Segments } = require("celebrate");
const VehiclesController = require("./controllers/VehiclesController");
const router = express.Router();

/** Vehicles Routes */
router.get("/vehicles", VehiclesController.getVehicles);

router.get(
  "/vehicles/:chassiId",
  celebrate({
    [Segments.PARAMS]: {
      chassiId: Joi.string().required(),
    },
  }),
  VehiclesController.findByChassiId
);

router.post(
  "/vehicles",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      color: Joi.string().required(),
      type: Joi.string().required(),
      series: Joi.string().required(),
    }),
  }),
  VehiclesController.create
);

router.put(
  "/vehicles/:chassiId",
  celebrate({
    [Segments.PARAMS]: {
      chassiId: Joi.string().required(),
    },
  }),
  VehiclesController.edit
);

router.delete(
  "/vehicles/:chassiId",
  celebrate({
    [Segments.PARAMS]: {
      chassiId: Joi.string().required(),
    },
  }),
  VehiclesController.delete
);

module.exports = router;
