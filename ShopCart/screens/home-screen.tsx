import {
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {dispatch} from '../redux/store/store';
import ProductThunk from '../redux/ducks/products/product-thunk';
import {COLORS, IMAGES} from '../assets';
import scaler from '../utils/scaler';
import ProductSelector from '../redux/ducks/products/product-selector';

const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
  const productsList = ProductSelector.productsData();

  useEffect(() => {
    dispatch(ProductThunk.fetchAllProducts());
  }, []);

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlue} />
      <TopSection />
      <BottomSection productsList={productsList} />
    </View>
  );
};

export default HomeScreen;

const TopSection = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.nameNcart}>
        <Text style={styles.name}>Hey, Rahul</Text>
        <Image source={IMAGES.cart} style={styles.cartImg} />
      </View>

      <View style={styles.searchBar}>
        <Image source={IMAGES.search} style={styles.searchIcon} />
        <TextInput
          placeholder="Search Products or store"
          placeholderTextColor={COLORS.darkGray}
          style={styles.searchInput}
        />
      </View>

      <View style={styles.addressNtime}>
        <View style={styles.address}>
          <Text style={styles.label}>Delivery To</Text>
          <View style={styles.subLabelView}>
            <Text style={styles.subLabel}>Greenway 3000, Sylhet</Text>
            <Image source={IMAGES.dropdown} style={styles.downArrow} />
          </View>
        </View>
        <View style={styles.address}>
          <Text style={styles.label}>Within</Text>
          <View style={styles.subLabelView}>
            <Text style={styles.subLabel}>1 hour</Text>
            <Image source={IMAGES.dropdown} style={styles.downArrow} />
          </View>
        </View>
      </View>
    </View>
  );
};

const BottomSection = ({productsList}: any) => {
  const [heartSelected, setHeartSelected] = useState(false);

  const renderProducts = ({item, index}: any) => {
    return (
      <View
        style={[
          styles.productItem,
          index === productsList.length - 2 || index === productsList.length - 1
            ? {marginBottom: height * 0.25}
            : {},
        ]}>
        <TouchableOpacity
          onPress={() => setHeartSelected(!heartSelected)}
          hitSlop={{top: 30, left: 20, bottom: 20, right: 20}}>
          {heartSelected ? (
            <Image source={IMAGES.heartRed} style={styles.heartIcon} />
          ) : (
            <Image source={IMAGES.heartWhite} style={styles.heartIcon} />
          )}
        </TouchableOpacity>
        <Image source={{uri: item?.thumbnail}} style={styles.productImg} />
        <View style={styles.productDetails}>
          <View>
            <Text style={styles.itemPrice}>
              {item?.price ? `$${item.price}` : 0}
            </Text>
            <Text numberOfLines={3} style={styles.itemTitle}>
              {item?.title ? item.title : ''}
            </Text>
          </View>
          <Image source={IMAGES.addBtn} style={styles.add} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.bottomContainer}>
      <Text style={styles.recommendedText}>Recommended</Text>
      <View style={styles.products}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={productsList}
          renderItem={renderProducts}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: COLORS.primaryBlue,
    flex: 0.35,
    paddingHorizontal: 20,
  },
  nameNcart: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: scaler(20),
    fontWeight: '600',
    color: COLORS.white,
  },
  cartImg: {
    width: 20,
    height: 20,
  },
  searchBar: {
    borderRadius: 30,
    paddingHorizontal: 25,
    paddingVertical: 18,
    marginTop: 35,
    flexDirection: 'row',
    backgroundColor: COLORS.darkBlue,
  },
  searchIcon: {
    width: 17,
    height: 17,
  },
  searchInput: {
    width: width * 0.7,
    marginLeft: 10,
    color: COLORS.white,
    fontSize: scaler(13),
    // fontWeight: '500',
  },
  addressNtime: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  address: {},
  label: {
    color: '#888CA1', //COLORS.darkGray,
    textTransform: 'uppercase',
    fontSize: scaler(10),
    fontWeight: '500',
  },
  subLabelView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subLabel: {
    color: COLORS.lightGray,
    fontSize: scaler(12),
  },
  downArrow: {
    width: 10,
    height: 5,
    marginLeft: 10,
    marginTop: 2,
  },
  bottomContainer: {
    flex: 0.65,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  recommendedText: {
    color: COLORS.textColor,
    fontSize: scaler(28),
  },
  products: {
    marginLeft: -20,
    // paddingBottom: height * 0.25,
  },
  productItem: {
    width: width * 0.415,
    // height: height * 0.25,
    borderRadius: 10,
    backgroundColor: COLORS.lightGray,
    marginLeft: 20,
    marginTop: 10,
    paddingBottom: 10,
  },
  heartIcon: {
    width: 15,
    height: 14,
    position: 'absolute',
    top: 10,
    left: 15,
  },
  productImg: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 10,
  },
  productDetails: {
    marginTop: 40,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemPrice: {
    fontSize: scaler(12),
    fontWeight: '600',
  },
  itemTitle: {
    maxWidth: width * 0.22,
    fontSize: scaler(10),
    color: COLORS.lightBlue,
  },
  add: {
    width: 20,
    height: 20,
  },
});
