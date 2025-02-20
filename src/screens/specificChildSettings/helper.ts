import {setChildAccounts} from '@redux/reducers/userReducer';
import {
  addChildEmergencyKeyword,
  handleChildCall911Toggle,
  handleChildGeofencingEmergencyContacts,
  handleChildGeofencingSettingsSafeZone,
  handleChildGeofencingSettingsTimer,
  handleChildGeofencingToggle,
  handleChildGestureEmergencyAlertsToggle,
  handleDeleteChildAccount,
  handleDeleteGeofencingSafeLocation,
  handleGenerateChildPasswordResetLink,
  handleUpdateFamilyChildName,
  sendChildPasswordResetEmail,
} from '@services/ChildService';
import {
  hasReadContactsPermission,
  hasWriteContactsPermission,
} from '@services/PermissionService';
import {CHILD_ACCOUNT_DOMAIN, TOAST_TYPES} from '@utils/constants';
import Contacts from 'react-native-contacts';
import Toast from 'react-native-toast-message';

const fetchContacts = (setContacts: any = () => {}) => {
  Contacts.getAll()
    .then((contacts: any) => {
      let tempContact: any = [];
      contacts?.map((item: any) => {
        const temp = {
          id: item?.rawContactId,
          name: item?.displayName,
          number: item?.phoneNumbers?.[0]?.number,
        };
        tempContact = [...tempContact, temp];
      });
      setContacts(tempContact);
    })
    .catch((e: any) => {
       // $&
    });
};

const getContacts = async (setContacts: any = () => {}) => {
  const permission = await hasReadContactsPermission();
  if (permission) {
    fetchContacts(setContacts);
  }
};

const addContact = async (
  setContacts: any = () => {},
  setSelectedContactsList: any = () => {},
  contact: any,
) => {
  const permission = await hasWriteContactsPermission();
  if (permission) {
    const temp = {
      familyName: contact?.name,
      phoneNumbers: [
        {
          label: 'mobile',
          number: contact?.number,
        },
      ],
    };
    Contacts.addContact(temp)
      .then((res: any) => {
        const temp = {
          id: res?.rawContactId,
          name: res?.displayName,
          number: res?.phoneNumbers?.[0]?.number,
        };
        setContacts((pre: any) => {
          if (pre?.length < 4) {
            return [...pre, temp];
          }
          return [...pre];
        });
        setSelectedContactsList((pre: any) => {
          if (pre?.length < 4) {
            return [...pre, temp];
          }
          return [...pre];
        });
         // $&
      })
      .catch(error => {
        console.error('Error adding contact:', error);
      });
  }
};

const handleGeofencingToggle = (
  email: any,
  username: any,
  handle_child_geofencing: any,
  dispatch: any = () => {},
) => {
  const params: any = {
    email: email,
    username: username,
    handle_geofencing: handle_child_geofencing,
    child_account_domain: CHILD_ACCOUNT_DOMAIN,
  };
  handleChildGeofencingToggle(params)
    .then(({data}: any) => {
      const status: any = data?.status;
      if (status) {
        Toast.show({
          type: handle_child_geofencing
            ? TOAST_TYPES.LIGHT_SUCCESS
            : TOAST_TYPES.DARK_SUCCESS,
          props: {
            title: handle_child_geofencing
              ? 'Geofencing for child turned on'
              : data?.message
              ? data?.message
              : 'Geofencing for child turned off',
          },
        });
        dispatch && dispatch(setChildAccounts(data?.data?.child_account));
      } else {
         // $&
      }
    })
    .catch((err: any) => {
       // $&
    })
    .finally(() => {});
};

const handleCall911Toggle = (
  email: any,
  username: any,
  call_911: any,
  dispatch: any = () => {},
) => {
  const params: any = {
    email: email,
    username: username,
    call_911: call_911,
  };
  handleChildCall911Toggle(params)
    .then(({data}: any) => {
      const status: any = data?.status;
      if (status) {
        Toast.show({
          type: call_911 ? TOAST_TYPES.LIGHT_SUCCESS : TOAST_TYPES.DARK_SUCCESS,
          props: {
            title: call_911
              ? 'Call 911 for child turned on'
              : data?.message
              ? data?.message
              : 'Call 911 for child turned off',
          },
        });
        dispatch && dispatch(setChildAccounts(data?.data?.child_account));
      } else {
         // $&
      }
    })
    .catch((err: any) => {
       // $&
    })
    .finally(() => {});
};

const handleGestureEmergencyToggle = (
  email: any,
  username: any,
  gesture_emergency_alerts: any,
  dispatch: any = () => {},
) => {
  const params: any = {
    email: email,
    username: username,
    gesture_emergency_alerts: gesture_emergency_alerts,
  };
  handleChildGestureEmergencyAlertsToggle(params)
    .then(({data}: any) => {
      const status: any = data?.status;
      if (status) {
        Toast.show({
          type: gesture_emergency_alerts
            ? TOAST_TYPES.LIGHT_SUCCESS
            : TOAST_TYPES.DARK_SUCCESS,
          props: {
            title: gesture_emergency_alerts
              ? 'Emergency alerts for child turned on'
              : data?.message
              ? data?.message
              : 'Emergency alerts for child turned off',
          },
        });
        dispatch && dispatch(setChildAccounts(data?.data?.child_account));
      } else {
         // $&
      }
    })
    .catch((err: any) => {
       // $&
    })
    .finally(() => {});
};

const handleGeofencingTimer = (
  email: any,
  username: any,
  timer: any,
  dispatch: any = () => {},
) => {
  const params: any = {
    email: email,
    username: username,
    timer: timer,
    child_account_domain: CHILD_ACCOUNT_DOMAIN,
  };
  handleChildGeofencingSettingsTimer(params)
    .then(({data}: any) => {
      const status: any = data?.status;
      if (status) {
        Toast.show({
          type: TOAST_TYPES.LIGHT_SUCCESS,
          props: {
            title: data?.message
              ? data?.message
              : 'Timer for safe zone selected successfully',
          },
        });
        dispatch && dispatch(setChildAccounts(data?.data?.child_account));
      } else {
         // $&
      }
    })
    .catch((err: any) => {
       // $&
    })
    .finally(() => {});
};

const handleGeofencingSafeZone = (
  email: any,
  username: any,
  safe_zone: any,
  dispatch: any = () => {},
) => {
  const params: any = {
    email: email,
    username: username,
    safe_zone: safe_zone,
    child_account_domain: CHILD_ACCOUNT_DOMAIN,
  };
  handleChildGeofencingSettingsSafeZone(params)
    .then(({data}: any) => {
      const status: any = data?.status;
      if (status) {
        Toast.show({
          type: TOAST_TYPES.LIGHT_SUCCESS,
          props: {
            title: data?.message
              ? data?.message
              : 'Safe zone selected successfully',
          },
        });
        dispatch && dispatch(setChildAccounts(data?.data?.child_account));
      } else {
         // $&
      }
    })
    .catch((err: any) => {
       // $&
    })
    .finally(() => {});
};

const handleGeofencingEmergencyContacts = (
  email: any,
  username: any,
  emergency_contacts: any,
  dispatch: any = () => {},
) => {
  const params: any = {
    email: email,
    username: username,
    emergency_contacts: emergency_contacts,
    child_account_domain: CHILD_ACCOUNT_DOMAIN,
  };
  handleChildGeofencingEmergencyContacts(params)
    .then(({data}: any) => {
      const status: any = data?.status;
      if (status) {
        Toast.show({
          type: TOAST_TYPES.LIGHT_SUCCESS,
          props: {
            title: data?.message
              ? data?.message
              : 'Emergency contacts for child added',
          },
        });
        dispatch && dispatch(setChildAccounts(data?.data?.child_account));
      } else {
         // $&
      }
    })
    .catch((err: any) => {
       // $&
    })
    .finally(() => {});
};

const handleDeleteChild = (
  email: any,
  username: any,
  dispatch: any = () => {},
  setLoading: any = () => {},
  setShowModal: any = () => {},
  setShowRemovedModal: any = () => {},
) => {
  setLoading && setLoading(true);
  const params: any = {
    email: email,
    username: username,
    child_account_domain: CHILD_ACCOUNT_DOMAIN,
  };
  handleDeleteChildAccount(params)
    .then(({data}: any) => {
      const status: any = data?.status;
      if (status) {
        dispatch && dispatch(setChildAccounts(data?.data?.child_account));
        setLoading && setLoading(false);
        setShowModal && setShowModal(false);
        setShowRemovedModal && setShowRemovedModal(true);
      } else {
         // $&
      }
    })
    .catch((err: any) => {
       // $&
    })
    .finally(() => {
      setLoading && setLoading(false);
      setShowModal && setShowModal(false);
    });
};

const addEmergencyKeyword = async (params: any, dispatch: any = () => {}) => {
  addChildEmergencyKeyword(params)
    .then(({data}: any) => {
      const status: any = data?.success;
       // $&
      if (status) {
        Toast.show({
          type: TOAST_TYPES.LIGHT_SUCCESS,
          props: {
            title: data?.message
              ? data?.message
              : 'Emergency keyword for child added successfully',
          },
        });
        dispatch(setChildAccounts(data?.data?.child_account));
      } else {
         // $&
      }
    })
    .catch((err: any) => {
       // $&
    })
    .finally(() => {});
};

const handleDeleteSafeLocation = async (
  email: any,
  username: any,
  location: any,
  tag: any,
  dispatch: any = () => {},
  setLocations: any = () => {},
) => {
  const params: any = {
    email: email,
    username: username,
    location: location,
    tag: tag,
    child_account_domain: CHILD_ACCOUNT_DOMAIN,
  };
  handleDeleteGeofencingSafeLocation(params)
    .then(({data}: any) => {
      const status: any = data?.status;
      if (status) {
        Toast.show({
          type: TOAST_TYPES.DARK_SUCCESS,
          props: {
            title: 'Safe location deleted successfully',
          },
        });
        dispatch && dispatch(setChildAccounts(data?.data?.child_account));
        const child_account = data?.data?.child_account || {};
        child_account?.map((child: any) => {
          if (child?.username == username) {
            setLocations &&
              setLocations(
                () => child?.geofencing_settings?.safe_locations || [],
              );
          }
        });
      } else {
         // $&
      }
    })
    .catch((err: any) => {
       // $&
    })
    .finally(() => {});
};

const updateFamilyChildName = async (
  email: any,
  username: any,
  newName: any,
  setChildname: any,
  setLoading: any,
  setModal: any,
  dispatch: any = () => {},
) => {
  setLoading && setLoading(true);
  const params: any = {
    email: email,
    username: username,
    newName: newName,
  };
  setLoading && setLoading(true);
  handleUpdateFamilyChildName(params)
    .then(({data}: any) => {
      const status: any = data?.status;
      if (status) {
        Toast.show({
          type: TOAST_TYPES.LIGHT_SUCCESS,
          props: {
            title: data?.message
              ? data?.message
              : 'Child name edited successfully',
          },
        });
        setChildname && setChildname(newName);
        dispatch && dispatch(setChildAccounts(data?.data?.child_accounts));
      } else {
         // $&
      }
    })
    .catch((err: any) => {
       // $&
    })
    .finally(() => {
      setLoading && setLoading(false);
      setModal && setModal(false);
    });
};

const handleChildChangePassword = async (email: any, usernmae: any) => {
  const params: any = {
    email: usernmae + CHILD_ACCOUNT_DOMAIN,
  };
  const response: any = await handleGenerateChildPasswordResetLink(params);
  if (response?.data?.status) {
    const params2: any = {
      email: email,
      link: response?.data?.data?.link,
    };
    const resp: any = await sendChildPasswordResetEmail(params2);
    if (resp?.data?.status) {
      Toast.show({
        type: TOAST_TYPES.LIGHT_SUCCESS,
        props: {
          title:
            resp?.data?.message ||
            'Change password link for child account sent to email',
        },
      });
    }
  }
};

const isContactsSame = (
  currentContacts: any = [],
  selectedContacts: any = [],
) => {
  const allNumbers = selectedContacts?.every((selectedContact: any) =>
    currentContacts?.some(
      (currentContact: any) =>
        Number(selectedContact?.id) === Number(currentContact?.id),
    ),
  );
   // $&
  return allNumbers;
};

export {
  addContact,
  addEmergencyKeyword,
  fetchContacts,
  getContacts,
  handleCall911Toggle,
  handleDeleteChild,
  handleDeleteSafeLocation,
  handleGeofencingEmergencyContacts,
  handleGeofencingSafeZone,
  handleGeofencingTimer,
  handleGeofencingToggle,
  handleGestureEmergencyToggle,
  updateFamilyChildName,
  handleChildChangePassword,
  isContactsSame,
};
