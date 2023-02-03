import { bikes } from "../../lib/bikes.js";
import Image from "next/image";
import Link from "next/link.js";
import { StyledBikesUl, StyledBikeLi } from "./BikesList.styled";
import useLocalStorageState from "use-local-storage-state";

export default function BikesList() {
  const [selectedProducts] = useLocalStorageState("selectedProducts", {
    defaultValue: [],
  });

  const bikesToShow = bikes.filter((bike) => {
    let isSelected;
    if (selectedProducts === null) {
      isSelected = false;
    } else {
      isSelected = selectedProducts.some((product) => product.id === bike.id);
    }
    return !isSelected;
  });

  return (
    <>
      <h2>Bikes</h2>
      <StyledBikesUl>
        {bikesToShow.length > 0 ? (
          bikesToShow.map((bike) => {
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
          })
        ) : (
          <p>No bikes to show</p>
        )}
      </StyledBikesUl>
    </>
  );
}
