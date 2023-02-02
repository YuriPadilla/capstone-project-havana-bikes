import { bikes } from "../../lib/bikes.js";
import Image from "next/image";
import Link from "next/link.js";
import { StyledBikesUl, StyledBikeLi } from "./BikesList.styled";

export default function BikesList() {
  return (
    <>
      <h2>Bikes</h2>
      <StyledBikesUl>
        {bikes.map((bike) => {
          return (
            <StyledBikeLi key={bike.id}>
              <Link href={`/Bikes/${bike.id}`}>
                <Image
                  src={bike.imageSource}
                  height={110}
                  width={180}
                  alt={bike.brand}
                  priority
                />
              </Link>
            </StyledBikeLi>
          );
        })}
      </StyledBikesUl>
    </>
  );
}
