import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity
} from "react-native";
import { DrawerActions } from 'react-navigation';
import { Home, ScheduleMenu, Help, Term, Info } from "./screenNames";
import styles from './DrawerStyle';
import {Translate} from "../../utils/Language"
import DefineKey from "../../config/language/DefineKey";
import ScreenName from '../../commons/ScreenName';


export default class DrawerMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isChangeColorHome: true,
      isChangeColorSchedule: false,
      isChangeColorHelp: false,
      isChangeColorTerm: false,
    };
  }
   
  navigateToScreen = (route) => () => {
    console.log('nvTien - router name: ' + route);
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.updateColorItems(route);
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
    
  }

  // redirectPage(route, navigateAction) {
  //   console.log('nvTien - router name: ' + route);
  //   if(route === Info) {
  //     console.log('nvTien - router Info: ');
  //     this.props.navigation.navigate('Info')
  //     } else if(route === Help) {
  //       this.props.navigation.navigate(ScreenName.Screen_Help)
  //     } else if(route === Term) {
  //       this.props.navigation.navigate(ScreenName.Screen_Help)
  //     } else {
  //       this.props.navigation.dispatch(navigateAction);
  //     }
  //     //this.props.navigation.dispatch(navigateAction);
  //     this.props.navigation.dispatch(DrawerActions.closeDrawer())
  // }

  updateColorItems(route) {
    if(route === Home) {
      this.setState({
        isChangeColorHome: true, 
        isChangeColorSchedule: false, 
        isChangeColorHelp: false,
        isChangeColorTerm: false
      })
    } else if(route === ScheduleMenu) {
      this.setState({
        isChangeColorHome: false, 
        isChangeColorSchedule: true, 
        isChangeColorHelp: false,
        isChangeColorTerm: false
      })
    } else if(route === Help) {
      this.setState({
        isChangeColorHome: false, 
        isChangeColorSchedule: false, 
        isChangeColorHelp: true,
        isChangeColorTerm: false
      })
    } else if(route === Term) {
      this.setState({
        isChangeColorHome: false, 
        isChangeColorSchedule: false, 
        isChangeColorHelp: false,
        isChangeColorTerm: true
      })
    }
  }

  render () {
    return (
     <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container}>
          <TouchableOpacity style = {styles.layout_wrap_avata}
          onPress ={() => {
              
          }}>
        <View style = {styles.layout_wrap_avata}>
            <Image source ={require('../../../assets/icon_app.png')} style ={styles.img_avata}/> 
        </View>
        </TouchableOpacity>
          <View style = {styles.layout_wrap_menu}>
              {/* menu item main, home page */}
            <View style={styles.layout_menuItem}>
              <Image source ={require('../../../assets/icon_nav_home.png')} style ={styles.icon_menu}/>
              <Text onPress={this.navigateToScreen(Home)} style={this.state.isChangeColorHome ? 
                styles.menuItemClick: styles.menuItem}>{Translate(DefineKey.Main_menu_item_home)}</Text>
            </View>
                {/* menu item examination schedule */}
            {/* <View style={styles.layout_menuItem}>
              <Image source ={require('../../../assets/icon_nav_schedule.png')} style ={styles.icon_menu}/>
              <Text onPress={this.navigateToScreen(ScheduleMenu)} style={this.state.isChangeColorSchedule ? 
                styles.menuItemClick: styles.menuItem} >{Translate(DefineKey.Main_menu_item_examination_schedule)}</Text>
            </View> */}
              {/* menu item help */}
            {/* <View style={styles.layout_menuItem}>
              <Image source ={require('../../../assets/icon_app.png')} style ={styles.icon_menu}/>
              <Text onPress={this.navigateToScreen(Help)} style={this.state.isChangeColorHelp ? 
                styles.menuItemClick: styles.menuItem}>{Translate(DefineKey.Main_menu_item_help)}</Text>
            </View> */}
            {/* menu item term of use */}
            {/* <View style={styles.layout_menuItem}>
              <Image source ={require('../../../assets/icon_app.png')} style ={styles.icon_menu}/>
              <Text onPress={this.navigateToScreen(Term)} style={this.state.isChangeColorTerm ? 
                styles.menuItemClick: styles.menuItem}>{Translate(DefineKey.Main_menu_item_term)}</Text>
            </View> */}
            
          </View>
        </ScrollView>
    </SafeAreaView>);
  }
}

DrawerMenu.propTypes = {
  navigation: PropTypes.object
};
