import { createSlice } from '@reduxjs/toolkit'

export interface searchState {
  value:any
}

const initialState: searchState = {
  value: [],
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action:any) => {
      //check if repo already exists in array
      let repoIndex = state.value.findIndex(repo => repo.id === action.payload.id)

      //if repo not in array -> add it
      if(repoIndex === -1) {
        state.value = [...state.value,action.payload]
      } else {
        // if repo is in array -> remove it
        state.value = state.value.filter(repo => repo.id !== action.payload.id)
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { toggleFavorite } = favoritesSlice.actions

export const getFavorites = (state) => state.favorites.value

export default favoritesSlice.reducer