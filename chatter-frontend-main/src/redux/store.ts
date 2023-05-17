import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './userSlice';
import { chatsSlice } from './chatsSlice';
import { ticketSlice } from './ticketSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    chats: chatsSlice.reducer,
    ticket: ticketSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
