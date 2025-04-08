import styled from "styled-components";

export const CartMenuContainer = styled.div<{ open: boolean }>`
  background-color: var(--default-background);
  box-shadow: -5px 0px 6px 0px rgba(0, 0, 0, 0.13);
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 12;
  right: 0;
  top: 0;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media screen and (min-width: 768px) {
    width: 30.375rem;
  }
`;

export const CartMenuTopItems = styled.div`
  width: 100%;
  height: 75%;
`;

export const CartMenuHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 36px 22px 36px 45px;

  button {
    background-color: black;
    color: white;
    border: none;
    width: 2.3rem;
    height: 2.3rem;
    border-radius: 100%;
    font-size: 24px;
    font-weight: 400;
    line-height: 15px;
    transition: ease-in-out 0.2s;

    &:hover {
      cursor: pointer;
      background-color: #2d2d2d;
      font-size: 20px;
    }
  }

  h3 {
    max-width: 180px;
    font-size: 27px;
    font-weight: 700;
    color: white;
  }
`;

export const CartMenuProductsContainer = styled.div`
  width: 100%;
  min-height: 15.625rem;
  max-height: 28rem;
  padding: 3.125rem;
  overflow-y: auto;
  overflow-x: hidden;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const CartMenuBottomItems = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const CartMenuTotalPrice = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px 0px 60px;

  font-size: 26px;
  font-weight: 700;
  line-height: 15px;
  color: white;
`;

export const CartMenuBuyButton = styled.button`
  width: 100%;
  min-height: 5rem;
  border: none;
  color: white;
  font-size: 26px;
  font-weight: 700;
  line-height: 15px;
  background-color: black;
  transition: ease-in-out 0.2s;

  &:hover {
    cursor: pointer;
    background-color: #2d2d2d;
  }
`;
