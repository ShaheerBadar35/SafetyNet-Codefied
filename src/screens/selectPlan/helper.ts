import {purchasePlan} from '@services/AuthService';
import {navigate} from '@services/NavService';
import {ROUTES} from '@utils/routes';

const handlePurchasePlan = async (
  params: any,
  setLoading: any = () => {},
  setShowSuccessModal: any = () => {},
) => {
  setLoading && setLoading(true);
  purchasePlan(params)
    .then(({data}: any) => {
      const status: any = data?.status;
      if (status) {
        setLoading && setLoading(false);
        setShowSuccessModal && setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal && setShowSuccessModal(false);
          navigate(ROUTES.LOGIN);
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

const handleSubmit = (
  data: any,
  setLoading: any = () => {},
  setShowSuccessModal: any = () => {},
) => {
  handlePurchasePlan(data, setLoading, setShowSuccessModal);
};

export {handleSubmit};
