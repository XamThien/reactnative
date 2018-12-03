import { Platform,PixelRatio  } from "react-native";

export default  {
  height_header:normalize(55),
  size_5: normalize(5),
  size_8: normalize(8),
  size_10: normalize(10),
  size_11: normalize(11),
  size_12: normalize(12),
  size_13: normalize(13),
  size_14: normalize(14),
  size_15: normalize(15),
  size_16: normalize(16),
  size_17: normalize(17),
  size_18: normalize(18),
  size_19: normalize(19),
  size_20: normalize(20),
  size_22: normalize(22),
  size_24: normalize(24),
  size_25: normalize(25),
  size_26: normalize(26),
  size_28: normalize(28),
  size_30: normalize(30),
};

export function normalize(size) {
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(size))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(size)) - 2
  }
}
