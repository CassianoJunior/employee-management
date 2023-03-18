import { Camera, CameraType } from 'expo-camera';
import { XCircle } from 'lucide-react-native';
import { useRef } from 'react';
import { Modal, Portal } from 'react-native-paper';
import theme from '../../theme';
import {
  CameraComponent,
  CameraSection,
  CloseCameraButton,
  TakePictureButton,
} from './styles';

interface OpenCameraProps {
  usingCamera: boolean;
  setUsingCamera: React.Dispatch<React.SetStateAction<boolean>>;
  setImageUri: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const OpenCamera = ({
  usingCamera,
  setUsingCamera,
  setImageUri,
}: OpenCameraProps) => {
  const cameraRef = useRef<Camera>(null);

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();

      if (photo) {
        setImageUri(photo.uri);
      }
    }

    setUsingCamera(false);
  };

  return (
    <Portal>
      <Modal visible={usingCamera} onDismiss={() => setUsingCamera(false)}>
        <CameraSection>
          <CloseCameraButton onPress={() => setUsingCamera(false)}>
            <XCircle color={theme.colors.gray[100]} size={32} />
          </CloseCameraButton>
          <CameraComponent ref={cameraRef} type={CameraType.front} />
          <TakePictureButton onPress={handleTakePicture}></TakePictureButton>
        </CameraSection>
      </Modal>
    </Portal>
  );
};

export { OpenCamera };
