// import {ICONS} from '@assets';
// import {useSafeArea} from '@components/safeAreaInsets';
// import SimpleHeader from '@components/simpleHeader';
// import Wrapper from '@components/wrapper';
// import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
// import {COLORS} from '@theme/colors';
// import {RF, WP} from '@theme/responsive';
// import {SPACING} from '@theme/spacing';
// import {HELP_GUIDE_DATA} from '@utils/constants';
// import React, {useEffect, useState} from 'react';
// import {FlatList, StyleSheet, View} from 'react-native';
// import RenderItem from './components/RenderItem';
// import CustomFooter from '@components/customFooter';
// import {getFileUrl} from './helper';
// import InstaStory from 'react-native-insta-story';
// import Video from 'react-native-video';
// import CustomText from '@components/customText';
// import {INTER} from '@theme/fonts';
// import CustomButton from '@components/customButton';

// const HelpGuide = () => {
//   const insets: any = useSafeArea();
//   const [filePath, setFilePath] = useState('');
//   const tabBarHeight: any = useBottomTabBarHeight();

//   useEffect(() => {
//     getFileUrl().then(url => {
//       if (url) {
//          // $&
//         setFilePath(url);
//         // Use the URL in your app (e.g., display an image)
//       }
//     });
//   }, []);

//   return (
//     <Wrapper noPaddingBottom>
//       <SimpleHeader
//         title="Help Guide"
//         icon={ICONS.HELP}
//         containerStyle={{
//           paddingTop: insets?.top + RF(36),
//           ...SPACING.pb9,
//         }}
//       />
//       <View
//         style={[
//           styles.container,
//           {paddingBottom: tabBarHeight + insets?.bottom + RF(20)},
//         ]}>
//         {filePath && (
//           <>
//             <CustomText
//               size={18}
//               fontFamily={INTER.SEMI_BOLD}
//               color={COLORS.LIGHT_GRAY_04}
//               style={{lineHeight: RF(24), ...SPACING.mb2}}>
//               Walk Through Guide
//             </CustomText>
//             <Video
//               source={{uri: filePath}}
//               style={[
//                 styles.video,
//                 {marginBottom: tabBarHeight + insets?.bottom},
//               ]}
//               controls={true}
//               resizeMode="contain"
//               onBuffer={() =>  // $&}
//               onError={error =>  // $&}
//             />
//           </>
//         )}
//       </View>
//       <CustomFooter
//         fontColor={COLORS.LIGHT_GRAY_05}
//         containerStyle={{
//           position: 'absolute',
//           bottom: 0,
//           width: '100%',
//           alignItems: 'center',
//           paddingBottom: tabBarHeight + insets?.bottom,
//         }}
//       />
//     </Wrapper>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     // position: 'absolute',
//     flex: 1,
//     top: -RF(12),
//     minHeight: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: WP(8),
//     borderTopLeftRadius: RF(7),
//     borderTopRightRadius: RF(7),
//     backgroundColor: COLORS.PRIMARY,
//   },
//   video: {
//     width: '100%',
//     height: 250, // Adjust height as needed
//   },
// });

// export default HelpGuide;

import {ICONS} from '@assets';
import {useSafeArea} from '@components/safeAreaInsets';
import SimpleHeader from '@components/simpleHeader';
import Wrapper from '@components/wrapper';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS} from '@theme/colors';
import {RF, WP} from '@theme/responsive';
import {SPACING} from '@theme/spacing';
import {HELP_GUIDE_DATA} from '@utils/constants';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import RenderItem from './components/RenderItem';
import CustomFooter from '@components/customFooter';
import {getFileUrl} from './helper';
import InstaStory from 'react-native-insta-story';
import Video from 'react-native-video';
import CustomText from '@components/customText';
import {INTER} from '@theme/fonts';
import CustomButton from '@components/customButton';
import {useIsFocused} from '@react-navigation/native';

const HelpGuide = () => {
  const insets: any = useSafeArea();
  const [filePath, setFilePath] = useState('');
  const tabBarHeight: any = useBottomTabBarHeight();
  // Determine if the screen is focused
  const isFocused = useIsFocused();

  useEffect(() => {
    getFileUrl().then(url => {
      if (url) {
         // $&
        setFilePath(url);
      }
    });
  }, []);

  return (
    <Wrapper noPaddingBottom>
      <SimpleHeader
        title="Help Guide"
        icon={ICONS.HELP}
        containerStyle={{
          paddingTop: insets?.top + RF(36),
          ...SPACING.pb9,
        }}
      />
      <View
        style={[
          styles.container,
          {paddingBottom: tabBarHeight + insets?.bottom + RF(20)},
        ]}>
        {filePath && (
          <>
            <CustomText
              size={18}
              fontFamily={INTER.SEMI_BOLD}
              color={COLORS.LIGHT_GRAY_04}
              style={{lineHeight: RF(24), ...SPACING.mb2}}>
              Walk Through Guide
            </CustomText>
            <Video
              source={{uri: filePath}}
              style={[
                styles.video,
                {marginBottom: tabBarHeight + insets?.bottom},
              ]}
              controls={true}
              resizeMode="contain"
              onBuffer={() => {}}
              onError={error => {}}
              // Pause video when screen is not focused
              paused={!isFocused}
            />
          </>
        )}
      </View>
      <CustomFooter
        fontColor={COLORS.LIGHT_GRAY_05}
        containerStyle={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          alignItems: 'center',
          paddingBottom: tabBarHeight + insets?.bottom,
        }}
      />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: -RF(12),
    minHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: WP(8),
    borderTopLeftRadius: RF(7),
    borderTopRightRadius: RF(7),
    backgroundColor: COLORS.PRIMARY,
  },
  video: {
    width: '100%',
    height: 250, // Adjust height as needed
  },
});

export default HelpGuide;
