import { createSlice } from '@reduxjs/toolkit'

export interface resultState {
  array:any[]
}

const initialState: resultState = {
  array: [],
}

export const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    updateArray: (state, action:any) => {
      state.array = [...state.array,...action.payload]
    },
    clearArray: (state) => {
      state.array = []
    }
  },
})

export const { updateArray, clearArray } = resultSlice.actions

export const getRepos = (state) => state.result.array

export default resultSlice.reducer