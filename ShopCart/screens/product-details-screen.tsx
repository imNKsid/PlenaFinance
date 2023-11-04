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
import {COLORS, IMAGES} from '../assets';
import scaler from '../utils/scaler';
import {
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {CustomButton} from '../components';

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

  const [productItem, setProductItem] = useState({}) as any;

  useEffect(() => {
    if (routes?.params?.item) {
      setProductItem(routes.params.item);
    }
  }, [routes?.params?.item]);

  console.log('productItem =>', productItem);

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
        <View style={styles.headerIcons}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(StackActions.pop())}>
            <Image source={IMAGES.backArrow} style={styles.backIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.dispatch(StackActions.push('Cart'))}>
            <Image source={IMAGES.cart} style={styles.cartIcon} />
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
        <View style={styles.imageBanner}>
          {productItem?.images && productItem.images?.length > 1 ? (
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
          )}
        </View>
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
            onClick={() => {}}
          />
          <CustomButton isFilled={true} title={'Buy Now'} onClick={() => {}} />
        </View>

        <Text style={styles.detailsHeading}>{'Details'}</Text>
        <Text style={styles.details}>{productItem?.description}</Text>
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
    paddingHorizontal: 20,
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
    marginHorizontal: -20,
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
