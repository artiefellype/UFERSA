import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: var(--default-background);
  color: white;
  padding: 28px 60px;
`;

export const LogoContainer = styled.div`
  h1 {
    font-size: 40px;
    font-weight: bold;
    line-height: 19px;
    font-weight: 600;
    span {
      font-size: 20px;
      font-weight: 300;
      font-style: normal;
    }
  }
`;
