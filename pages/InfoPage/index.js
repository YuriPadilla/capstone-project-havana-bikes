import Link from "next/link";
import PriceInfo from "../../components/PriceInfo";

export default function InfoPage() {
  return (
    <>
      <p>
        <Link href="/">Home</Link>→Contact us
      </p>
      <PriceInfo />
    </>
  );
}
