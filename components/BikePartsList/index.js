import { bikeParts } from "../../lib/bikeParts";
import Image from "next/image";
import { StyledBikePartsUl, StyledBikePartLi } from "./BikePartsList.styled";

export default function BikePartsList() {
  return (
    <>
      <h2>Bike Parts</h2>
      <StyledBikePartsUl>
        {bikeParts.map((bikePart) => {
          return (
            <StyledBikePartLi key={bikePart.id}>
              <Image
                src={bikePart.imageSource}
                height={130}
                width={180}
                alt={bikePart.name}
                priority
              />
            </StyledBikePartLi>
          );
        })}
      </StyledBikePartsUl>
    </>
  );
}
