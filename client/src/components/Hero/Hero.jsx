import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import { ModalComponent } from '../Modal/Modal';

import React from 'react';

const HeroComponent = styled.header`
  padding: 5rem 0;
  height: 45vh;
  background-image: url('https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c3VjY2Vzc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2500&q=80');
  background-size: cover;
  background-position: center;
`;

const HeaderContainer = styled.div`
  background-color: rgb(5, 148, 112);
  padding: 3rem;
  color: white;
  width: 32.5rem;
`;

const Heading = styled.h1`
  font-size: 5rem;
`;

const SubHeading = styled.h3`
  margin: 1rem 0;
  font-weight: 400;
`;

export const Hero = () => {
  return (
    <HeroComponent>
      <Container>
        <HeaderContainer>
          <Heading>Feed your mind with the best</Heading>
          <SubHeading>
            Grow, learn, and become more successfully by reading some of the top
            article by highly reputable individuals
          </SubHeading>
          <ModalComponent text="Signup" variant="primary" isSignupFlow={true} />
          <ModalComponent text="Login" variant="danger" isSignupFlow={false} />
        </HeaderContainer>
      </Container>
    </HeroComponent>
  );
};
