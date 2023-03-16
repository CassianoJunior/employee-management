import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { SwitchCamera, User } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import z from 'zod';
import { DefaultScreen } from '../../components/DefaultScreen';
import { ProfilePicture } from '../../components/ProfilePicture';
import theme from '../../theme';
import {
  ButtonText,
  CameraComponent,
  CameraSection,
  ChangePictureButton,
  Container,
  ErrorMessage,
  Form,
  Input,
  InputMask,
  PictureSection,
  SubmitButton,
} from './styles';

import { ScrollView } from 'react-native';

type FormData = {
  name: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
  salary: string;
};

const Register = () => {
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const [imageBase64, setImageBase64] = useState<string | undefined | null>(
    undefined
  );
  const [usingCamera, setUsingCamera] = useState<boolean>(false);

  const cameraRef = useRef<Camera>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

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

  const handleLaunchCamera = async () => {
    setUsingCamera(true);
  };

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
      });

      if (photo) {
        setImageUri(photo.uri);
        setImageBase64(`data:image/jpg;base64,${photo.base64}`);
      }
    }

    setUsingCamera(false);
  };

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
          setImageUri(result.assets[0].uri);
          setImageBase64(`data:image/jpg;base64,${result.assets[0].base64}`);
        }
      }
    }
  };

  const getPermissions = async () => {
    const { status: cameraStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
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

  const handleRegisterEmployee = (data: FormData) => {
    console.log(data);
  };

  return (
    <DefaultScreen>
      <Container>
        {usingCamera ? (
          <CameraSection>
            <CameraComponent ref={cameraRef} type={CameraType.front} />
          </CameraSection>
        ) : (
          <PictureSection bgColor={!!imageUri}>
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
        )}
        <ScrollView>
          <Form>
            <Controller
              control={control}
              rules={{ required: true }}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            <Controller
              control={control}
              rules={{
                required: true,
                validate: (value) => {
                  try {
                    z.string().email().parse(value);
                    return true;
                  } catch (error) {
                    return false;
                  }
                },
              }}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Email"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
            <Controller
              control={control}
              rules={{ required: true }}
              name="phoneNumber"
              render={({ field: { onChange, value } }) => (
                <InputMask
                  placeholder="Telefone"
                  type="cel-phone"
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) ',
                  }}
                  keyboardType="numeric"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.phoneNumber && (
              <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>
            )}
            <Controller
              control={control}
              rules={{ required: true }}
              name="jobTitle"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Cargo"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.jobTitle && (
              <ErrorMessage>{errors.jobTitle.message}</ErrorMessage>
            )}
            <Controller
              control={control}
              rules={{ required: true }}
              name="salary"
              render={({ field: { onChange, value } }) => (
                <InputMask
                  placeholder="Salário"
                  onChangeText={onChange}
                  value={value}
                  type="money"
                  options={{
                    precision: 2,
                    separator: ',',
                    delimiter: '.',
                    unit: 'R$',
                  }}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.salary && (
              <ErrorMessage>{errors.salary.message}</ErrorMessage>
            )}

            {usingCamera ? (
              <SubmitButton onPress={handleTakePicture}>
                <ButtonText>Tirar foto</ButtonText>
              </SubmitButton>
            ) : (
              <SubmitButton onPress={handleSubmit(handleRegisterEmployee)}>
                <ButtonText>Cadastrar</ButtonText>
              </SubmitButton>
            )}
          </Form>
        </ScrollView>
      </Container>
    </DefaultScreen>
  );
};

export { Register };
