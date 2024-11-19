import React from "react";
import { Container, Card } from "react-bootstrap";
import newsData from "../data/news.json";

const News = () => {
  if (!newsData || newsData.length === 0) {
    return (
      <Container className="mt-5">
        <h1>Latest News</h1>
        <p>No news available at the moment.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h1>Latest News</h1>
      {newsData.map((newsItem) => (
        <Card key={newsItem.id} className="mb-4">
          <Card.Body>
            <Card.Title>{newsItem.title}</Card.Title>
            <Card.Text>{newsItem.content}</Card.Text>
            <Card.Footer>
              <small className="text-muted">Published on {newsItem.date}</small>
            </Card.Footer>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default News;
