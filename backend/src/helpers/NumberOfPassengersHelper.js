module.exports = function getNumberOfPassengers(typeOfVehicle) {
  const typesOfVehicles = ["car", "bus", "truck"];
  if (
    typeOfVehicle === null ||
    typeOfVehicle === undefined ||
    typesOfVehicles.indexOf(typeOfVehicle) === -1
  ) {
    throw new Error("Type of vehicle is invalid");
  }

  switch (typeOfVehicle) {
    case "car":
      return 4;
    case "truck":
      return 1;
    case "bus":
      return 42;
  }
};
