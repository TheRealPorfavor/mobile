/* eslint-disable react/jsx-props-no-spreading */
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import React, { useContext, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Divider, Drawer, Switch, Text, TouchableRipple, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwsomeIcons from 'react-native-vector-icons/FontAwesome';
import Color from 'color';
import CustomDrawerSection from './CustomDrawerSection';
import ThemeContext from '../contexts/ThemeContext';
import { getFarmer } from '../Api';

const DrawerContent = (props) => {
  const { navigation, launcherIDsArray, toggleTheme } = props;
  const theme = useTheme();

  const { isThemeDark } = useContext(ThemeContext);

  const font = theme.fonts.medium;
  //   console.log(launcherIDsArray);
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          margin: 16,
          alignItems: 'center',
          height: 24,
        }}
      >
        <Image style={{}} source={require('../images/openchia_icon.png')} />
        <Text
          style={{
            color: 'grey',
            ...font,
            fontSize: 18,
            marginLeft: 24,
            fontWeight: '600',
            fontFamily: 'OpenSans-Regular',
          }}
        >
          OPENCHIA.IO
        </Text>
      </View>
      <Divider style={{ backgroundColor: 'black' }} />
      <DrawerContentScrollView {...props}>
        {/* <DrawerItemList {...props} /> */}
        <CustomDrawerSection style={{}}>
          <DrawerItem
            label="Home"
            onPress={() => navigation.navigate('Home')}
            labelStyle={{ color: 'grey' }}
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="home-outline" size={size} color="grey" />
            )}
          />
          <DrawerItem
            label="Stats"
            onPress={() => navigation.navigate('Stats')}
            labelStyle={{ color: 'grey' }}
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="finance" size={size} color="grey" />
            )}
          />
          <DrawerItem
            label="Farmers"
            onPress={() => navigation.navigate('Farmers')}
            labelStyle={{ color: 'grey' }}
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="silo" size={size} color="grey" />
            )}
          />
          <DrawerItem
            label="Blocks Found"
            onPress={() => navigation.navigate('Blocks Found')}
            labelStyle={{ color: 'grey' }}
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="shape-square-plus" size={size} color="grey" />
            )}
          />
          <DrawerItem
            label="Payouts"
            onPress={() => navigation.navigate('Payouts')}
            labelStyle={{ color: 'grey' }}
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="cash-multiple" size={size} color="grey" />
            )}
          />
        </CustomDrawerSection>
        <CustomDrawerSection title="Launcher IDs">
          <DrawerItem
            label="Add Launcher ID"
            onPress={() => navigation.navigate('Scan Launcher ID')}
            labelStyle={{ color: 'grey' }}
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="plus" size={size} color="grey" />
            )}
          />
          {launcherIDsArray.map((item) => (
            <DrawerItem
              labelStyle={{ color: 'grey' }}
              key={item.name}
              label={item.value ? item.value : item.name}
              onPress={() => {
                navigation.navigate({ name: 'Farmer Details', params: { launcherID: item.name } });
                // getFarmer(item.name)
                //   .then((data) => {
                //     navigation.navigate({ name: 'Farmer Details', params: { item: data } });
                //   })
                //   .catch((error) => console.log(error));
              }}
              icon={({ color, size }) => (
                <MaterialCommunityIcons name="silo" size={size} color="grey" />
              )}
            />
          ))}
        </CustomDrawerSection>
        <CustomDrawerSection label="Preferences">
          <TouchableRipple onPress={() => toggleTheme()}>
            <View style={styles.preference}>
              <MaterialCommunityIcons name="theme-light-dark" size={24} color="grey" />
              <Text style={{ color: 'grey', flex: 1, marginStart: 32, ...font }}>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={isThemeDark} />
              </View>
            </View>
          </TouchableRipple>
          {/* <DrawerItem
            label="Dark Theme"
            onPress={() => navigation.navigate('Home')}
            labelStyle={{ color: 'grey' }}
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="cog" size={size} color="grey" />
            )}
          /> */}
        </CustomDrawerSection>
        <CustomDrawerSection showDivider={false}>
          <DrawerItem
            label="Settings"
            onPress={() => navigation.navigate('Home')}
            labelStyle={{ color: 'grey' }}
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="cog" size={size} color="grey" />
            )}
          />
        </CustomDrawerSection>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  preference: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default DrawerContent;
