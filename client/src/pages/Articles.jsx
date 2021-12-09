import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
interface Article {
  id: string;
  title: string;
  imageUrl: string;
  content: string;
}

const CardsContainer = styled.div`
  padding: 4rem;
  display: flex;
`;

const Card = styled.div`
  height: 55rem;
  width: 34%;
  box-shadow: 0.1rem, 0.1rem 0.1rem rgba(0, 0, 0, 0.2);
  padding: 2rem;
  border-radius: 2rem;
  margin-right: 1rem;
`;

const Image = styled.img`
  width: 100%;
  height: 30rem;
  border-radius: 2rem;
`;

const Header = styled.h2`
  margin-top: 1rem;
  font-size: 1.5rem;
`;

const NoArticlesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20rem 0;
  flex-direction: column;

  & a {
    font-size: 2rem;
    text-decoration: none;
  }
`;

const ErrorHeader = styled.h2`
  font-size: 3rem;
`;

const Content = styled.p``;

export const Articles = () => {
  //const [articles, setArticle] = useState<Article[]>([]);
  const [articles, setArticles] = useState([]);
  const fetchArticles = async () => {
    const { data: response } = await axios.get(
      `${process.env.REACT_APP_API_URL}/articles`
    );
    setArticles(response);
  };
  useEffect(() => {
    fetchArticles();
  }, []);
  return (
    <Container>
      {articles.length ? (
        <CardsContainer>
          {articles.map((article) => (
            <Card key={article._id}>
              <Image src={article.imageUrl} />
              <Header>{article.title}</Header>
              <Content>{article.content}</Content>
            </Card>
          ))}
        </CardsContainer>
      ) : (
        <NoArticlesContainer>
          <ErrorHeader>You don't have access yet</ErrorHeader>
          <Link to="/article-plans">Buy a plan</Link>
        </NoArticlesContainer>
      )}
    </Container>
  );
};
