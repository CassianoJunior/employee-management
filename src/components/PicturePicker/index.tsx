import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { SwitchCamera, User } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import theme from '../../theme';
import { OpenCamera } from '../OpenCamera';
import { ProfilePicture } from '../ProfilePicture';
import { ChangePictureButton, PictureSection } from './styles';

const PicturePicker = () => {
  const [imageBase64, setImageBase64] = useState<string | null | undefined>(
    undefined
  );
  const [usingCamera, setUsingCamera] = useState(false);

  const getPermissions = async () => {
    const { status: cameraStatus } =
      await Camera.requestCameraPermissionsAsync();
    const { status: mediaLibraryStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
      const { status: newCameraStatus } =
        await ImagePicker.requestCameraPermissionsAsync();

      const { status: newMediaLibraryStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (
        newCameraStatus !== 'granted' ||
        newMediaLibraryStatus !== 'granted'
      ) {
        alert('Precisamos de acesso a sua câmera e arquivos para continuar!');
      }
    }
  };

  const handleLaunchCamera = useCallback(() => {
    setUsingCamera(true);
  }, [setUsingCamera]);

  const handleLaunchImageLibrary = async (
    status: ImagePicker.PermissionStatus
  ) => {
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: false,
        base64: true,
      });

      if (!result.canceled) {
        if (result.assets) {
          setImageBase64(`data:image/jpg;base64,${result.assets[0].base64}`);
        }
      }
    }
  };

  const handleChangePicture = async () => {
    const { status: cameraStatus } = await Camera.getCameraPermissionsAsync();
    const { status: mediaLibraryStatus } =
      await ImagePicker.getMediaLibraryPermissionsAsync();

    if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
      alert('Precisamos de acesso a sua câmera e galeria para continuar!');
      await getPermissions();
      return;
    }

    Alert.alert(
      'Escolha uma opção',
      'Selecione de onde você quer escolher a foto',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Câmera',
          onPress: () => handleLaunchCamera(),
        },
        {
          text: 'Galeria',
          onPress: () => handleLaunchImageLibrary(mediaLibraryStatus),
        },
      ]
    );
  };

  return usingCamera ? (
    <OpenCamera
      setImageBase64={setImageBase64}
      setUsingCamera={setUsingCamera}
      usingCamera={usingCamera}
    />
  ) : (
    <PictureSection bgColor={!!imageBase64}>
      {imageBase64 ? (
        <ProfilePicture
          source={imageBase64}
          size={128}
          color={theme.colors.purple[700]}
        />
      ) : (
        <User color={theme.colors.zinc[800]} size={112} strokeWidth={1} />
      )}
      <ChangePictureButton onPress={handleChangePicture}>
        <SwitchCamera
          color={theme.colors.gray[100]}
          size={24}
          strokeWidth={2}
        />
      </ChangePictureButton>
    </PictureSection>
  );
};

export { PicturePicker };
