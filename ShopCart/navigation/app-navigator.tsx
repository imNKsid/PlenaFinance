import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DeviceInfo from 'react-native-device-info';

import {CategoryScreen, FavouriteScreen, MoreScreen} from '../screens';
import HomeStack from './home-stack';
import {COLORS, IMAGES} from '../assets';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarInactiveBackgroundColor: COLORS.white,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={styles.label}>{focused ? '' : 'Home'}</Text>
          ),
          tabBarIcon: ({focused}) => (
            <>
              {focused ? (
                <View style={styles.selectedTab}>
                  <Image
                    source={IMAGES.home_selected}
                    style={styles.selectedIcon}
                  />
                </View>
              ) : (
                <Image
                  source={IMAGES.home_unselected}
                  style={styles.unSelectedIcon}
                />
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={styles.label}>{focused ? '' : 'Categories'}</Text>
          ),
          tabBarLabelStyle: styles.label,
          tabBarIcon: ({focused}) => (
            <>
              {focused ? (
                <View style={styles.selectedTab}>
                  <View style={styles.blackCircle}>
                    <Image
                      source={IMAGES.category_selected}
                      style={styles.categorySelectedIcon}
                    />
                  </View>
                </View>
              ) : (
                <Image
                  source={IMAGES.category_unselected}
                  style={styles.unSelectedIcon}
                />
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={styles.label}>{focused ? '' : 'Favourite'}</Text>
          ),
          tabBarLabelStyle: styles.label,
          tabBarIcon: ({focused}) => (
            <>
              {focused ? (
                <View style={styles.selectedTab}>
                  <View style={styles.blackCircle}>
                    <Image
                      source={IMAGES.fav_selected}
                      style={styles.categorySelectedIcon}
                    />
                  </View>
                </View>
              ) : (
                <Image
                  source={IMAGES.fav_unselected}
                  style={styles.unSelectedIcon}
                />
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={styles.label}>{focused ? '' : 'More'}</Text>
          ),
          tabBarLabelStyle: styles.label,
          tabBarIcon: ({focused}) => (
            <>
              {focused ? (
                <View style={styles.selectedTab}>
                  <View style={styles.blackCircle}>
                    <Image
                      source={IMAGES.more_selected}
                      style={styles.categorySelectedIcon}
                    />
                  </View>
                </View>
              ) : (
                <Image
                  source={IMAGES.more_unselected}
                  style={styles.unSelectedIcon}
                />
              )}
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  tabBar: {
    height: DeviceInfo.hasNotch() ? 103 : 65,
    position: 'absolute',
    bottom: 5,
    borderRadius: 30,
    // backgroundColor: COLORS.white,
    backgroundColor: 'rgba(256, 256, 256, 0.2)',
  },
  label: {
    color: COLORS.gray,
    paddingBottom: 10,
  },
  selectedTab: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 75,
    width: 75,
    borderRadius: 75 / 2,
    marginBottom: 20,
    // backgroundColor: 'rgba(256, 256, 256, 0.1)',
  },
  selectedIcon: {
    height: 55,
    width: 55,
  },
  unSelectedIcon: {
    marginTop: 10,
    height: 25,
    width: 25,
  },
  categorySelectedIcon: {
    height: 25,
    width: 25,
  },
  blackCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    backgroundColor: COLORS.black,
  },
});
