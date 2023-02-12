import PriceInfo from "../components/PriceInfo";
import BikesPreview from "../components/BikesPreview";
import ContactInfo from "../components/ContactInfo";
import useSWR from "swr";

export default function HomePage() {
  const { data } = useSWR("/api/bikes");

  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <p>Home</p>
      <PriceInfo />
      <BikesPreview bikes={data} />
      <ContactInfo />
    </>
  );
}
