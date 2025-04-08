import styled from "styled-components";

export const EmptyPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  flex-direction: column;

  .icon {
    text-align: center;
    color: gray;
    font-size: 4rem;
  }

  .title {
    text-align: center;
    font-size: 1.6rem;
  }

  .desc {
    text-align: center;
    font-size: 1rem;
    color: gray;
  }
`;

export const EmptyPageMessage = styled.div`
  
`;
