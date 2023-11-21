import Image from "next/image";
import Link from "next/link.js";
import { StyledBikesUl, StyledBikeLi } from "./BikesList.styled";
import useLocalStorageState from "use-local-storage-state";
import useSWR from "swr";
import StandardSectionApp from "../StandardSectionApp";

export default function BikesList() {
  const [selectedProducts] = useLocalStorageState("selectedProducts", {
    defaultValue: [],
  });

  const { data, error, isLoading } = useSWR("/api/bikes");

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

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
      <StandardSectionApp sectionTitle="Bikes">
        <StyledBikesUl>
          {bikesToShow.length > 0 ? (
            bikesToShow.map((bike) => {
              return (
                <StyledBikeLi key={bike._id}>
                  <Link href={`/Bikes/${bike._id}`}>
                    <Image
                      src={bike.imageSource}
                      height={85}
                      width={146}
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
      </StandardSectionApp>
    </>
  );
}
