import styled, { keyframes } from "styled-components";

export const shimmer = keyframes`
  0% {
    background-position: -200%;
  }
  100% {
    background-position: 200%;
  }
`;

// Estilos do esqueleto
export const SkeletonCardContainer = styled.div`
  width: 13.5rem;
  height: 18.8rem;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: #fff;
  justify-content: center;

  @media screen and (min-width: 768px) {
    width: 13.5rem;
    height: 17.8rem;
  }
`;

export const SkeletonCardContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
`;

export const SkeletonImage = styled.div`
  width: 100%;
  height: 130px;
  padding: 20px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  animation: ${shimmer} 1.5s infinite;
  background-size: 400% 100%;
`;

export const SkeletonTextContainer = styled.div`
  flex-grow: 1;
`;

export const SkeletonText = styled.div`
  height: 20px;
  margin-bottom: 10px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 400% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

export const SkeletonDescription = styled.div`
  height: 60px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 400% 100%;
  animation: ${shimmer} 1.5s infinite;
`;
