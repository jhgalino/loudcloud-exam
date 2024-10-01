import readline from "node:readline";
import {
  isSingleNumericalArgument,
  isColor,
  isPlateNumber,
} from "./validation";

enum Messages {
  "create_parking_lot",
  "park",
  "leave",
  "status",
  "plate_numbers_for_cars_with_colour",
  "slot_numbers_for_cars_with_colour",
  "slot_number_for_registration_number",
}

interface Car {
  plateNumber: string;
  color: string;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let parkingLot: (Car | null)[];

function respondToMessage(message: Messages, ...values: string[] | number[]) {
  switch (message) {
    case Messages.create_parking_lot:
      if (
        values.every((item) => typeof item === "number") &&
        isSingleNumericalArgument(values)
      ) {
        const numberOfSlots = values[0];
        parkingLot = new Array<Car | null>(numberOfSlots);

        return `Created a parking lot with ${numberOfSlots} slots`;
      } else return Error(`data associated with message is wrong: ${values}`);
    case Messages.park:
      if (
        values.length === 2 &&
        typeof values[0] === "string" &&
        typeof values[1] === "string"
      ) {
        const plateNumber = values[0];
        const color = values[1];

        if (isPlateNumber(plateNumber) && isColor(color)) {
          parkingLot[freeSpace(parkingLot)] = CarConstructor(
            plateNumber,
            color
          );
        } else
          return new Error(
            `either the plate number or color is formatted wrong: ${values}`
          );
      } else
        return new Error(`data associated with message is wrong: ${values}`);
    case Messages.leave:
      if (
        values.every((item) => typeof item === "number") &&
        isSingleNumericalArgument(values)
      ) {
        const slot = values[0];
        parkingLot[slot - 1] = null;
      }
    case Messages.status:
      break;
    case Messages.plate_numbers_for_cars_with_colour:
      break;
    case Messages.slot_numbers_for_cars_with_colour:
      break;
    case Messages.slot_number_for_registration_number:
      break;
  }
}

rl.question("Input: ", (message) => {
  rl.write("Output: ");
  // rl.write(respondToMessage(message))
});
