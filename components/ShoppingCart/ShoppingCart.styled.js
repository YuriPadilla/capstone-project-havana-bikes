import Link from "next/link";
import styled from "styled-components";

export const StyledShoppingCart = styled(Link)`
  position: relative;
  z-index: 20;
  width: 50px;
  height: 50px;
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
  top: 0;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  min-height: 20px;
  font-size: 90%;
  background-color: #96f5b6;
  border-radius: 50%;
  box-shadow: 0px 0px 6px #2d4635;
`;
