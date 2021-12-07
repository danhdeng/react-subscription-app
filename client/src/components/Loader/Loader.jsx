import React from 'react';
import styled from 'styled-components';
import { Spinner } from 'react-bootstrap';

const SpinnerContainer = styled.div`
  justify-content: center;
  justify-items: center;
`;

export const Loader = () => {
  return (
    <SpinnerContainer>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </SpinnerContainer>
  );
};
