import readline from "node:readline";

type Messages =
  | "create_parking_lot"
  | "park"
  | "leave"
  | "status"
  | "plate_numbers_for_cars_with_colour"
  | "slot_numbers_for_cars_with_colour"
  | "slot_number_for_registration_number";

interface Car {
  plateNumber: string;
  color: string;
  slot: number;
}

type ParkingLot = (Car | null)[];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let parkingLot: ParkingLot;

function createCar(plateNumber: string, color: string) {
  return <Car>{
    plateNumber: plateNumber,
    color: color,
    slot: -1,
  };
}

function respondToMessage(message: Messages, data: string[]) {
  let values: string[] | number[];
  if (data.every((v) => !Number.isNaN(Number.parseInt(v)))) {
    values = data.map((v) => Number.parseInt(v));
  } else values = data;

  switch (message) {
    case "create_parking_lot":
      if (
        values.length === 1 &&
        typeof values[0] === "number" &&
        values[0] > 0
      ) {
        const numberOfSlots = values[0];
        parkingLot = new Array(numberOfSlots).fill(null);

        return `Created a parking lot with ${numberOfSlots} slots`;
      } else return `data associated with message is wrong: ${values}`;
    case "park":
      if (
        values.length === 2 &&
        typeof values[0] === "string" &&
        typeof values[1] === "string"
      ) {
        const plateNumber = values[0];
        const color = values[1];

        const freeSlot = parkingLot.findIndex((slot) => slot === null);
        if (freeSlot === -1) return "Sorry, parking lot is full";

        const car = createCar(plateNumber, color);
        car.slot = freeSlot + 1;
        parkingLot[freeSlot] = car;
        return `Allocated slot number: ${freeSlot + 1}`;
      } else return `data associated with message is wrong: ${values}`;
    case "leave":
      if (
        values.length === 1 &&
        typeof values[0] === "number" &&
        values[0] > 0
      ) {
        const slot = values[0];
        parkingLot[slot - 1] = null;
        return `Slot number ${slot} is free`;
      } else return `data associated with message is wrong: ${values}`;
    case "status":
      if (values.length === 0) {
        let outputString = "Slot No. | Plate Number | Colour\n";
        parkingLot?.forEach((car) => {
          if (car !== null) {
            outputString += `${car.slot} | ${car.plateNumber} | ${car.color}\n`;
          }
        });
        return outputString;
      } else return `data associated with message is wrong: ${values}`;
    case "plate_numbers_for_cars_with_colour":
      if (values.length === 1 && typeof values[0] === "string") {
        const color = values[0];
        return parkingLot
          .filter((car) => car?.color === color)
          .map((car) => car?.plateNumber)
          .join(", ");
      } else return `data associated with message is wrong: ${values}`;
    case "slot_numbers_for_cars_with_colour":
      if (values.length === 1 && typeof values[0] === "string") {
        const color = values[0];
        return parkingLot
          .filter((car) => car?.color === color)
          .map((car) => car!.slot)
          .join(", ");
      } else return `data associated with message is wrong: ${values}`;
    case "slot_number_for_registration_number":
      if (values.length === 1 && typeof values[0] === "string") {
        const plateNumber = values[0];
        const car = parkingLot.find((car) => car?.plateNumber === plateNumber);
        return car?.slot ?? "Not found";
      } else return `data associated with message is wrong: ${values}`;
  }
}

function isMessage(input: string): input is Messages {
  return (
    input === "create_parking_lot" ||
    input === "park" ||
    input === "leave" ||
    input === "status" ||
    input === "plate_numbers_for_cars_with_colour" ||
    input === "slot_numbers_for_cars_with_colour" ||
    input === "slot_number_for_registration_number"
  );
}

const question = () =>
  rl.question("", (message) => {
    const [messageValue, ...data] = message.split(" ");
    if (isMessage(messageValue)) {
      const response = respondToMessage(messageValue, data);
      console.log(response);
    } else {
      console.log("Wrong command");
    }
    question();
  });

question();
