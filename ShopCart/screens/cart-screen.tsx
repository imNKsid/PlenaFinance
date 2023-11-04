import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, IMAGES} from '../assets';
import scaler from '../utils/scaler';
import {StackActions, useNavigation} from '@react-navigation/native';
import {CustomButton} from '../components';

const {width, height} = Dimensions.get('window');

const Cart = () => {
  const navigation = useNavigation();

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.cartItem}>
        <View style={styles.imgNtext}>
          <Image source={{uri: item.thumbnail}} style={styles.productImg} />
          <View style={styles.nameNprice}>
            <Text style={styles.itemName}>{`Shopping`}</Text>
            <Text style={styles.itemName}>{`Shopping`}</Text>
          </View>
        </View>
        <View style={styles.addNremove}>
          <Image source={IMAGES.minus} style={styles.plusIcon} />
          <Text style={styles.itemName}>{`Shopping`}</Text>
          <Image source={IMAGES.plus} style={styles.plusIcon} />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerIcons}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(StackActions.pop())}>
          <Image source={IMAGES.backArrow} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.category}>{`Shopping Cart (5)`}</Text>
      </View>

      {renderItem({item: 'abc'})}
      {/* <FlatList
        showsVerticalScrollIndicator={false}
        data={[]}
        renderItem={renderItem}
      /> */}

      <View style={styles.totalContainer}>
        <View style={styles.cartItem}>
          <Text style={styles.itemName}>{`Shopping`}</Text>
          <Text style={styles.itemName}>{`Shopping`}</Text>
        </View>
        <View style={styles.cartItem}>
          <Text style={styles.itemName}>{`Shopping`}</Text>
          <Text style={styles.itemName}>{`Shopping`}</Text>
        </View>
        <View style={styles.cartItem}>
          <Text style={styles.itemName}>{`Shopping`}</Text>
          <Text style={styles.itemName}>{`Shopping`}</Text>
        </View>
        <CustomButton
          title={'Proceed to Checkout'}
          isFilled={true}
          onClick={() => {}}
          buttonStyles={styles.btnStyle}
        />
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  headerIcons: {
    flexDirection: 'row',
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
    marginLeft: 10,
    fontSize: scaler(14),
    fontWeight: '300',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imgNtext: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImg: {
    width: 40,
    height: 40,
  },
  nameNprice: {},
  itemName: {
    fontSize: scaler(12),
    fontWeight: '300',
  },
  addNremove: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  plusIcon: {
    width: 30,
    height: 30,
  },
  totalContainer: {
    // position: 'absolute',
    // bottom: 10,
    marginTop: 50,
    marginHorizontal: -10,
    paddingHorizontal: 10,
    paddingVertical: 30,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
  },
  btnStyle: {
    marginTop: 30,
    width: width * 0.9,
  },
});
