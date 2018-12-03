import {StyleSheet, Platform, PixelRatio, Dimensions} from "react-native";
import Dimens from "../commons/Dimensions";
import Colors from "../commons/Colors";


const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: normalize(250),
        flexWrap: "wrap",
        height: normalize(180),
        borderRadius: normalize(10),
        borderColor: Colors.gray,
        backgroundColor: Colors.white,
        paddingTop: Dimens.size_15,

    },
    layoutContent: {
        alignItems: 'center',
        flex: 5,
        flexDirection: "column"
    },
    viewLine: {
        backgroundColor: Colors.gray,
        height: normalize(2),
        width: normalize(250),

    },
    layoutFooter: {
        flex: 2,
        flexDirection: "column",

    },
    textTitle: {
        flex: 2,
        fontSize: Dimens.size_18,
        fontWeight: 'bold',
    },
    textContent: {
        flex: 8,
        fontSize: Dimens.size_14,
        marginTop: Dimens.size_10,
        paddingLeft: Dimens.size_8,
        paddingRight: Dimens.size_8
    },
    layoutButton: {
        justifyContent: "center",
        alignSelf: 'center',
        height: "100%",
        alignItems: "center"
    },

    textOk: {
        fontSize: Dimens.size_15,
        color: Colors.blue,
        fontWeight: "bold",

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
