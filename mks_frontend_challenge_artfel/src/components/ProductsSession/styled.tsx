import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  min-height: calc(100vh - 136px);
  background-color: var(--white-background);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProductsContainer = styled.div`
  width: 100%;
  max-width: 72rem;
  display: flex;
  padding: 50px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;

  @media screen and (min-width: 768px) {
    padding: 95px;
  }
`;
