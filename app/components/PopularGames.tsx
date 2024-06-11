"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchGames, setSearchTerm } from "@/store/gameSlice";
import GameCard from "./GameCard";
import "@/styles/main.scss";

const PopularGames: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const games = useSelector((state: RootState) => state.games.games);
  const searchTerm = useSelector((state: RootState) => state.games.searchTerm);
  const loading = useSelector((state: RootState) => state.games.loading);
  const error = useSelector((state: RootState) => state.games.error);

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="popular-games-container">
      <input
        type="text"
        placeholder="Search games..."
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        className="search-input"
      />
      <div className="popular-games">
        {filteredGames.map((game, index) => (
          <GameCard
            key={index}
            image={game.image}
            title={game.title}
            description={game.description}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularGames;
