import { StyleSheet,Platform,PixelRatio  } from "react-native";
import Colors from "../../commons/Colors";
import Dimens from "../../commons/Dimensions";
import Fonts from "../../commons/Fonts";

const styles = StyleSheet.create({
  //style layout wrapper
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: Colors.baseBackground,
    justifyContent: "center"
  },
  layoutWrapContent: {
    flex: 10,
    flexDirection: "column"
  },

  layoutTopIcon: {
    flexDirection: "column",
    marginBottom: Dimens.size_20,
  },

  //layout avata
  avataContainer: {
    flexDirection: "column",
    alignSelf: "center",
    marginTop: Dimens.size_8
  },
  avata: {
    height: normalize(80),
    width: normalize(80),
    borderRadius: normalize(80) / 2,
    alignSelf: "center"
  },
  userNameContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Dimens.size_5,
    
  },
  textUserName: {
    fontSize: Dimens.size_25,
    color: Colors.black,
    alignSelf: "center",
    fontFamily: Fonts.RobotoRegular,
  },
  //layout all item
  layoutItem: {
    flexDirection: "row",
    paddingLeft: Dimens.size_15,
    alignItems: 'center',
    marginTop: Dimens.size_10,
    marginBottom: Dimens.size_10,
  },
  itemImage: {
    width: Dimens.size_30,
    height: Dimens.size_30,
   
  },
  itemText: {
    marginLeft: Dimens.size_10,
    fontSize: Dimens.size_20,
    color: Colors.black
  },

  //style layout footer
  layoutFooter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  layoutButton: {
    height: normalize(45),
    width: normalize(150),
    backgroundColor: Colors.button_default,
    borderRadius: normalize(5),
    justifyContent: "center"
  },
  textButton: {
    fontSize: Dimens.size_20,
    color: Colors.white,
    alignSelf: "center",
    fontFamily: Fonts.RobotoRegular,
  }
});

export default styles;
export function normalize(size) {
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(size))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(size)) - 2
  }
}
