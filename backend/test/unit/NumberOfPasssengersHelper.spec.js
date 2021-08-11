const getNumberOfPassengers = require("../../src/helpers/NumberOfPassengersHelper");
const expect = require("chai").expect;

describe("Number of passengers by vehicle type", () => {
  it("Should return 4 passengers when selected type car", () => {
    const numberPassengers = getNumberOfPassengers("car");
    expect(numberPassengers).to.be.equal(4);
  });

  it("Should return 1 passengers when selected type truck", () => {
    const numberPassengers = getNumberOfPassengers("truck");
    expect(numberPassengers).to.be.equal(1);
  });

  it("Should return 42 passengers when selected type bus", () => {
    const numberPassengers = getNumberOfPassengers("bus");
    expect(numberPassengers).to.be.equal(42);
  });
});
