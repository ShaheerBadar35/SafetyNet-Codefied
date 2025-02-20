  import {navigationRef} from '@services/NavService';
  import ImagePicker from 'react-native-image-crop-picker';
  import {hasLibraryPermission} from '@services/PermissionService';
  import {setProfile} from '@redux/reducers/userReducer';
  import storage from '@react-native-firebase/storage';
  import {updateUserProfile, uploadProfileImage} from '@services/profileService';
  import Toast from 'react-native-toast-message';
  import {TOAST_TYPES} from '@utils/constants';

  const GALLERY_PICKER_OPTIONS: any = {
    width: 500,
    height: 500,
    cropping: false,
    multiple: false,
    mediaType: 'photo',
    includeBase64: false,
    compressVideoPreset: 'Passthrough',
  };

  const handleProfileImageUpload = (email: any, imgPath: any) => {
    const params: any = {
      email: email,
      image: imgPath,
    };
    uploadProfileImage(params)
      .then(({data}: any) => {
        const status: any = data?.status;
        //  // $&
      })
      .catch((err: any) => {
         // $&
      })
      .finally(() => {});
  };

  const uploadImage = async (uri: any) => {
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const reference = storage().ref(filename);
    await reference.putFile(uri);
    const url = await reference.getDownloadURL();
    return url;
  };

  const handleEditImage = async (setImgPath: any = () => {}) => {
    if (await hasLibraryPermission()) {
      ImagePicker.openPicker(GALLERY_PICKER_OPTIONS)
        .then((res: any) => {
          setImgPath && setImgPath(res?.path);
        })
        .catch(async (err: any) => {
           // $&
        });
    }
  };

  const submitHandler = async (
    values: any,
    setLoading: any = () => {},
    dispatch: any = () => {},
  ) => {
    setLoading && setLoading(true);
    let image_link = values?.image || '';
    if (
      values?.image &&
      !values?.image?.includes('https://firebasestorage.googleapis.com')
    ) {
      const imgPath: any = await uploadImage(values?.image);
      if (imgPath) image_link = imgPath;
    }
    const params: any = {
      ...values,
      image: image_link,
    };
    updateUserProfile(params)
      .then(({data}: any) => {
        const status: any = data?.status;
        if (status) {
          Toast.show({
            type: TOAST_TYPES.LIGHT_SUCCESS,
            props: {
              title: data?.message || 'Profile edited successfully',
            },
          });
          dispatch && dispatch(setProfile(data?.data?.profile));
        } else {
           // $&
        }
      })
      .catch((err: any) => {
         // $&
      })
      .finally(() => {
        setTimeout(() => {
          setLoading && setLoading(false);
          navigationRef?.current?.goBack();
        }, 3000);
      });
  };

  export {handleEditImage, submitHandler};
