import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';
import {SafeAreaView, ScrollView, Text, View, StyleSheet, Platform, Image} from 'react-native';
import { DrawerActions } from 'react-navigation';
import { Home, Info, Settings, Cloud } from "./screenNames";
import styles from './DrawerStyle';
import {Translate} from "../../utils/Language"
import DefineKey from "../../config/language/DefineKey";


export default class DrawerMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isChangeColorHome: true,
      isChangeColorInfo: false,
      isChangeColorSetting: false,
    };
  }
   
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.updateColorItems(route);
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
    
  }

  updateColorItems(route) {
    if(route === Home) {
      this.setState({
        isChangeColorHome: true, 
        isChangeColorInfo: false, 
        isChangeColorSetting: false})
    } else if(route === Info) {
      this.setState({
        isChangeColorHome: false, 
        isChangeColorInfo: true, 
        isChangeColorSetting: false})
    } else if(route === Settings) {
      this.setState({
        isChangeColorHome: false, 
        isChangeColorInfo: false, 
        isChangeColorSetting: true})
    }
  }

render () {
    return (
     <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container}>
        <View style = {styles.layout_wrap_avata}>
            <Image source ={require('../../../assets/icon_app.png')} style ={styles.img_avata}/> 
        </View>
          <View style = {styles.layout_wrap_menu}>
            <View style={styles.layout_menuItem}>
              <Image source ={require('../../../assets/icon_app.png')} style ={styles.icon_menu}/>
              <Text onPress={this.navigateToScreen(Home)} style={this.state.isChangeColorHome ? 
                styles.menuItemClick: styles.menuItem}>{Translate(DefineKey.Drawer_Menu_home)}</Text>
            </View>
            <View style={styles.layout_menuItem}>
              <Image source ={require('../../../assets/icon_app.png')} style ={styles.icon_menu}/>
              <Text onPress={this.navigateToScreen(Info)} style={this.state.isChangeColorInfo ? 
                styles.menuItemClick: styles.menuItem} >{Translate(DefineKey.Drawer_Menu_infor)}</Text>
            </View>
            <View style={styles.layout_menuItem}>
              <Image source ={require('../../../assets/icon_app.png')} style ={styles.icon_menu}/>
              <Text onPress={this.navigateToScreen(Settings)} style={this.state.isChangeColorSetting ? 
                styles.menuItemClick: styles.menuItem}>{Translate(DefineKey.Drawer_Menu_setting)}</Text>
            </View>
          </View>
        </ScrollView>
    </SafeAreaView>);
  }
}

DrawerMenu.propTypes = {
  navigation: PropTypes.object
};
