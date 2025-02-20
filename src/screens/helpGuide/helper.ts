import storage from '@react-native-firebase/storage';

const getFileUrl = async () => {
  try {
    // Define the storage path for the file
    const filePath = `gs://safety-net-af7bd.appspot.com/Safety Net Walk Through Guide.mp4`; // Adjust based on your storage structure
    const fileRef = storage().refFromURL(filePath);

    // Get the download URL
    const downloadUrl = await fileRef.getDownloadURL();

     // $&
    return downloadUrl;
  } catch (error) {
    console.error('Error getting file URL:', error);
    return null;
  }
};

export {getFileUrl};
