import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get("http://localhost:3000/api/categories");
      const categories = response.data;
      return categories;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Create a new categorie
export const cresteCategories = createAsyncThunk(
  "categories/createCategorie",
  async (categorieData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        "http://localhost:3000/api/categories",
        categorieData, // corrected argument order
        config
      );
      const category = response.data; // corrected variable name
      return category;
    } catch (error) {
      console.log();
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  categories: [],
  isPending: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //get the category
      .addCase(getCategories.pending, (state) => {
        state.isPending = true;
        state.error = null;
        console.log("Fetching categories...", state);
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isPending = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload;
      })
      //craete new category
      .addCase(cresteCategories.pending, (state) => {
        state.isPending = true;
        state.error = null;
        console.log("Fetching categories...", state);
      })
      .addCase(cresteCategories.fulfilled, (state, action) => {
        state.isPending = false;
        state.categories.push(action.payload);
      })
      .addCase(cresteCategories.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload;
      });
  },
});

const categoriesReducer = categoriesSlice.reducer;

export { categoriesReducer }; // Export the reducer only
