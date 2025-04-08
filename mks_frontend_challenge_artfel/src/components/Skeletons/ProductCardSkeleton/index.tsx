import React from 'react'
import * as Styled from './styled'


function ProductCardSkeleton() {
  return (
    <Styled.SkeletonCardContainer>
      <Styled.SkeletonCardContent>
        <Styled.SkeletonImage />
        <Styled.SkeletonTextContainer>
          <Styled.SkeletonText />
          <Styled.SkeletonText />
          <Styled.SkeletonDescription />
        </Styled.SkeletonTextContainer>
      </Styled.SkeletonCardContent>
    </Styled.SkeletonCardContainer>
  )
}

export default ProductCardSkeleton