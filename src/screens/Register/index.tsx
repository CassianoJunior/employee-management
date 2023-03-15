import * as ImagePicker from 'expo-image-picker';
import { SwitchCamera, User } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { DefaultScreen } from '../../components/DefaultScreen';
import { ProfilePicture } from '../../components/ProfilePicture';
import theme from '../../theme';
import {
  ButtonText,
  ChangePictureButton,
  Container,
  ErrorMessage,
  Form,
  Input,
  InputMask,
  PictureSection,
  SubmitButton,
} from './styles';

type FormData = {
  name: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
  salary: string;
};

const Register = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleChangePicture = async () => {
    const { status } = await ImagePicker.getCameraPermissionsAsync();

    if (status !== 'granted') {
      alert('Precisamos de acesso a sua câmera para continuar!');
      return;
    }

    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
    })
      .then((result) => {
        if (!result.canceled) {
          setImageUri(result.assets[0].uri);
          setImageBase64(result.assets[0].base64 || null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const getPermissions = async () => {
      const { status: cameraStatus } =
        await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaLibraryStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (cameraStatus !== 'granted' && mediaLibraryStatus !== 'granted') {
        const { status: newCameraStatus } =
          await ImagePicker.requestCameraPermissionsAsync();

        const { status: newMediaLibraryStatus } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (
          newCameraStatus !== 'granted' &&
          newMediaLibraryStatus !== 'granted'
        ) {
          alert('Precisamos de acesso a sua câmera e arquivos para continuar!');
        }
      }
    };

    getPermissions();
  }, []);

  const handleRegisterEmployee = (data: FormData) => {
    console.log(data);
  };

  return (
    <DefaultScreen>
      <Container>
        <PictureSection>
          {imageBase64 ? (
            <ProfilePicture source={imageBase64} />
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
        <Form>
          <Controller
            control={control}
            rules={{ required: true }}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input placeholder="Nome" onChangeText={onChange} value={value} />
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
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
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
        </Form>

        <SubmitButton onPress={handleSubmit(handleRegisterEmployee)}>
          <ButtonText>Cadastrar</ButtonText>
        </SubmitButton>
      </Container>
    </DefaultScreen>
  );
};

export { Register };
