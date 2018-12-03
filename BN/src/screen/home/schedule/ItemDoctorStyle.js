import {StyleSheet, Platform, PixelRatio} from "react-native";
import Dimens from "../../../commons/Dimensions";
import Colors from "../../../commons/Colors";
import Fonts from "../../../commons/Fonts";

const styles = StyleSheet.create({
    //style layout wrapper
    container: {
        marginLeft: Dimens.size_10,
        marginRight: Dimens.size_10,
        marginBottom: Dimens.size_5,
        flexDirection: "column",
        backgroundColor: "#616975",
        justifyContent: "center",
        height: normalize(120),
    },
    containerClick: {
        marginLeft: Dimens.size_10,
        marginRight: Dimens.size_10,
        marginBottom: Dimens.size_5,
        flexDirection: "column",
        flex: 1,
        backgroundColor: Colors.gray,
        justifyContent: "center"
    },
    layoutTitle: {
        flexDirection: "row",
        alignSelf: "center",
        padding: Dimens.size_10
    },
    titleItem: {
        alignSelf: "center",
        fontSize: Dimens.size_18,
        color: "white",
        fontFamily: Fonts.RobotoRegular
    },

    lineEmpty: {
        borderWidth: 0.5,
        borderColor: "white",
        alignItems: "flex-end"
    },
    itemContent: {
        flexDirection: "row",
        paddingTop: Dimens.size_10,
        paddingBottom: Dimens.size_10
    },

    name: {
        fontSize: Dimens.size_16,
        color: Colors.white,
        fontFamily: Fonts.RobotoRegular
    },
    education: {
        fontSize: Dimens.size_12,
        color: "yellow",
        fontFamily: Fonts.RobotoRegular
    },


    viewOnline: {
        flexDirection: "row"
    },
    iconOnline: {
        width: normalize(15),
        height: normalize(15),
        marginRight: normalize(3),
        alignItems:'center',
        alignSelf:"center"

    },
    timeOnline: {
        fontSize: Dimens.size_12,
        color: Colors.white,
        fontFamily: Fonts.RobotoRegular
    },

    avataContainer: {
        flex: 3,
        flexDirection: "column",
        alignSelf: "center"
    },
    avata: {
        height: normalize(40),
        width: normalize(40),
        borderRadius: normalize(40) / 2,
        alignSelf: "center"
    },
    contentInfo: {
        flex: 8,
        flexDirection: "column"
    },
    arrowDetail: {
        flex: 2,
        flexDirection: "column"
    },
    arrowBtn: {
        flex: 1,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    imageArrow: {
        width: normalize(20),
        height: normalize(30)
    }
});

export default styles;

export function normalize(size) {
    if (Platform.OS === "ios") {
        return Math.round(PixelRatio.roundToNearestPixel(size));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(size)) - 2;
    }
}
