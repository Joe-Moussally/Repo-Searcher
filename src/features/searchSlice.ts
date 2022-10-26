import { createSlice } from '@reduxjs/toolkit'

export interface searchState {
  value:String
}

const initialState: searchState = {
  value: '',
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateSearch: (state, action:any) => {
      state.value = action.payload
    },
  },
})

export const { updateSearch } = searchSlice.actions

export const getSearch = (state) => state.search.value

export default searchSlice.reducer