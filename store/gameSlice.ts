import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Game } from "@/types/game";

interface GameState {
  games: Game[];
  searchTerm: string;
  loading: boolean;
  error: string | null;
}

const initialState: GameState = {
  games: [],
  searchTerm: "",
  loading: false,
  error: null,
};

export const fetchGames = createAsyncThunk("games/fetchGames", async () => {
  const response = await axios.get(
    "https://raw.githubusercontent.com/yuro4kaw/casino-data/main/games.json"
  );
  return response.data.popular_games;
});

const gameSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setGames(state, action: PayloadAction<Game[]>) {
      state.games = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGames.fulfilled, (state, action: PayloadAction<Game[]>) => {
        state.games = action.payload;
        state.loading = false;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch games";
      });
  },
});

export const { setGames, setSearchTerm } = gameSlice.actions;
export default gameSlice.reducer;
