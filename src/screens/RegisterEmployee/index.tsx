import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { DefaultScreen } from '../../components/DefaultScreen';
import appTheme from '../../theme';
import {
  ButtonText,
  Container,
  ErrorMessage,
  Form,
  Input,
  InputMask,
  InputSection,
  MaskInputDate,
  SubmitButton,
} from './styles';

import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';

import { ScrollView } from 'react-native';
import { PicturePicker } from '../../components/PicturePicker';
import {
  EmployeeProps,
  useEmployeeContext,
} from '../../contexts/EmployeeContext';
import { useThemeContext } from '../../contexts/ThemeContext';

import moment from 'moment';
import { Masks } from 'react-native-mask-input';

export type FormData = {
  name: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
  salary: string;
  cpf: string;
  hiringDate: string;
};

const RegisterEmployee = () => {
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const { addEmployee } = useEmployeeContext();

  const navigation = useNavigation();

  const assertField = (field: keyof FormData) => {
    if (!errors[field]) {
      return;
    }

    switch (field) {
      case 'name':
        if (errors[field]?.type === 'required') {
          setError(
            field,
            {
              type: 'required',
              message: 'Nome é obrigatório',
            },
            { shouldFocus: true }
          );
        } else if (errors[field]?.type === 'validate') {
          setError(field, {
            type: 'validate',
            message: 'Nome deve ter pelo menos 3 caracteres',
          });
        }
        break;
      case 'email':
        if (errors[field]?.type === 'required') {
          setError(field, {
            type: 'required',
            message: 'Email é obrigatório',
          });
        } else if (errors[field]?.type === 'validate') {
          setError(field, {
            type: 'validate',
            message: 'Email inválido',
          });
        }
        break;
      case 'phoneNumber':
        if (errors[field]?.type === 'required') {
          setError(field, {
            type: 'required',
            message: 'Telefone é obrigatório',
          });
        }
        break;
      case 'jobTitle':
        if (errors[field]?.type === 'required') {
          setError(field, {
            type: 'required',
            message: 'Cargo é obrigatório',
          });
        }
        break;
      case 'salary':
        if (errors[field]?.type === 'required') {
          setError(field, {
            type: 'required',
            message: 'Salário é obrigatório',
          });
        }
        break;
      case 'cpf':
        if (errors[field]?.type === 'required') {
          setError(field, {
            type: 'required',
            message: 'CPF é obrigatório',
          });
        } else if (errors[field]?.type === 'validate') {
          setError(field, {
            type: 'validate',
            message: 'CPF inválido',
          });
        }
        break;
      case 'hiringDate':
        if (errors[field]?.type === 'required') {
          setError(field, {
            type: 'required',
            message: 'Data de contratação é obrigatório',
          });
        } else if (errors[field]?.type === 'validate') {
          setError(field, {
            type: 'validate',
            message: 'Data de contratação inválida',
          });
        }
        break;
    }
  };

  const formatPhoneNumber = (number: string) => {
    return number.replace(/\D/g, '');
  };

  const formatSalary = (salary: string) => {
    return parseFloat(salary.replace(/\D/g, '')) / 100;
  };

  const handleRegisterEmployee = ({
    name,
    email,
    jobTitle,
    phoneNumber,
    salary,
    cpf,
    hiringDate,
  }: FormData) => {
    const employee: EmployeeProps = {
      name,
      email,
      jobTitle,
      cpf: cpf.replace(/\D/g, ''),
      hiringDate: new Date(moment(hiringDate, 'DD/MM/YYYY').format()),
      phoneNumber: formatPhoneNumber(phoneNumber),
      salary: formatSalary(salary),
      profilePicture: imageUri || '',
      id: '',
    };

    addEmployee(employee);
    navigation.goBack();
    showMessage({
      message: 'Funcionário cadastrado com sucesso!',
      type: 'success',
      backgroundColor: appTheme.colors.teal[400],
      floating: true,
      titleStyle: {
        textAlign: 'center',
      },
    });
  };

  const { theme } = useThemeContext();

  return (
    <DefaultScreen>
      <Container>
        <PicturePicker imageUri={imageUri} setImageUri={setImageUri} />
        <ScrollView style={{ width: '100%' }}>
          <Form>
            <InputSection>
              <Controller
                control={control}
                rules={{
                  required: true,
                  validate: (value) => {
                    try {
                      z.string().min(3).parse(value);
                      return true;
                    } catch (error) {
                      return false;
                    }
                  },
                }}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input
                    themeType={theme}
                    placeholder="Nome"
                    onChangeText={onChange}
                    value={value}
                    error={!!errors.name}
                    onPressOut={() => assertField('name')}
                  />
                )}
              />
              {<ErrorMessage>{errors.name?.message}</ErrorMessage>}
            </InputSection>
            <InputSection>
              <Controller
                control={control}
                rules={{
                  required: true,
                  validate: (value) => {
                    try {
                      z.string().min(9).parse(value);
                      return true;
                    } catch (error) {
                      return false;
                    }
                  },
                }}
                name="cpf"
                render={({ field: { onChange, value } }) => (
                  <InputMask
                    themeType={theme}
                    placeholder="Cpf"
                    type="cpf"
                    onChangeText={onChange}
                    value={value}
                    error={!!errors.cpf}
                    onPressOut={() => assertField('cpf')}
                  />
                )}
              />
              {<ErrorMessage>{errors.cpf?.message}</ErrorMessage>}
            </InputSection>
            <InputSection>
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
                    themeType={theme}
                    placeholder="Email"
                    onChangeText={onChange}
                    value={value}
                    error={!!errors.email}
                    onPressIn={() => assertField('email')}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                )}
              />
              {<ErrorMessage>{errors.email?.message}</ErrorMessage>}
            </InputSection>
            <InputSection>
              <Controller
                control={control}
                rules={{
                  required: true,
                  validate: (value) => {
                    try {
                      z.string().min(11).parse(value);
                      return true;
                    } catch (error) {
                      return false;
                    }
                  },
                }}
                name="phoneNumber"
                render={({ field: { onChange, value } }) => (
                  <InputMask
                    themeType={theme}
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
                    error={!!errors.phoneNumber}
                    onPressIn={() => assertField('phoneNumber')}
                  />
                )}
              />
              {<ErrorMessage>{errors.phoneNumber?.message}</ErrorMessage>}
            </InputSection>
            <InputSection>
              <Controller
                control={control}
                rules={{ required: true }}
                name="jobTitle"
                render={({ field: { onChange, value } }) => (
                  <Input
                    themeType={theme}
                    placeholder="Cargo"
                    onChangeText={onChange}
                    value={value}
                    error={!!errors.jobTitle}
                    onPressIn={() => assertField('jobTitle')}
                  />
                )}
              />
              {<ErrorMessage>{errors.jobTitle?.message}</ErrorMessage>}
            </InputSection>
            <InputSection>
              <Controller
                control={control}
                rules={{ required: true }}
                name="salary"
                render={({ field: { onChange, value } }) => (
                  <InputMask
                    themeType={theme}
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
                    error={!!errors.salary}
                    onPressIn={() => assertField('salary')}
                  />
                )}
              />
              {<ErrorMessage>{errors.salary?.message}</ErrorMessage>}
            </InputSection>
            <InputSection>
              <Controller
                control={control}
                rules={{
                  required: true,
                  validate: (value) => {
                    try {
                      z.string().min(10).parse(value);
                      const date = new Date(
                        moment(value, 'DD/MM/YYYY').format()
                      );
                      z.date().min(new Date(1990, 1, 1)).parse(date);
                      return true;
                    } catch (error) {
                      return false;
                    }
                  },
                }}
                name="hiringDate"
                render={({ field: { onChange, value } }) => (
                  <MaskInputDate
                    themeType={theme}
                    placeholder="Data de contratação"
                    onChangeText={onChange}
                    value={value}
                    mask={Masks.DATE_DDMMYYYY}
                    keyboardType="numeric"
                    error={!!errors.hiringDate}
                    onPressIn={() => assertField('hiringDate')}
                  />
                )}
              />
              {<ErrorMessage>{errors.hiringDate?.message}</ErrorMessage>}
            </InputSection>

            <SubmitButton
              themeType={theme}
              onPress={() => {
                assertField('name');
                assertField('email');
                assertField('phoneNumber');
                assertField('jobTitle');
                assertField('salary');
                assertField('cpf');
                assertField('hiringDate');
                handleSubmit(handleRegisterEmployee)();
              }}
            >
              <ButtonText>Cadastrar</ButtonText>
            </SubmitButton>
          </Form>
        </ScrollView>
      </Container>
    </DefaultScreen>
  );
};

export { RegisterEmployee };
