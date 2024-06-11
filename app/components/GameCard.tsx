import React, { FC } from "react";
import "@/styles/main.scss";

interface CardProps {
  image: string;
  title: string;
  description: string;
}

const GameCard: FC<CardProps> = ({ image, title, description }) => {
  return (
    <div className="game-card">
      <img src={image} alt={title} className="game-image" />
      <div className="game-info">
        <h3 className="game-title">{title}</h3>
        <p className="game-description">{description}</p>
      </div>
    </div>
  );
};

export default GameCard;
