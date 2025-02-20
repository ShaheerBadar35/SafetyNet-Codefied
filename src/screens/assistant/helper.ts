import {setGoogleAssistantWalkthrough} from '@redux/reducers/userReducer';
import {store} from '@redux/store';
import {handleGoogleAssitantWalkthrough} from '@services/UserService';

const hitGoogleAssistantWalkthroughAPI = (
  params: any,
  setLoading: any = () => {},
) => {
  setLoading && setLoading(true);
  handleGoogleAssitantWalkthrough(params)
    .then(({data}: any) => {
      if (data?.status) {
         // $&
        store.dispatch(
          setGoogleAssistantWalkthrough(data?.data?.assistant_walkthrough),
        );
      }
    })
    .catch((err: any) => {
       // $&
    })
    .finally(() => {
      setLoading && setLoading(false);
    });
};

export {hitGoogleAssistantWalkthroughAPI};
