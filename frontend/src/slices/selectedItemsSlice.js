// slices/selectedItemsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    setSelectedItems: (state, action) => {
      const { category, item, selected, quantity } = action.payload;
      if (!state[category]) {
        state[category] = {};
      }
      state[category][item] = {
        ...state[category][item],
        selected,
        quantity,
      };
    },
    resetSelectedItems: (state) => {
      return {}; // Reset selected items when necessary
    },
  },
});

export const { setSelectedItems, resetSelectedItems } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
