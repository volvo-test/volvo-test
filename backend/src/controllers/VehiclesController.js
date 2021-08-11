const connection = require("../database/connection");
const getNumberOfPassengers = require("../helpers/NumberOfPassengersHelper");
const generateNumberId = require("../helpers/GenerateNumberChassisHelper");

module.exports = {
  async getVehicles(req, res) {
    try {
      const vehicles = await connection("vehicles").select("*");
      return res.json(vehicles);
    } catch (error) {
      return res.status(500).json({
        message: "Some errors happens when trying to get vehicles to database",
      });
    }
  },

  async findByChassiId(req, res) {
    try {
      const chassiId = req.params.chassiId;

      const vehicle = await connection("vehicles")
        .select("*")
        .where("chassi_id", chassiId)
        .first();

      if (!vehicle) {
        return res
          .status(400)
          .json({ message: "no Vehicle with this Chassis" });
      }

      return res.json(vehicle);
    } catch (error) {
      return res.status(500).json({
        message:
          "Some errors happens when trying to get vehicle by chassis to database",
      });
    }
  },

  async create(req, res) {
    const { color, type, series } = req.body;
    try {
      const numberOfPassengers = getNumberOfPassengers(type);
      const number = generateNumberId();

      const chassis = await connection("chassis")
        .where("series", series)
        .first();

      if (chassis) {
        return res
          .status(400)
          .json({ message: "Chassis/Series already exists" });
      }

      await connection("chassis").insert({
        series,
        number,
      });

      const [id] = await connection("vehicles").insert({
        color: color,
        type: type,
        number_passengers: numberOfPassengers,
        chassi_id: series,
      });

      return res.status(201).json({ id });
    } catch (error) {
      return res.status(500).json({
        message: "Some errors happen when trying to save to database",
      });
    }
  },

  async edit(req, res) {
    try {
      const chassiId = req.params.chassiId;
      const { color } = req.body;

      const chassis = await connection("chassis")
        .where("series", chassiId)
        .first();

      if (!chassis) {
        return res
          .status(400)
          .json({ message: "Chassis/Series do not exists" });
      }

      await connection("vehicles")
        .update({ color })
        .where("chassi_id", chassiId);

      return res.status(200).send();
    } catch (error) {
      return res.status(500).json({
        message: "Some errors happen when trying to edit vehicle to database",
      });
    }
  },

  async delete(req, res) {
    try {
      const chassiId = req.params.chassiId;
      await connection("vehicles").where("chassi_id", chassiId).delete();
      return res.status(204).send();
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Some errors happen when trying to delete from database",
      });
    }
  },
};
