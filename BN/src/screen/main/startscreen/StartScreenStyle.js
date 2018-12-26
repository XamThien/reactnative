import { StyleSheet } from "react-native";
import Colors from "../../../commons/Colors";
import Dimens from "../../../commons/Dimensions";
import Fonts from "../../../commons/Fonts";

const styles = StyleSheet.create({
  //style layout wrapper
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: Colors.baseBackground,
    justifyContent: "center"
  },

  layoutWrapContent: {
    flex: 1,
    flexDirection: "column",
  },
  wrapperButton: {
    flex: 1,
    flexDirection: "column"
  },
  layoutButton: {
    flex: 1,
    flexDirection: "column",
    marginTop: Dimens.size_20,
    marginBottom: Dimens.size_20,
    marginLeft: Dimens.size_30,
    marginRight: Dimens.size_30,
    backgroundColor: Colors.button_default,
    justifyContent: "center",
    borderRadius: Dimens.size_5
  },
  textButton: {
    fontSize: Dimens.size_15,
    color: Colors.white,
    fontFamily: Fonts.RobotoBold,
    alignItems: "center",
    alignSelf: "center"
  }
});

export default styles;
