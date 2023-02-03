import Link from "next/link";
import styled from "styled-components";

export const StyledShoppingCart = styled(Link)`
  position: fixed;
  z-index: 1;
  top: 85px;
  right: 20px;
  width: 70px;
  height: 70px;
  border: none;
  border-radius: 50%;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 3px 20px rgb(95, 117, 129);
`;

export const StyledQuantityDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 25px;
  min-height: 25px;
  background-color: #96f5b6;
  border-radius: 50%;
  box-shadow: 0px 0px 6px #2d4635;
`;
