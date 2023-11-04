import {createAsyncThunk} from '@reduxjs/toolkit';
import ProductService from './product-service';

const fetchAllProducts = createAsyncThunk(
  'fetchAllProducts',
  async (_, {rejectWithValue, dispatch}) => {
    const res = await ProductService.getRequest('products');

    console.log('res =>', JSON.stringify(res));
  },
);

const ProductThunk = {
  fetchAllProducts,
};

export default ProductThunk;
