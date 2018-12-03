import {StyleSheet, Platform, PixelRatio} from "react-native";
import Dimens from "../../commons/Dimensions";
import Colors from "../../commons/Colors";
import Fonts from "../../commons/Fonts";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: Colors.baseBackground
    },

    //style layout content
    layoutContent: {
        flex: 9,
        flexDirection: "column"
    },
    textHeader: {
        fontSize: Dimens.size_25,
        color: Colors.black,
        textAlign: "center",
        justifyContent: "center",
        paddingTop: Dimens.size_20,
        fontFamily: Fonts.RobotoBold,
    },
    txtContent: {
        paddingLeft: Dimens.size_10,
        paddingRight: Dimens.size_10,
        marginTop: Dimens.size_10,
        fontSize: Dimens.size_16,
        justifyContent: "center",
        textAlign: "center",
        fontFamily: Fonts.RobotoRegular,
    },
    //style layout button login and register
    layoutButton: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: Dimens.size_20
    },
    btnRegister: {
        width: normalize(150),
        height: normalize(45),
        backgroundColor: "#04a4f4",
        justifyContent: "center",
        margin: Dimens.size_10,
        borderRadius:Dimens.size_5
    },
    textButton: {
        color: Colors.white,
        fontSize: Dimens.size_20,
        textAlign: "center",
        fontFamily: Fonts.RobotoRegular,
    },
    textSocial: {
        color: Colors.white,
        fontSize: Dimens.size_16,
        textAlign: "center",
        fontFamily: Fonts.RobotoRegular,
    },

    //style layout line or
    layoutOr: {
        marginTop: Dimens.size_20,
        paddingLeft: Dimens.size_25,
        paddingRight: Dimens.size_25,
        flexDirection: 'row',
        height: Dimens.size_16,

    },
    leftOr: {
        flex: 4,
        backgroundColor: Colors.gray,
        height: 1.5,
        alignSelf: 'center',
    },
    centerOr: {
        flex: 1.5,
        justifyContent: "center",
        alignSelf: 'center',

    },
    textOr: {
        fontSize: Dimens.size_12,
        color: Colors.gray,
        fontWeight: "bold",
        alignSelf: 'center',

    },
    rightOr: {
        flex: 4,
        backgroundColor: Colors.gray,
        height: 1.5,
        alignSelf: 'center',
    },

    //style button login facebook,google
    layoutFacebook: {
        marginTop: Dimens.size_20,
        width: normalize(250),
        borderRadius: Dimens.size_20,
        height: normalize(40),
        backgroundColor: Colors.facebook,
        justifyContent: "center",
        alignSelf: "center",

    },
    viewSocial: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    iconSocial: {
        width: Dimens.size_20,
        height: Dimens.size_20,
        marginRight: Dimens.size_10,
        alignSelf:"center"
    },

    layoutGoogle: {
        width: normalize(250),
        borderRadius: Dimens.size_20,
        height: normalize(40),
        margin: Dimens.size_10,
        backgroundColor: Colors.red,
        justifyContent: "center",
        alignSelf: "center",

    },
    //style layout footer
    layoutFooter: {
        justifyContent: "center",
        flex: 1,
        flexDirection: "column",
        borderTopWidth: 0
    },
    textFooter: {
        justifyContent: "center",
        textAlign: "center",
        fontSize: Dimens.size_16,
        paddingLeft: Dimens.size_10,
        paddingRight: Dimens.size_10,
        textDecorationLine: "underline",
        fontFamily: Fonts.RobotoRegular,
    },
    image: {
        width: normalize(120),
        height: normalize(120),
        justifyContent: "center",
        alignItems: "center",
        marginTop: Dimens.size_20
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