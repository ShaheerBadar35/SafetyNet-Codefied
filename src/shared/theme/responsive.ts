import {Dimensions, PixelRatio} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import DeviceInfo from 'react-native-device-info';
export const isTablet = DeviceInfo.isTablet();
const widthPercentageToDP = (widthPercent: any) => {
  const screenWidth = Dimensions.get('window').width;
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};
const heightPercentageToDP = (heightPercent: any) => {
  const screenHeight = Dimensions.get('window').height;
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};
const RFView = (value: number) => {
  return RFValue(value * (isTablet ? 0.74 : 0.89)); //0.79
};
const RFTextFont = (value: number) => {
  return RFValue(value * (isTablet ? 0.69 : 0.89)); //0.79
};
export {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
  RFView as RF,
  RFTextFont as RFT,
};
