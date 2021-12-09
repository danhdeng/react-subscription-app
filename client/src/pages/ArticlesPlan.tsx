import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
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

const PriceText = styled.p`
  font-size: 3rem;
  color: white;
  box-shadow: 0.5rem 0.5rem 1rem rgba(19, 20, 19, 0.342);
`;

const backgroundColors: any = {
  Basic: 'rgb(104, 219,104)',
  Standard: 'rgb(185,42,23, 0.835)',
  Premium: 'pink',
};

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

  const createSession = async (priceId: string) => {
    const { data: response } = await axios.post(
      `${process.env.REACT_APP_API_URL}/subs/session`,
      {
        priceId,
      }
    );
    window.location.href = response?.url;
  };
  return (
    <Container>
      <CardContainer>
        {prices.map((price) => {
          return (
            <Card
              style={{ width: '18rem', height: '25rem', marginRight: '2rem' }}
            >
              <CardHeaderContainer
                style={{ backgroundColor: backgroundColors[price.nickname] }}
              >
                <PriceCircle>
                  <PriceText>${price.unit_amount / 100}</PriceText>
                </PriceCircle>
              </CardHeaderContainer>
              <Card.Body>
                <Card.Title style={{ fontSize: '2rem' }}>
                  {price.nickname}
                </Card.Title>
                <Button
                  variant="primary"
                  className="mt-2"
                  onClick={() => createSession(price.id)}
                >
                  Buy Now
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </CardContainer>
    </Container>
  );
};
