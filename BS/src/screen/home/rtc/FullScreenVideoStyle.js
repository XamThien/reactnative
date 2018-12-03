import {StyleSheet} from 'react-native';
import config from "../../../commons/Config";

export default StyleSheet.create({
  container: {
    backgroundColor:'red',
    width: config.screenWidth,
    height: config.screenHeight - 100
  },
  video: {
    width: config.screenWidth,
    height: config.screenHeight
  }
});
