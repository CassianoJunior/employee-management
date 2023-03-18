import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { ImageMinus, SwitchCamera } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useThemeContext } from '../../contexts/ThemeContext';
import appTheme from '../../theme';
import { OpenCamera } from '../OpenCamera';
import { ProfilePicture } from '../ProfilePicture';
import { LeftButton, PictureSection, RightButton } from './styles';

interface PiturePickerProps {
  imageUri: string | null | undefined;
  setImageUri: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const PicturePicker = ({ imageUri, setImageUri }: PiturePickerProps) => {
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
      });

      if (!result.canceled) {
        if (result.assets) {
          setImageUri(result.assets[0].uri);
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

  const handleRemovePicture = () => {
    setImageUri(undefined);
  };

  const { theme } = useThemeContext();

  return usingCamera ? (
    <OpenCamera
      setImageUri={setImageUri}
      setUsingCamera={setUsingCamera}
      usingCamera={usingCamera}
    />
  ) : (
    <PictureSection bgColor={!!imageUri} themeType={theme}>
      <ProfilePicture
        source={imageUri}
        size={128}
        color={appTheme.colors.purple[700]}
      />
      <RightButton onPress={handleChangePicture}>
        <SwitchCamera
          color={
            theme === 'dark'
              ? appTheme.colors.gray[100]
              : appTheme.colors.zinc[800]
          }
          size={24}
          strokeWidth={2}
        />
      </RightButton>
      <LeftButton onPress={handleRemovePicture}>
        <ImageMinus
          color={
            theme === 'dark'
              ? appTheme.colors.gray[100]
              : appTheme.colors.zinc[800]
          }
          size={24}
          strokeWidth={2}
        />
      </LeftButton>
    </PictureSection>
  );
};

export { PicturePicker };
