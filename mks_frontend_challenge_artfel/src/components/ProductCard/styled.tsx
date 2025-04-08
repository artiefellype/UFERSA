import styled from "styled-components";

export const CardContainer = styled.div`
  width: 13.5rem;
  height: 18.8rem;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: #fff;

  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.14);

  @media screen and (min-width: 768px) {
    width: 13.5rem;
    height: 17.8rem;
  }
`;

export const CardProductContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const CardProductImgContainer = styled.div`
  width: 100%;
  padding: 20px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardProductInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 15px;
  align-items: center;
  max-height: 40px;
  min-height: 38px;
`;

export const CardProductTitle = styled.h2`
  max-width: 124px;

  overflow-y: hidden;
  color: #2c2c2c;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
`;

export const CardProductPrice = styled.div`
  width: 4.35rem;
  height: 1.625rem;
  background-color: #373737;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 12px;
    font-weight: 700;
    line-height: 15px;
    text-align: left;
    color: white;
  }
`;

export const CardProductDescription = styled.div`
  width: 100%;
  padding: 10px 15px;
  max-height: 45px;
  min-height: 28px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 1px; 
  }

  p {
    font-size: 10px;
    font-weight: 300;
    line-height: 12px;
    text-align: left;
  }

  @media screen and (min-width: 768px) {
    max-height: 30px;
    min-height: 28px;
  }
`;

export const CardShopButton = styled.button`
  width: 100%;
  height: 2rem;
  border: none;
  background-color: var(--default-background);
  border-radius: 0px 0px 8px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: ease-in-out 0.2s;

  &:hover {
    cursor: pointer;
    background-color: var(--default-background-hovered);
  }

  div {
    gap: 0.625rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 0;

    h3 {
      font-style: normal;
      color: white;
      font-size: 14px;
      font-weight: 600;
      line-height: 18px;
    }
  }
`;
