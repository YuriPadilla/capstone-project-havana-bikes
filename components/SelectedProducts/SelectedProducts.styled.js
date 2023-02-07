import styled from "styled-components";
import Image from "next/image";

export const StyledSelectionUl = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5px;
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 200px;
  max-height: 300px;
  border: 1px solid rgb(95, 117, 129);
  box-shadow: 0px 0px 20px rgb(95, 117, 129);
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledProductLi = styled.li`
  width: 100%;
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
`;

export const StyledRemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 10px;
  width: 35px;
  height: 35px;
  border: 1px solid black;
  border-radius: 50%;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;
