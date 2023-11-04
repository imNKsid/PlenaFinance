import {createSlice} from '@reduxjs/toolkit';
import ProductThunk from './product-thunk';

const initialState = {
  fetchProductSuccess: false,
  fetchProductLoading: false,
  productsData: [],

  favItems: [] as any[],
};

const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: (state, payload: any) => {},
  },
  extraReducers: builder => {
    builder
      .addCase(ProductThunk.fetchAllProducts.pending, state => {
        state.fetchProductSuccess = false;
        state.fetchProductLoading = true;
        state.productsData = [];
      })
      .addCase(ProductThunk.fetchAllProducts.fulfilled, (state, action) => {
        state.fetchProductSuccess = true;
        state.fetchProductLoading = false;
        state.productsData = action.payload;
      })
      .addCase(ProductThunk.fetchAllProducts.rejected, state => {
        state.fetchProductSuccess = false;
        state.fetchProductLoading = false;
        state.productsData = [];
      })

      .addCase(ProductThunk.addToFav.fulfilled, (state, action) => {
        state.favItems = [...state.favItems, action.payload];
      })

      .addCase(ProductThunk.removeFromFav.fulfilled, (state, action) => {
        const itemName = action.payload?.title;
        const updatedProducts = state.favItems.filter(
          item => item.title !== itemName,
        );

        state.favItems = updatedProducts;
      });
  },
});

export default ProductSlice;
