import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';

const productsData = (): any => {
  const productsData = useSelector(
    (state: RootState) => state.product.productsData,
  );
  return productsData;
};

const favData = (): any => {
  const favItems = useSelector((state: RootState) => state.product.favItems);
  return favItems;
};

const ProductSelector = {productsData, favData};

export default ProductSelector;
