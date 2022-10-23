import { configureStore } from '@reduxjs/toolkit'
import resultReducer from './features/resultSlice'
import searchReducer from './features/searchSlice'
import favoritesReducer from './features/favoritesSlice'

export const store = configureStore({
  reducer: {
    result:resultReducer,
    search:searchReducer,
    favorites:favoritesReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch