import {signup} from '@services/AuthService';
import {navigate} from '@services/NavService';
import {ROUTES} from '@utils/routes';

const handleSignup = async (
  data: any,
  setLoading: any = () => {},
  setShowSuccessModal: any = () => {},
) => {
  const result = await signup(data);
  if (result.success) {
    setLoading && setLoading(false);
    setShowSuccessModal && setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal && setShowSuccessModal(false);
      navigate(ROUTES.VERIFICATION, {
        email: data?.email,
        isEmailVerification: true,
      });
    }, 3000);
  }
  setLoading && setLoading(false);
};

const submitHandler = async (
  values: any,
  setLoading: any = () => {},
  setShowSuccessModal: any = () => {},
) => {
  setLoading && setLoading(true);
  setTimeout(async () => {
    setLoading && setLoading(false);
    const data: any = {
      email: values?.email,
      password: values?.password,
      referral_code: values?.referral_code,
    };
    await handleSignup(data, setLoading, setShowSuccessModal);
  }, 3000);
};

export {submitHandler};
