import PriceInfo from "../components/PriceInfo";
import BikesPreview from "../components/BikesPreview";
import ContactInfo from "../components/ContactInfo";
import useSWR from "swr";

export default function HomePage() {
  const { data, error, isLoading } = useSWR("/api/bikes");

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <p>Home</p>
      <PriceInfo />
      <BikesPreview bikes={data} />
      <ContactInfo />
    </>
  );
}
