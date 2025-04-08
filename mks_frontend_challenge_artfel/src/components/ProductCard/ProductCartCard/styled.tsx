import { motion } from "framer-motion";
import styled from "styled-components";

export const CardContainer = styled(motion.div)`
  width:13.75rem;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: #fff;
  box-shadow: -2px 2px 10px 0px rgba(0, 0, 0, 0.05);
  position: relative;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  transition: ease-in-out 0.5s;

  .close-card-button {
    position: absolute;
    top: 0;
    right: 0;
    background-color: transparent;
    color: black;
    border: none;
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 100%;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    line-height: 15px;
  }

  @media screen and (min-width: 768px) {
    width: 23.75rem;
    height: 5.938rem;
    flex-direction: row;
    padding: 0px 20px;
    transition: ease-in-out 0.2s;

    .close-card-button {
      margin-top: -8px;
      margin-right: -8px;
      background-color: black;
      color: white;
      font-size: 12px;

      &:hover {
        cursor: pointer;
        background-color: #2d2d2d;
        font-size: 10px;
      }
    }
  }
`;

export const CardProductImgContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .imge {
    width: 80px;
    height: 95px;
  }
  @media screen and (min-width: 768px) {
    img {
      width: 50px;
      height: 60px;
    }
  }
`;

export const CardProductInfoContainer = styled.div`
  display: flex;
  padding: 0 15px;
  align-items: center;
  max-height: 40px;
  min-height: 38px;
`;

export const CardProductTitle = styled.h2`
  max-width: 100%;
  color: #2c2c2c;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  padding-bottom: 10px;

  @media screen and (min-width: 768px) {
    max-width: 124px;
  }
`;

export const CardProductSpinButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-bottom: 10px;

  p {
    font-size: 8px;
    font-weight: 400;
    text-align: left;
  }
`;

export const CardProductPrice = styled.div`
  width: 4rem;
  height: 1.625rem;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 15px;
    font-weight: 700;
    line-height: 15px;
    text-align: left;
    color: black;
  }
`;

export const CardProductSpinAndPriceMobileChange = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 90%;
`;
