import styled from "styled-components";

export const CardProductSpinButtons = styled.div`
  width: 60px;
  height: 25px;
  border-radius: 4px;
  border: 0.3px solid #bfbfbf;
  background-color: white;
  margin-right: 15px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  hr {
    height: 15px;
  }

  div {
    width: 100%;
    display: flex;
    justify-content: center;
    p {
      font-size: 8px;
      font-weight: 400;
    }
  }

  button {
    border: none;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    height: 100%;
    transition: ease-in-out 0.2s;

    &:hover {
      cursor: pointer;
      background-color: #e1e1e1;
    }

    p {
      font-size: 10px;
      font-weight: 400;
    }
  }
`;
