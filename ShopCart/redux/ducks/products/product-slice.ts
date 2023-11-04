import {createSlice} from '@reduxjs/toolkit';
import ProductThunk from './product-thunk';

const initialState = {
  fetchProductSuccess: false,
};

const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: (state, payload: any) => {},
  },
  extraReducers: builder => {
    builder.addCase(ProductThunk.fetchAllProducts.pending, (state, action) => {
      state.fetchProductSuccess = false;
    });
  },
});

export default ProductSlice;
