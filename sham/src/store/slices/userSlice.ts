// src/slices/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  user: any;
  activeRequests: number;
  requestCount: number;
}

const initialState: CounterState = {
  user: null,
  activeRequests: 0,
  requestCount: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = { ...action.payload };
    },
    setActiveRequest: (state, action: PayloadAction<number>) => {
      state.activeRequests = action.payload;
    },
    setRequestCount: (state, action: PayloadAction<number>) => {
      state.requestCount = action.payload;
    },
  },
});

export const { setUser, setActiveRequest, setRequestCount } =
  counterSlice.actions;
export default counterSlice.reducer;
