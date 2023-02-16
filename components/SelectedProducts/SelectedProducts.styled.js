import styled from "styled-components";
import Image from "next/image";

export const StyledSelectionUl = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0;
  width: 100%;
  height: 225px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledProductLi = styled.li`
  width: 100%;
  border: 1px solid rgb(205, 211, 205);
`;

export const StyledProductDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 5px;
  padding: 5px;
  width: 100%;
  background-color: #dfecf887;
`;

export const StyledImage = styled(Image)`
  border-radius: 8px;
  box-shadow: 0px 0px 8px rgb(95, 117, 129);
`;

export const StyledDescriptionUl = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const StyledRemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 10px;
  width: 35px;
  height: 35px;
  border: 1px solid transparent;
  border-radius: 50%;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;
