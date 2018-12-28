/**
 * Sample React Native Calendar Strip
 * https://github.com/BugiDev/react-native-calendar-strip
 * @flow
 */

import React, { Component } from 'react';
import CalendarStrip from './CalendarStrip';

export default class DemoCalendar2 extends Component<{}> {

  onClickDate(selectDate) {
    alert("select date: " + selectDate);
  }

  render() {
    return (
      <CalendarStrip
                    calendarAnimation={{type: 'sequence', duration: 30}}
                    daySelectionAnimation={{type: 'background', duration: 300, highlightColor: '#9265DC'}}
                    style={{height:100, paddingTop: 20, paddingBottom: 10}}
                    calendarHeaderStyle={{color: 'white'}}
                    calendarColor={'#7743CE'}
                    dateNumberStyle={{color: 'white'}}
                    dateNameStyle={{color: 'white'}}
                    iconLeft={require('./img/left-arrow.png')}
                    iconRight={require('./img/right-arrow.png')}
                    iconContainer={{flex: 0.1}}
                    onSelectDate = {this.onClickDate.bind()}
                />
    );
  }
}
