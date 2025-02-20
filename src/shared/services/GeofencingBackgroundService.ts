import BackgroundFetch from 'react-native-background-fetch';
import axios from 'axios';

const BackgroundTask = async (taskId: any) => {
   // $&

   // $&

  BackgroundFetch.finish(taskId);
};

const configureBackgroundFetch = () => {
  BackgroundFetch.configure(
    {
      minimumFetchInterval: 15, // minutes
      stopOnTerminate: false, // Set to false to continue running after app is terminated
      startOnBoot: true, // Start fetch on device reboot
    },
    BackgroundTask,
  )
    .then(() => {
       // $&
    })
    .catch(error => {
      console.error('BackgroundFetch failed to start:', error);
    });
};

export {configureBackgroundFetch};
