interface Car {
  plateNumber: string;
  color: string;
}

interface ParkingLot {
  slots: (Car | null)[];
}

function createParkingLot(numberOfSlots: number): ParkingLot | Error {
  return Number.isSafeInteger(numberOfSlots) && numberOfSlots > 0
    ? {
        slots: new Array<Car | null>(numberOfSlots),
      }
    : new Error("number of slots is wrong");
}

function findFreeSpace(parkingLot: ParkingLot) {
  const search = parkingLot.slots.findIndex((item) => item === null);

  return search === -1
    ? new Error("can't find free space in parking lot")
    : search;
}

function removeCarFromSlot(parkingLot: ParkingLot, slot: number) {
  if (
    Number.isSafeInteger(slot) &&
    slot > 0 &&
    slot <= parkingLot.slots.length
  ) {
    parkingLot.slots[slot - 1] = null;
    return parkingLot;
  } else return new Error(`invalid slot number: ${slot}`);
}

function findPlateNumbersFromCarColor(parkingLot: ParkingLot, color: string) {
  return parkingLot.slots.filter((car) =>
    car === null ? false : car.color === color
  );
}

function findSlotsOfCarsWithColor(parkingLot: ParkingLot, color: string) {
  
}