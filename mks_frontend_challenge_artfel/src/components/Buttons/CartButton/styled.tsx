import styled from "styled-components";

export const CartButton = styled.button`
  width: 100%;
  max-width: 90px;
  height: 45px;
  border: none;
  border-radius: 8px;
  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 13px;

  transition: ease-in-out 0.2s;

  &:hover {
    cursor: pointer;
    background-color: #c5c5c5;
  }

  p {
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    padding-top: 3px;
  }
`;
