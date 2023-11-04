import {createSlice} from '@reduxjs/toolkit';
import ProductThunk from './product-thunk';

const initialState = {
  fetchProductSuccess: false,
  fetchProductLoading: false,
  productsData: [],

  favItems: [],
};

const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: (state, payload: any) => {},
  },
  extraReducers: builder => {
    builder
      // .addCase(ProductThunk.fetchAllProducts.pending, state => {
      //   state.fetchProductSuccess = false;
      //   state.fetchProductLoading = true;
      //   state.productsData = [];
      // })
      .addCase(ProductThunk.fetchAllProducts.fulfilled, (state, action) => {
        state.fetchProductSuccess = true;
        state.fetchProductLoading = false;

        let arr = action.payload;

        if (
          state.productsData.length === 0 ||
          !state.productsData[0].hasOwnProperty('favorite')
        ) {
          console.log('Executing');
          arr = arr.map((item: any) => ({...item, favorite: false}));
          state.favItems = [];
        }

        state.productsData = arr;
      })
      .addCase(ProductThunk.fetchAllProducts.rejected, state => {
        state.fetchProductSuccess = false;
        state.fetchProductLoading = false;
        state.productsData = [];
      })

      .addCase(ProductThunk.addToFav.fulfilled, (state, action) => {
        const tempArr = state.favItems as any;
        tempArr.push(action.payload);
        state.favItems = tempArr;

        for (let i = 0; i < state.productsData.length; i++) {
          if (state.productsData[i].id === action.payload.id) {
            state.productsData[i].favorite = true;
            break;
          }
        }
      })

      .addCase(ProductThunk.removeFromFav.fulfilled, (state, action) => {
        const itemName = action.payload.title;
        const updatedProducts = state.favItems.filter(
          (item: any) => item.title !== itemName,
        );

        state.favItems = updatedProducts;

        for (let i = 0; i < state.productsData.length; i++) {
          if (state.productsData[i].id === action.payload.id) {
            state.productsData[i].favorite = false;
            break;
          }
        }
      });
  },
});

export default ProductSlice;
