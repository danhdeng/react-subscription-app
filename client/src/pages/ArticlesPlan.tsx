import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh;
`;

const CardHeaderContainer = styled.div`
  display: flex;
  height: 30rem;
  background-color: blue;
  justify-content: center;
  align-items: center;
`;

const PriceCircle = styled.div`
  border: 0.5rem solid white;
  width: 12.5rem;
  height: 12.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0.5rem 0.5rem 1rem rgba(19, 20, 19, 0.342);
`;

const PriceText = styled.span`
  font-size: 3rem;
  color: white;
  box-shadow: 0.5rem 0.5rem 1rem rgba(19, 20, 19, 0.342);
`;

export const ArticlesPlan = () => {
  const [prices, setPrices] = useState<any[]>([]);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    const { data: response } = await axios.get(
      `${process.env.REACT_APP_API_URL}/subs/prices`
    );
    setPrices(response.data);
    console.log(response);
  };
  return (
    <Container>
      <CardContainer>
        {prices.map((price) => {
          return (
            <Card
              style={{ width: '18rem', height: '25rem', marginRight: '2rem' }}
            >
              <CardHeaderContainer>
                <PriceCircle>
                  <PriceText>${price.unit_amount / 100}</PriceText>
                </PriceCircle>
              </CardHeaderContainer>
            </Card>
          );
        })}
      </CardContainer>
    </Container>
  );
};
