import {
    STARTSCREEN_LOGIN_FACEBOOK,
    STARTSCREEN_LOGIN_FACEBOOK_FAIL,
    STARTSCREEN_LOGIN_FACEBOOK_RESET,
    STARTSCREEN_LOGIN_SOCIAL_SUCCESS,
    STARTSCREEN_LOGIN_GOOGLE,
    STARTSCREEN_LOGIN_GOOGLE_RESET,
    STARTSCREEN_CONFIG_LOGIN_GOOGLE,
    STARTSCREEN_LOGIN_GOOGLE_FAIL
} from "../actions/ActionType";

//Saga effects
import {put, takeLatest, take, all} from "redux-saga/effects";
import {AsyncStorage, Platform} from "react-native";
import {channel} from "redux-saga";
import {
    LoginManager,
    AccessToken,
    GraphRequest,
    GraphRequestManager
} from "react-native-fbsdk";
import Constants from "../commons/Constants";
import RNFetchBlob from "rn-fetch-blob";

//import module google
// import {GoogleSignin, statusCodes} from "react-native-google-signin";

const downloadFileChannel = channel();

var token = "";

//TODO: Handle login facebook
function* loginFacebookSaga() {
    yield put({type: STARTSCREEN_LOGIN_FACEBOOK_RESET});
    token = "";
    yield all(_fbAuth());
}

export function* watchLoginFacebookSaga() {
    yield takeLatest(STARTSCREEN_LOGIN_FACEBOOK, loginFacebookSaga);
    const action = yield take(downloadFileChannel);
    yield put(action);
}

//Create response callback.
function _responseInfoCallback(error, result) {
    if (error) {
        console.log(" nvTien - Error fetching data: " + error.toString());
    } else {

        const dataUser = {
            userName: result.name,
            email: result.email,
            id: result.id,
            token: token
        };

        return downloadFile(dataUser, result.picture.data.url);
    }
}


async function saveKey(value) {
    try {
        await AsyncStorage.setItem(
            Constants.KEY_STORE_USER_PROFILE,
            JSON.stringify(value)
        );
    } catch (error) {
        console.log("Error saving data" + error);
    }
}

function downloadFile(dataUser, urlImage) {
    RNFetchBlob.fetch("GET", urlImage, {
        Authorization: ""
        // more headers  ..
    })
        .then(res => {
            let status = res.info().status;
            console.log("nvTien - do downloadFile...");
            if (status === 200) {
                console.log("nvTien - download file success");
                // the conversion is done in native code
                const base64Str = res.base64();
                var profiles = {
                    ...dataUser,
                    image: base64Str
                };
                saveKey(profiles);
                console.log(`nvTien - StartScreen profile data= ${JSON.stringify(profiles)}`);
                downloadFileChannel.put({
                    type: STARTSCREEN_LOGIN_SOCIAL_SUCCESS,
                    userProfiles: profiles
                });
            } else {
                console.log("nvTien - download file fail");
                // handle other status codes
                put({type: STARTSCREEN_LOGIN_FACEBOOK_FAIL, error: "Login fail!"});
            }
        })
        // Something went wrong:
        .catch((errorMessage, statusCode) => {
            // error handling
            console.log("nvTien - download file error");
            put({type: STARTSCREEN_LOGIN_FACEBOOK_FAIL, error: errorMessage});
        });
}

async function _fbAuth() {
    if (Platform.OS === "android") {
        LoginManager.setLoginBehavior('NATIVE_ONLY');
    }
    // if (Platform.OS === "android") {
    //     LoginManager.setLoginBehavior('WEB_ONLY');
    // }

    //
    // try {
    //     if (Platform.OS === "android") {
    //     LoginManager.setLoginBehavior('NATIVE_ONLY');
    //     }
    //      await LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
    //         result => {
    //             if (result.isCancelled) {
    //                 console.log("nvTien - Login Cancelled");
    //             } else {
    //                 console.log("nvTien - result not cancelled");
    //                 AccessToken.getCurrentAccessToken().then(data => {
    //                     token = data.accessToken.toString();
    //                     const infoRequest = new GraphRequest(
    //                         "/me?fields=name,picture.type(large),email",
    //                         null,
    //                         _responseInfoCallback
    //                     );
    //                     // Start the graph request.
    //                     new GraphRequestManager().addRequest(infoRequest).start();
    //                 });
    //             }
    //         },
    //         function (error) {
    //             console.log("nvTien - some error occurred!! " + error);
    //         }
    //     );
    // } catch (error) {
    //     if (Platform.OS === "android") {
    //         LoginManager.setLoginBehavior('WEB_ONLY');
    //     }
    //      await LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
    //         result => {
    //             if (result.isCancelled) {
    //                 console.log("nvTien - Login Cancelled");
    //             } else {
    //                 console.log("nvTien - result not cancelled");
    //                 AccessToken.getCurrentAccessToken().then(data => {
    //                     token = data.accessToken.toString();
    //                     const infoRequest = new GraphRequest(
    //                         "/me?fields=name,picture.type(large),email",
    //                         null,
    //                         _responseInfoCallback
    //                     );
    //                     // Start the graph request.
    //                     new GraphRequestManager().addRequest(infoRequest).start();
    //                 });
    //             }
    //         },
    //         function (error) {
    //             console.log("nvTien - some error occurred!! " + error);
    //         }
    //     );
    // }

    LoginManager.logInWithReadPermissions(["public_profile"]).then(
        result => {
            if (result.isCancelled) {
                console.log("nvTien - Login Cancelled");
            } else {
                console.log("nvTien - result not cancelled");
                AccessToken.getCurrentAccessToken().then(data => {
                    token = data.accessToken.toString();
                    const infoRequest = new GraphRequest(
                        "/me?fields=name,picture.type(large),email",
                        null,
                        _responseInfoCallback
                    );
                    // Start the graph request.
                    new GraphRequestManager().addRequest(infoRequest).start();
                });
            }
        },
        function (error) {
            console.log("nvTien - some error occurred!! " + error);
        }
    );
}


//TODO: Login google
function* doConfigLoginGoogle() {
    // GoogleSignin.hasPlayServices({ autoResolve: true });
    // GoogleSignin.configure({
    //   iosClientId: Constants.KEY_CLIENT_ID_LOGIN_GOOGLE
    //   //webClientId: '617324734115-pif2nvtbd6ov2srpupq2db3ghgqmsma6.apps.googleusercontent.com'
    // });
    // GoogleSignin.configure({
    //     iosClientId: Constants.KEY_CLIENT_ID_LOGIN_GOOGLE,// what API you want to access on behalf of the user, default is email and profile
    //     webClientId: Constants.KEY_CLIENT_ID_LOGIN_GOOGLE, // client ID of type WEB for your server (needed to verify user ID and offline access)
    //     offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    //     forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
    // });


}

export function* watchConfigLoginGoogleSaga() {
    yield takeLatest(STARTSCREEN_CONFIG_LOGIN_GOOGLE, doConfigLoginGoogle);
}


function* handleSigninGoogle() {
    // yield put({type: STARTSCREEN_LOGIN_GOOGLE_RESET});
    // GoogleSignin.signIn()
    //     .then((response) => {
    //         var dataUser = {
    //             userName: response.user.name,
    //             email: response.email,
    //             id: response.user.id,
    //             token: response.accessToken.toString()
    //         };
    //         //alert("Google signIn success: ")
    //         downloadFile(dataUser, response.user.photo);
    //         _signOut();
    //     })
    //     .catch(error => {
    //         alert("Google signIn fail: " + error)
    //         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //             // user cancelled the login flow
    //             console.log("nvTien - user cancelled the login flow...");
    //         } else if (error.code === statusCodes.IN_PROGRESS) {
    //             // operation (f.e. sign in) is in progress already
    //             console.log("nvTien - operation (f.e. sign in) is in progress already...");
    //         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //             // play services not available or outdated
    //             console.log("nvTien - play services not available or outdated...");
    //         } else {
    //             // some other error happened
    //             console.log("nvTien - some other error happened...");
    //         }
    //     });
}

function _signOut() {
    // GoogleSignin.revokeAccess()
    //     .then(() => GoogleSignin.signOut())
    //     .then(() => {
    //         console.log("Log out...");
    //     })
    //     .done();
}

export function* watchLoginGoogleSaga() {
    yield takeLatest(STARTSCREEN_LOGIN_GOOGLE, handleSigninGoogle);
    const action = yield take(downloadFileChannel);
    yield put(action);
}
