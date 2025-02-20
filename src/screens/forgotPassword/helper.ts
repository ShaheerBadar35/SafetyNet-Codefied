import {resetPassword} from '@services/AuthService';

const handleForgotPassword = async (
  params: any,
  setLoading: any = () => {},
  setShowModal: any = () => {},
) => {
  setLoading && setLoading(true);
  const result: any = await resetPassword(params);
  if (result?.success) {
    setLoading && setLoading(false);
    setShowModal && setShowModal(true);
  }
  setLoading && setLoading(false);
};

const submitHandler = async (
  values: any,
  setLoading: any = () => {},
  setShowModal: any = () => {},
) => {
  await handleForgotPassword(values, setLoading, setShowModal);
};

export {submitHandler};
