import {sendOtpEmail, verifyOtp} from '@services/AuthService';

const handleSendOtpEmail = async (params: any) => {
  sendOtpEmail(params)
    .then(({data}: any) => {
      const status: any = data?.status;
      if (status) {
         // $&
      } else {
         // $&
      }
    })
    .catch((err: any) => {
       // $&
    })
    .finally(() => {});
};

const handleVerifyOtp = async (
  params: any,
  setLoading: any,
  isEmailVerification: any,
  isSignedOut: any,
  toggleModal: any,
) => {
  verifyOtp(params)
    .then(({data}: any) => {
      const status: any = data?.status;
      if (status) {
         // $&
        setLoading && setLoading(false);
        setTimeout(() => {
          isEmailVerification &&
            toggleModal &&
            toggleModal('emailVerification', true);
          isSignedOut && toggleModal && toggleModal('signedOut', true);
        }, 3000);
      } else {
         // $&
      }
    })
    .catch((err: any) => {
       // $&
    })
    .finally(() => {
      setLoading && setLoading(false);
    });
};

const onPressBtn = (
  params: any,
  setLoading: any = () => {},
  isEmailVerification: boolean = false,
  isSignedOut: boolean = false,
  toggleModal: any = () => {},
) => {
  setLoading && setLoading(true);
  (isEmailVerification || isSignedOut) &&
    toggleModal &&
    handleVerifyOtp(
      params,
      setLoading,
      isEmailVerification,
      isSignedOut,
      toggleModal,
    );
};

export {handleSendOtpEmail, onPressBtn};
