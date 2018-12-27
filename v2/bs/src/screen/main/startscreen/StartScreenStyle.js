import {StyleSheet, Platform, PixelRatio} from "react-native";
import Dimens from "../../../commons/Dimensions";
import Colors from "../../../commons/Colors";
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
        flexDirection: "column"
    },
    layoutTopTitle: {
        flexDirection: "column"
    },
   
});

export default styles;

export function normalize(size) {
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(size))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(size)) - 2
    }
}
