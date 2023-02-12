import Image from "next/image";
import Link from "next/link.js";
import { StyledBikesUl, StyledBikeLi } from "./BikesList.styled";
import useLocalStorageState from "use-local-storage-state";
import useSWR from "swr";

export default function BikesList() {
  const [selectedProducts] = useLocalStorageState("selectedProducts", {
    defaultValue: [],
  });

  const { data } = useSWR("/api/bikes");

  if (!data) {
    return <h1>Loading...</h1>;
  }

  const bikesToShow = data.filter((bike) => {
    let isSelected;
    if (selectedProducts === null) {
      isSelected = false;
    } else {
      isSelected = selectedProducts.some((product) => product._id === bike._id);
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
              <StyledBikeLi key={bike._id}>
                <Link href={`/Bikes/${bike._id}`}>
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
