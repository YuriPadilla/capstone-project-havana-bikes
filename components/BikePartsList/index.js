import { bikeParts } from "../../lib/bikeParts";
import Image from "next/image";

export default function BikePartsList() {
  return (
    <>
      <h2>Bike Parts</h2>
      <div>
        {bikeParts.map((bikePart) => {
          return (
            <Image
              key={bikePart.id}
              src={bikePart.imageSource}
              height={100}
              width={120}
              alt={bikePart.name}
              priority
            />
          );
        })}
      </div>
    </>
  );
}
