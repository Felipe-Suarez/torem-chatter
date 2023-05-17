import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

const initialState = {
  visibility: false,
  openTicket: false
};

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    setVisibility: (state, action: PayloadAction<boolean>) => {
      state.visibility = action.payload;
    },
    setOpenTicket: (state, action: PayloadAction<boolean>) => {
      state.openTicket = action.payload;
    }
  }
});

export const { setVisibility, setOpenTicket } = ticketSlice.actions;

export const getVisibility = (state: RootState) => state.ticket.visibility;
export const getTypeTicket = (state: RootState) => state.ticket.openTicket;

export default ticketSlice.reducer;
