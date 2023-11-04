import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Toast from 'react-native-simple-toast';

import {COLORS, IMAGES} from '../assets';
import scaler from '../utils/scaler';
import {CustomButton} from '../components';
import {dispatch} from '../redux/store/store';
import ProductThunk from '../redux/ducks/products/product-thunk';
import ProductSelector from '../redux/ducks/products/product-selector';

const {width, height} = Dimensions.get('window');

type ParamList = {
  ProductDetails: {
    item: any;
  };
};

type ProductDetailsScreenRouteProp = RouteProp<ParamList, 'ProductDetails'>;

const ProductDetails = () => {
  const navigation = useNavigation();
  const routes = useRoute<ProductDetailsScreenRouteProp>();

  const cartData = ProductSelector.cartData();

  const [productItem, setProductItem] = useState({}) as any;

  useEffect(() => {
    if (routes?.params?.item) {
      setProductItem(routes.params.item);
    }
  }, [routes?.params?.item]);

  console.log('productItem =>', productItem);

  const toggleAdd = (item: any) => {
    Toast.show('Product added to Cart', Toast.SHORT);
    dispatch<any>(ProductThunk.addToCart(item));
  };

  const renderImages = ({item}: {item: string}) => {
    return (
      <View>
        <Image source={{uri: item}} style={styles.productImage} />
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 20}}>
          <View style={styles.headerIcons}>
            <TouchableOpacity
              onPress={() => navigation.dispatch(StackActions.pop())}>
              <Image source={IMAGES.backArrow} style={styles.backIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.dispatch(StackActions.push('Cart'))}
              hitSlop={{top: 30, left: 20, bottom: 20, right: 20}}>
              {/* style={{flexDirection: 'row'}}> */}
              <Image source={IMAGES.cart} style={styles.cartIcon} />
              {cartData?.length > 0 ? (
                <View style={styles.cartItemsView}>
                  <Text style={styles.cartItems}>{cartData.length}</Text>
                </View>
              ) : null}
            </TouchableOpacity>
          </View>
          <Text style={styles.category}>{productItem?.category}</Text>
          <Text style={styles.itemName}>{productItem?.title}</Text>
          <StarRatingDisplay
            rating={productItem?.rating ? productItem.rating : 0}
            starSize={15}
            color={COLORS.yellow}
            style={{justifyContent: 'flex-start'}}
            starStyle={{marginLeft: -2}}
          />
        </View>
        <View style={styles.imageBanner}>
          {productItem?.images ? (
            productItem.images?.length > 1 ? (
              <SwiperFlatList
                autoplay
                autoplayLoop
                index={0}
                showPagination
                data={productItem?.images}
                renderItem={renderImages}
                paginationStyle={styles.pagination}
                paginationStyleItem={styles.paginationItem}
                paginationActiveColor={COLORS.yellow}
                paginationDefaultColor={COLORS.gray}
              />
            ) : (
              renderImages({item: productItem.images[0]})
            )
          ) : (
            renderImages({item: productItem.thumbnail})
          )}
        </View>

        <View style={{paddingHorizontal: 20}}>
          <View style={styles.priceContainer}>
            <View style={styles.pricePerKg}>
              <Text style={styles.priceBold}>{`$${productItem?.price}`}</Text>
              <Text style={[styles.priceBold, styles.priceThin]}>{'/KG'}</Text>
            </View>
            <View style={styles.discountView}>
              <Text
                style={[
                  styles.priceBold,
                  styles.priceThin,
                  styles.discountText,
                ]}>{`$${productItem?.discountPercentage} OFF`}</Text>
            </View>
          </View>

          <View style={styles.btnContainer}>
            <CustomButton
              isFilled={false}
              title={'Add To Cart'}
              onClick={() => toggleAdd(productItem)}
            />
            <CustomButton
              isFilled={true}
              title={'Buy Now'}
              onClick={() =>
                navigation.dispatch(
                  StackActions.push('BuyNow', {item: productItem}),
                )
              }
            />
          </View>

          <Text style={styles.detailsHeading}>{'Details'}</Text>
          <Text style={styles.details}>{productItem?.description}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 30,
    // paddingHorizontal: 20,
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backIcon: {
    width: 35,
    height: 35,
  },
  cartIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.black,
  },
  cartItemsView: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.yellow,
    position: 'absolute',
    left: 15,
    top: -7,
  },
  cartItems: {
    fontSize: scaler(10),
    color: COLORS.white,
  },
  category: {
    fontSize: scaler(48),
    fontWeight: '300',
  },
  itemName: {
    fontSize: scaler(48),
    fontWeight: '500',
  },
  imageBanner: {
    marginTop: 20,
  },
  productImage: {
    width: width,
    height: height * 0.25,
  },
  pagination: {
    left: 10,
  },
  paginationItem: {
    height: 3,
    width: 15,
    marginRight: 3,
  },
  priceContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.5,
    alignItems: 'center',
  },
  pricePerKg: {
    flexDirection: 'row',
  },
  priceBold: {
    fontSize: scaler(14),
    fontWeight: '600',
    color: COLORS.primaryBlue,
  },
  priceThin: {
    fontWeight: '400',
  },
  discountView: {
    backgroundColor: COLORS.primaryBlue,
    borderRadius: 20,
    padding: 6,
    paddingHorizontal: 10,
  },
  discountText: {
    color: COLORS.white,
  },
  btnContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsHeading: {
    marginTop: 30,
    fontSize: scaler(14),
    fontWeight: '400',
  },
  details: {
    marginTop: 10,
    fontSize: scaler(14),
    fontWeight: '400',
    marginBottom: height * 0.15,
    color: COLORS.darkGray,
  },
});
