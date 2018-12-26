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
    textWelcome: {
        alignSelf: "center",
        justifyContent: "center",
        fontSize: Dimens.size_18,
        paddingTop: Dimens.size_10,
        fontFamily: Fonts.RobotoRegular,
    },
    textInfoOnline: {
        paddingLeft: Dimens.size_10,
        paddingRight: Dimens.size_10,
        fontSize: Dimens.size_15,
        paddingTop: Dimens.size_10,
        alignSelf: "center",
        fontFamily: Fonts.RobotoRegular,
    },
    layoutButton: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: Dimens.size_10
    },
    btnFindDoctorDefault: {
        width: normalize(150),
        height: normalize(45),
        backgroundColor: Colors.button_default,
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

    btnFindDoctorSelected: {
        width: normalize(150),
        height: normalize(45),
        backgroundColor: Colors.defaultHeader,
        justifyContent: "center",
        margin: Dimens.size_10,
        borderRadius:Dimens.size_5
    },
    //style dropdown list
    layoutList: {
        flex:1,
        marginTop: Dimens.size_15,
        flexDirection: "column"
    },
    layoutTitleDropdown: {
        flexDirection: "column",
        width: normalize(300),
        height: normalize(80),
        marginLeft: Dimens.size_30,
        marginRight: Dimens.size_30,
        paddingLeft: Dimens.size_20,
        paddingRight: Dimens.size_20,
        marginTop: Dimens.size_15,
        paddingBottom: Dimens.size_5,
        backgroundColor: "#616975",
        alignSelf: "center"
    },
    textSelect: {
        fontSize: Dimens.size_20,
        color: Colors.white,
        fontFamily: Fonts.RobotoBold,
    },
    layoutInput: {
        flexDirection: "row"
    },
    input: {
        width: normalize(230),
        alignSelf: "center",
        color: Colors.white,
        fontSize: Dimens.size_18,
        fontFamily: Fonts.RobotoRegular,
    },
    imageInput: {
        width: normalize(35),
        height: normalize(30),
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginBottom: Dimens.size_10,
    },

    lineStyle: {
        borderWidth: 0.5,
        borderColor: "white",
        alignItems: "flex-end"
    },
    layoutListDoctor: {
        flexDirection: "column",
        width: normalize(280),
        backgroundColor: "#393e44",
        alignSelf: "center",
        marginBottom: normalize(85),
    },

    viewEmpty: {
        height: normalize(120)
    },

    //indicator loading
    indicatorLoading: {
        position: "absolute",
        zIndex: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',

    },

    //style dropdown list
    dropdown_2: {
        alignSelf: "flex-end",
        borderWidth: 0,
        backgroundColor: "transparent"
    },
    dropdown_2_text: {
        fontSize: Dimens.size_18,
        color: Colors.white,
        textAlign: "center",
        textAlignVertical: "center",
        fontFamily: Fonts.RobotoRegular,
    },
    dropdown_2_dropdown: {
        width: normalize(280),
        backgroundColor: "#393e44",
        borderWidth: 2,
        borderRadius: 3
    },
    dropdown_2_row: {
        flexDirection: "row",
        height: normalize(40),
        alignItems: "center"
    },
    dropdown_2_row_text: {
        marginHorizontal: 4,
        fontSize: Dimens.size_16,
        color: "navy",
        textAlignVertical: "center",
        fontFamily: Fonts.RobotoRegular,
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
