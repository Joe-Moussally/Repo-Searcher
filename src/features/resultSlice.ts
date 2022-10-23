import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

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

// Action creators are generated for each case reducer function
export const { updateArray, clearArray } = resultSlice.actions

export const getRepos = (state) => state.array

export default resultSlice.reducer