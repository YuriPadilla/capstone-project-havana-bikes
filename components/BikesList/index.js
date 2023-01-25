import { v4 as uuidv4 } from "uuid";
import { bikes } from "../../lib/bikes.js";
import Image from "next/image";

export default function BikesList() {
  return (
    <>
      <h2>Bikes</h2>
      <div>
        {bikes.map((bike) => {
          return (
            <Image
              key={uuidv4()}
              src={bike.imageSource}
              height={100}
              width={120}
              alt={bike.marke}
              priority
            />
          );
        })}
      </div>
    </>
  );
}
