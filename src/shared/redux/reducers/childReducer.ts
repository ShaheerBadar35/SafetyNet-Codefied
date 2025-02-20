import {createSlice} from '@reduxjs/toolkit';

interface State {
  child: any;
}

const initialState: State = {
  child: null,
};

export const childReducer: any = createSlice({
  name: 'child',
  initialState,
  reducers: {
    setChild: (state, action) => {
      state.child = action.payload;
    },
    resetChild: state => ({
      child: null,
    }),
  },
});

export const {setChild, resetChild} = childReducer.actions;

export default childReducer.reducer;
