import Link from "next/link";
import SelectedProducts from "../../components/SelectedProducts";
import useLocalStorageState from "use-local-storage-state";
import {
  StyledButton,
  StyledButtonContainer,
} from "../../components/Button/Button.styled";
import LeaseTimeForm from "../../components/LeaseTimeForm";
import { useAtom } from "jotai";
import { inputDateAtom } from "@/store/atoms";

export default function ShoppingCartPage() {
  const [selectedProducts, setSelectedProducts, { removeItem }] =
    useLocalStorageState("selectedProducts", { defaultValue: [] });

  const [inputDateValues, setInputDateValues] = useAtom(inputDateAtom);

  function handleEmptyShoppingCart() {
    removeItem();
  }

  function handleChange(event) {
    if (event.target.name === "from") {
      setInputDateValues({ ...inputDateValues, from: event.target.value });
    } else if (event.target.name === "until") {
      setInputDateValues({ ...inputDateValues, until: event.target.value });
    }
  }

  return (
    <>
      <p>
        <Link href="/">Home</Link>→<Link href="/Bikes">Bikes</Link>→Shopping
        Cart
      </p>
      <SelectedProducts products={selectedProducts} />
      <StyledButtonContainer>
        <StyledButton type="button" onClick={handleEmptyShoppingCart}>
          Empty shopping cart
        </StyledButton>
      </StyledButtonContainer>
      <LeaseTimeForm
        handleChange={handleChange}
        howManyBikes={selectedProducts.length}
        fromDate={inputDateValues.from}
        untilDate={inputDateValues.until}
      />
    </>
  );
}
