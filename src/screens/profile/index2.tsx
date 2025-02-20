import CustomText from '@components/customText';
import Wrapper from '@components/wrapper';
import React, {useEffect, useState} from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import Voice from '@react-native-voice/voice';
import {AppState, Platform} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';
import {onSpeechRecognized, startListeningForSpeech} from '@utils/helper';
import {
  hasCallPermission,
  hasLocationPermission,
} from '@services/PermissionService';
import CustomButton from '@components/customButton';
import {SPACING} from '@theme/spacing';
import {resetPassword, signin, signup} from '@services/AuthService';

const {VoiceRecognitionModule} = NativeModules;
const voiceRecognitionEvents = new NativeEventEmitter(VoiceRecognitionModule);

const {CallServiceModule} = NativeModules;

const Profile = () => {
  const startListening = async () => {
    const result = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
     // $&

    try {
      await Voice.start('en-US'); // Change to your preferred language code
    } catch (e: any) {
       // $&
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (e: any) {}
  };

  const onSpeechResults = async (event: any) => {
     // $&
     // $&);
    const find_value = 'hello';
    const found = event?.value?.[0];
     // $&);
    if (found?.includes(find_value)) {
       // $&
      // startService();
      CallServiceModule.startCallService('03107487772')
        .then(() =>  // $&)
        .catch((err: any) => console.error('Failed to initiate call:', err));

      // hasCallPermission();
    }
     // $&);
  };

  const onSpeechError = (event: any) => {
    console.error('Speech Error:', event.error.message);
    startListening();
  };

  const onSpeechStart = () => {
     // $&
  };

  const onSpeechEnd = () => {
     // $&
    startListening();
  };

  // const onSpeechRecognized = (event: any) => {
  //    // $&
  //   // Restart listening when it ends to ensure continuous listening
  //   // startListening();
  // };

  useEffect(() => {
    Voice.onSpeechPartialResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechRecognized = onSpeechRecognized;

    // startListening();

    return () => {
      // Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    const subscription = onSpeechRecognized((text: any) => {
       // $& // Log to console or handle as needed
    });

    startListeningForSpeech();

    return () => {
      // stopListeningForSpeech();
      // subscription();
    };
  }, []);

  useEffect(() => {
    voiceRecognitionEvents.addListener('SPEECH_RECOGNIZED', (event: any) => {
       // $&
    });

    return () => {
      // subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (!VoiceRecognitionModule) {
      console.error('VoiceRecognitionModule is null');
      return;
    }

    // Setup the subscription to listen for speech recognition events
    const subscription = voiceRecognitionEvents.addListener(
      'SPEECH_RECOGNIZED',
      event => {
         // $&
      },
    );

    // Cleanup the subscription when the component unmounts
    return () => {
      // subscription.remove();
    };
  }, []);

  useEffect(() => {
    // startService();
  }, []);

  // const startService = () => {
  //   VoiceRecognitionModule.startService()
  //     .then((result: any) =>
  //        // $&,
  //     )
  //     .catch((error: any) => console.error(error));
  // };

  // const stopService = () => {
  //   VoiceRecognitionModule.stopService()
  //     .then((result: any) =>  // $&)
  //     .catch((error: any) => console.error(error));
  // };
  // const addVoiceRecognitionListener = (callback: any) => {
  //    // $&
  //   if (VoiceRecognitionModule) {
  //      // $&
  //     return voiceRecognitionEvents.addListener('SPEECH_RECOGNIZED', callback);
  //   } else {
  //     throw new Error('VoiceRecognitionModule is not available');
  //   }
  // };

  // useEffect(() => {
  //   const subscription = onSpeechRecognized((text: any) => {
  //      // $& // Log to console or handle as needed
  //   });

  //   startListeningForSpeech();

  //   return () => {
  //     // stopListeningForSpeech();
  //     subscription();
  //   };
  // }, [recognizedText]);

  return (
    <Wrapper noPaddingBottom>
      <View style={styles.container}>
        <CustomText>Profile Screen</CustomText>
        <Pressable onPress={startListening}>
          <CustomText>Press for audio</CustomText>
        </Pressable>
        <CustomButton
          title="Signup"
          onPress={() =>
            signup({email: 'p2@yopmail.com', password: '12345678'})
          }
          customStyle={{...SPACING.py3}}
          customContainerStyle={{...SPACING.mt3}}
        />
        <CustomButton
          title="Signin"
          onPress={() =>
            signin({email: 'p2@yopmail.com', password: '12345678'})
          }
          customStyle={{...SPACING.py3}}
          customContainerStyle={{...SPACING.mt3}}
        />
        <CustomButton
          title="ResetPassword"
          onPress={() => resetPassword({email: 'p2@yopmail.com'})}
          customStyle={{...SPACING.py3}}
          customContainerStyle={{...SPACING.mt3}}
        />
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

export default Profile;
