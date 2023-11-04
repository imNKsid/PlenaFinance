import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {dispatch} from '../redux/store/store';
import ProductThunk from '../redux/ducks/products/product-thunk';

const HomeScreen = () => {
  useEffect(() => {
    dispatch(ProductThunk.fetchAllProducts());
  }, []);

  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
