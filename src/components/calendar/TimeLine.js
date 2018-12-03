"use strict";

import React, { Component } from "react";
import {
  StyleSheet,
  ListView,
  Image,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform, PixelRatio
} from "react-native";
import Dimens from "../../commons/Dimensions";
import Colors from "../../commons/Colors";
import Fonts from "../../commons/Fonts";

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});

const defaultCircleSize = 13;
const defaultCircleColor = "#007AFF";
const defaultLineWidth = 2;
const defaultLineColor = "#007AFF";
const defaultTimeTextColor = "black";
const defaultDotColor = "white";
const defaultInnerCircle = "none";

export default class Timeline extends Component {
  constructor(props, context) {
    super(props, context);

    this._renderRow = this._renderRow.bind(this);
    this.renderTime = (this.props.renderTime
      ? this.props.renderTime
      : this._renderTime
    ).bind(this);
    this.renderDetail = (this.props.renderDetail
      ? this.props.renderDetail
      : this._renderDetail
    ).bind(this);
    this.renderCircle = (this.props.renderCircle
      ? this.props.renderCircle
      : this._renderCircle
    ).bind(this);
    this.renderEvent = this._renderEvent.bind(this);

    this.state = {
      data: this.props.data,
      dataSource: ds.cloneWithRows(this.props.data),
      x: 0,
      width: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
      dataSource: ds.cloneWithRows(nextProps.data)
    });
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <ListView
          ref="listView"
          style={[styles.listview, this.props.listViewStyle]}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          automaticallyAdjustContentInsets={false}
          enableEmptySections={true}
          {...this.props.options}
        />
      </View>
    );
  }

  _renderRow(rowData, sectionID, rowID) {
    let content = null;

    switch (this.props.columnFormat) {
      case "single-column-left":
        content = (
          <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
            {this.renderTime(rowData, sectionID, rowID)}
            {this.renderEvent(rowData, sectionID, rowID)}
            {this.renderCircle(rowData, sectionID, rowID)}
          </View>
        );
        break;
    }
    return <View key={rowID}>{content}</View>;
  }

  _renderTime(rowData, sectionID, rowID) {
    if (!this.props.showTime) {
      return null;
    }
    var timeWrapper = null;
    switch (this.props.columnFormat) {
      case "single-column-left":
        timeWrapper = {
          alignItems: "flex-end"
        };
        break;
    }
    //check status clickable
    if(this.props.timeClickable) {
      return (
        <View style={timeWrapper}>
          <TouchableOpacity style={rowData.clicked ? styles.timeContainerClick : [styles.timeContainer, this.props.timeContainerStyle]} onPress ={() => {
            this.onclickItem(rowData);
          }}>
            <Text style={rowData.clicked ? styles.timeClick : styles.time}>
              {rowData.time}
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={timeWrapper}>
          <View style={[styles.timeContainer, this.props.timeContainerStyle]}>
            <Text style={[styles.time, this.props.timeStyle]}>
              {rowData.time}
            </Text>
          </View>
        </View>
      );
    }
    
  }

  onclickItem(dataTime) {
    this.props.onClickItem(dataTime);
  }

  _renderEvent(rowData, sectionID, rowID) {
    const lineWidth = rowData.lineWidth
      ? rowData.lineWidth
      : this.props.lineWidth;
    const isLast = this.props.renderFullLine
      ? !this.props.renderFullLine
      : this.state.data.slice(-1)[0] === rowData;
    const lineColor = isLast
      ? "rgba(0,0,0,0)"
      : rowData.lineColor ? rowData.lineColor : this.props.lineColor;
    let opStyle = null;

    switch (this.props.columnFormat) {
      case "single-column-left":
        opStyle = {
          borderColor: lineColor,
          borderLeftWidth: lineWidth,
          borderRightWidth: 0,
          marginLeft: 20,
          paddingLeft: 20
        };
        break;
    }
    if (this.props.hideLine) {
        return (<View></View>);
    } else {
        return (
            <View
              style={[styles.details, opStyle]}
              onLayout={evt => {
                if (!this.state.x && !this.state.width) {
                  const { x, width } = evt.nativeEvent.layout;
                  this.setState({ x, width });
                }
              }}
            >
              <TouchableOpacity
                disabled={this.props.onEventPress == null}
                style={[this.props.detailContainerStyle]}
                onPress={() =>
                  this.props.onEventPress ? this.props.onEventPress(rowData) : null
                }
              >
                <View style={styles.detail}>
                  {this.renderDetail(rowData, sectionID, rowID)}
                </View>
                {this._renderSeparator()}
              </TouchableOpacity>
            </View>
          );
    }
    
  }

  _renderDetail(rowData, sectionID, rowID) {
    let title = rowData.description ? (
      <View>
        <Text style={[styles.title, this.props.titleStyle]}>
          {rowData.title}
        </Text>
        <Text style={[styles.description, this.props.descriptionStyle]}>
          {rowData.description}
        </Text>
      </View>
    ) : (
      <Text style={[styles.title, this.props.titleStyle]}>{rowData.title}</Text>
    );
    return <View style={styles.container}>{title}</View>;
  }

  _renderCircle(rowData, sectionID, rowID) {
    var circleSize = rowData.circleSize
      ? rowData.circleSize
      : this.props.circleSize ? this.props.circleSize : defaultCircleSize;
    var circleColor = rowData.circleColor
      ? rowData.circleColor
      : this.props.circleColor ? this.props.circleColor : defaultCircleColor;
    var lineWidth = rowData.lineWidth
      ? rowData.lineWidth
      : this.props.lineWidth ? this.props.lineWidth : defaultLineWidth;

    var circleStyle = null;

    switch (this.props.columnFormat) {
      case "single-column-left":
        circleStyle = {
          width: this.state.x ? circleSize : 0,
          height: this.state.x ? circleSize : 0,
          borderRadius: circleSize / 2,
          backgroundColor: circleColor,
          left: this.state.x - circleSize / 2 + (lineWidth - 1) / 2
        };
        break;
    }

    var innerCircle = null;
    switch (this.props.innerCircle) {
      case "icon":
        let iconSource = rowData.icon ? rowData.icon : this.props.icon;
        let iconStyle = {
          height: circleSize,
          width: circleSize
        };
        innerCircle = (
          <Image
            source={iconSource}
            style={[iconStyle, this.props.iconStyle]}
          />
        );
        break;
      case "dot":
        let dotStyle = {
          height: circleSize / 2,
          width: circleSize / 2,
          borderRadius: circleSize / 4,
          backgroundColor: rowData.dotColor
            ? rowData.dotColor
            : this.props.dotColor ? this.props.dotColor : defaultDotColor
        };
        innerCircle = <View style={[styles.dot, dotStyle]} />;
        break;
    }
    //set hide or display circle
    if (this.props.hideLine) {
        return (<View></View>)
    } else {
    return (
      <View style={[styles.circle, circleStyle, this.props.circleStyle]}>
        {innerCircle}
      </View>
    );
    }
  }

  _renderSeparator() {
    if (!this.props.separator) {
      return null;
    }
    return <View style={[styles.separator, this.props.separatorStyle]} />;
  }
}

Timeline.defaultProps = {
  circleSize: defaultCircleSize,
  circleColor: defaultCircleColor,
  lineWidth: defaultLineWidth,
  lineColor: defaultLineColor,
  innerCircle: defaultInnerCircle,
  columnFormat: "single-column-left",
  separator: false,
  showTime: true
};

const styles = StyleSheet.create({ 
  listview: {
    flex: 1,
    backgroundColor: 'blue'
  },
  sectionHeader: {
    marginBottom: normalize(15),
    backgroundColor: "#007AFF",
    height: normalize(30),
    justifyContent: "center"
  },
  sectionHeaderText: {
    color: "#FFF",
    fontSize: Dimens.size_14,
    alignSelf: "center"
  },
  rowContainer: {
    flexDirection: "row",
    flex: 1,
    //alignItems: 'stretch',
    justifyContent: "center"
  },
  timeContainer: {
    width: normalize(65),
    height: normalize(40),
    justifyContent: 'center',
    alignItems: 'center'
  },
  timeContainerClick: {
    borderRadius: Math.round(normalize(60)) / 2,
    width: normalize(60),
    height: normalize(60),
    backgroundColor: Colors.blue,
    justifyContent: 'center',
    alignItems: 'center'
  },
  timeClick: {
    textAlign: "right",
    color: Colors.white,
    fontWeight: "bold",
  },
  time: {
    textAlign: "right",
    color: Colors.black,
    fontWeight: "bold"
  },
  circle: {
    width: normalize(16),
    height: normalize(16),
    borderRadius: normalize(10),
    position: "absolute",
    left: normalize(-8),
    alignItems: "center",
    justifyContent: "center"
  },
  dot: {
    width: normalize(8),
    height: normalize(8),
    borderRadius: normalize(4),
    backgroundColor: defaultDotColor
  },
  title: {
    fontSize: Dimens.size_12,
    fontWeight: "bold"
  },
  details: {
    borderLeftWidth: defaultLineWidth,
    flexDirection: "column",
    flex: 1
  },
  detail: { 
      paddingTop: normalize(10), 
      paddingBottom: normalize(10) 
    },
  description: {
    marginTop: normalize(10)
  },
  separator: {
    height: 1,
    backgroundColor: "#aaa",
    marginTop: normalize(10),
    marginBottom: normalize(10)
  }
});

export function normalize(size) {
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(size))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(size)) - 2
    }
}
