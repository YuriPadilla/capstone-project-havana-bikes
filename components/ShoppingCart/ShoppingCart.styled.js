import Link from "next/link";
import styled from "styled-components";

export const StyledShoppingCart = styled(Link)`
  position: relative;
  z-index: 20;
  flex: 0 0 auto;
  width: 3rem;
  height: 3rem;
  min-width: 3rem;
  min-height: 3rem;
  border: none;
  border-radius: 50%;
  background: rgb(231, 231, 228);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 3px 20px black;
`;

export const StyledQuantityWrapper = styled.div`
  position: absolute;
  top: -0.15rem;
  right: -0.15rem;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 1.25rem;
  min-height: 1.25rem;
  padding: 0.1rem;
  font-size: 0.85rem;
  background-color: #96f5b6;
  border-radius: 50%;
  box-shadow: 0px 0px 6px #2d4635;
`;
