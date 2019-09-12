import styled from 'styled-components';

export const MasonryDiv = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: ${(props) => props.gap || '.1em'};
`;

export const Col = styled.div`
  display: grid;
  grid-gap: ${(props) => props.gap || '.1em'};
  grid-auto-rows: unset;
`;

export const Margin = styled.div`
  margin-top: ${(props) => `${props.margin}px`};
`;
