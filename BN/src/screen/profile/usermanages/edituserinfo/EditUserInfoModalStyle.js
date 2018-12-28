import {StyleSheet, Dimensions, Platform, PixelRatio} from "react-native";
import Colors from "../../../../commons/Colors";
import Dimens from "../../../../commons/Dimensions";
import Fonts from "../../../../commons/Fonts";

var screen = Dimensions.get("window");
const styles = StyleSheet.create({
    //style layout wrapper
    wrapContent: {
        width: screen.width - normalize(40),
        flexDirection: "column",
        flexWrap: "wrap",
        height: screen.height - normalize(80),
        backgroundColor: Colors.baseBackground
    },

    header: {
        height: Dimens.height_header,
        backgroundColor: Colors.defaultHeader,
        alignItems: "center",
        flexDirection: "row"
    },
    imgClose: {
        width: Dimens.size_25,
        height: Dimens.size_25,
        marginLeft: Dimens.size_10,
        justifyContent: "flex-start",
        alignSelf: "flex-start",
        alignItems: "flex-start"
    },
    txtTitleHead: {
        justifyContent: "center",
        paddingLeft: Dimens.size_10,
        fontSize: Dimens.size_20,
        color: "white",
        fontFamily: Fonts.RobotoBold,
    },
    layoutTopIcon: {
        flex: 2,
        flexDirection: "column",
        alignItems: "center"
    },
    iconAddUser: {
        width: normalize(100),
        height: normalize(100)
    },
    //style content form input
    layoutContent: {
        flex: 9,
        flexDirection: "column",
        paddingLeft: Dimens.size_10,
        paddingRight: Dimens.size_10

    },
    layoutWrapInput: {
        flexDirection: "row"
    },
    layoutIconInput: {
        flex: 1.5,
        alignItems: "center",
        justifyContent: "center"
    },
    iconInput: {
        alignSelf: "flex-start",
        width: Dimens.size_30,
        height: Dimens.size_30,
        alignItems: "center"
    },
    textTitleInput: {
        fontSize: Dimens.size_16,
        color: Colors.green,
        fontFamily: Fonts.RobotoRegular,
        marginBottom: Dimens.size_5
    },
    layoutInput: {
        flex: 10,
        flexDirection: "column",
        borderColor: "blue",
        color: "blue",
        marginTop:Dimens.size_5
    },
    input: {
        width: "100%",
        marginTop: Dimens.size_5,
        alignSelf: "center",
        color: Colors.black,
        fontSize: Dimens.size_18,
        borderBottomWidth: 2,
        paddingBottom: Dimens.size_5,
        borderBottomColor: Colors.gray,
        fontFamily: Fonts.RobotoRegular,
    },
    viewError:{
        flex: 1, flexDirection: "row"
    },
    hideViewError:{
        width:0,
        height:0
    },
    textError: {
        fontSize: Dimens.size_15,
        color: Colors.red,
        fontFamily: Fonts.RobotoRegular,
    },
    //radio button
    layoutRadio: {
        flex: 1,
        flexDirection: "row",
        marginTop: Dimens.size_20
    },
    radioButtonWrapLeft: {
        marginLeft: normalize(40)
    },
    radioButtonWrapRight: {
        marginLeft: normalize(80)
    },
    radioStyle: {},
    radioLabel: {
        fontSize: Dimens.size_16,
        color: Colors.black,
        fontFamily: Fonts.RobotoRegular,
    },

    //style footer
    layoutFooter: {
        marginLeft: Dimens.size_10,
        marginRight: Dimens.size_10,
        flex: 1,
        flexDirection: "row",
        backgroundColor: Colors.button_default,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 3
    },

    txtSave: {
        fontSize: Dimens.size_20,
        color: Colors.white,
        fontFamily: Fonts.RobotoRegular,
    },
    //indicator loading
    indicatorLoading: {

        zIndex: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',

    },
    viewEmpty: {
        height: normalize(30)
    },
    userNameContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom:10
      },
      textUserName: {
        fontSize: Dimens.size_15,
        color: Colors.black,
        alignSelf: "center",
        fontFamily: Fonts.RobotoRegular,
        textDecorationLine: "underline"
      },

});

export default styles;

export function normalize(size) {
    if (Platform.OS === "ios") {
        return Math.round(PixelRatio.roundToNearestPixel(size));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(size)) - 2;
    }
}
