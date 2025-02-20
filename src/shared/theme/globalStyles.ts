import {StyleSheet} from 'react-native';
import {COLORS} from './colors';
import {RF, RFT} from './responsive';
import {SPACING} from './spacing';
import {SIZING} from './sizing';
const {SECONDARY, BLACK, WHITE} = COLORS;

export const GST = StyleSheet.create({
  ...SPACING,
  ...SIZING,
  FLEX: {
    flex: 1,
  },
  ERROR: {
    marginTop: RF(1),
    fontSize: RFT(10),
    color: SECONDARY,
    marginLeft: RF(15),
  },
  SHADOW: {
    //   shadowColor: COLORS.GRAY_01,
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.09,
    shadowRadius: 4,
    elevation: 5,
  },
  SHADOW_LIGHT: {
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  SHADOW_MID: {
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.24,
    shadowRadius: 3.0,
    elevation: 4,
  },
  SHADOW_HEAVY: {
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  SHADOW_DARK: {
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.58,
    shadowRadius: 20.0,
    elevation: 30,
  },
  HITSLOP: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
  //   DIVIDER: {
  //     borderBottomColor: COLORS.GRAY_07,
  //     borderBottomWidth: 1,
  //   },
  MAINT_CONTAINER: {
    flex: 1,
    alignSelf: 'center',
    width: '80%',
  },
  CONTENT_CONTAINER: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  FLEX_ROW: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  BOTTOM_BTN_CONTANIER: {
    flex: 1,
    alignItems: 'center',
    marginBottom: RF(10),
  },
  TRIANGLE: {
    alignSelf: 'center',
    width: 0,
    height: 0,
    borderLeftWidth: RF(6),
    borderRightWidth: RF(6),
    borderTopWidth: RF(6),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: WHITE,
  },
  SUBMIT_BTN_CONTAINER: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  //   HEADER_CONTAINER: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     justifyContent: 'space-between',
  //     ...SPACING.px4,
  //     ...SPACING.pt2,
  //     ...SPACING.pb4,
  //     borderBottomColor: LIGHT_GRAY,
  //   },
  FLEX5: {
    flex: 5,
  },
  COUPON_TAB_MAIN_CONTAINER: {
    marginTop: 0,
    backgroundColor: WHITE,
    ...SPACING.pt4,
    alignItems: 'center',
  },
  BOTTOM_MODAL: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  HIDDEN: {
    display: 'none',
  },
  STICKY_PADDING: {
    paddingBottom: RF(110),
  },
  PHOTO_FRAME: {
    flex: 1 / 3,
  },
  BC: {backgroundColor: COLORS.BLACK},
});
