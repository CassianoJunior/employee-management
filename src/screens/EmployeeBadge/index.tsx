import { useNavigation, useRoute } from '@react-navigation/native';
import {
  CalendarCheck2,
  CheckCircle2,
  Edit,
  Fingerprint,
  Mail,
  Phone,
  Wallet,
  XCircle,
} from 'lucide-react-native';
import { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import appTheme from '../../theme';
import {
  Badge,
  BadgeCircle,
  BadgeContent,
  BadgeHeader,
  BadgeHole,
  BadgeJobTitle,
  BadgeJobTitleInput,
  BadgeName,
  BadgeNameInput,
  Info,
  InfoInput,
  InfoInputMask,
  InfoInputMaskDate,
  InfoItem,
  InfoText,
  LeftButtonIcon,
  RightButtonIcon,
} from './styles';

import moment from 'moment';
import { showMessage } from 'react-native-flash-message';
import { Masks } from 'react-native-mask-input';
import { DefaultScreen } from '../../components/DefaultScreen';
import { Loading } from '../../components/Loading';
import { PicturePicker } from '../../components/PicturePicker';
import { ProfilePicture } from '../../components/ProfilePicture';
import {
  EmployeeProps,
  useEmployeeContext,
} from '../../contexts/EmployeeContext';
import { useThemeContext } from '../../contexts/ThemeContext';

interface EmployeeBadgeProps {
  id: string;
}

const EmployeeBadge = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as EmployeeBadgeProps;
  const [isEditing, setIsEditing] = useState(false);

  const { getEmployee, updateEmployee } = useEmployeeContext();

  const [employee, setEmployee] = useState<EmployeeProps | undefined>(
    undefined
  );

  const [employeeBackup, setEmployeeBackup] = useState<
    EmployeeProps | undefined
  >(undefined);

  const [profilePicture, setProfilePicture] = useState<string | undefined>(
    undefined
  );

  const [date, setDate] = useState<string | undefined>(undefined);

  const assert = () => {
    if (!employee) return false;
    if (!employee.name) {
      showMessage({
        message: 'O nome do funcionário não pode ser vazio!',
        type: 'danger',
        backgroundColor: appTheme.colors.red[400],
        floating: true,
        titleStyle: {
          textAlign: 'center',
        },
      });
      return false;
    }
    if (!employee.email) {
      showMessage({
        message: 'O email do funcionário não pode ser vazio!',
        type: 'danger',
        backgroundColor: appTheme.colors.red[400],
        floating: true,
        titleStyle: {
          textAlign: 'center',
        },
      });
      return false;
    }
    if (!employee.phoneNumber) {
      showMessage({
        message: 'O telefone do funcionário não pode ser vazio!',
        type: 'danger',
        backgroundColor: appTheme.colors.red[400],
        floating: true,
        titleStyle: {
          textAlign: 'center',
        },
      });
      return false;
    }
    if (!employee.jobTitle) {
      showMessage({
        message: 'O cargo do funcionário não pode ser vazio!',
        type: 'danger',
        backgroundColor: appTheme.colors.red[400],
        floating: true,
        titleStyle: {
          textAlign: 'center',
        },
      });
      return false;
    }
    if (!employee.salary) {
      showMessage({
        message: 'O salário do funcionário não pode ser vazio!',
        type: 'danger',
        backgroundColor: appTheme.colors.red[400],
        floating: true,
        titleStyle: {
          textAlign: 'center',
        },
      });
      return false;
    }

    if (!employee.cpf) {
      showMessage({
        message: 'O CPF do funcionário não pode ser vazio!',
        type: 'danger',
        backgroundColor: appTheme.colors.red[400],
        floating: true,
        titleStyle: {
          textAlign: 'center',
        },
      });
      return false;
    }

    if (!date) {
      showMessage({
        message: 'A data de contratação do funcionário não pode ser vazia!',
        type: 'danger',
        backgroundColor: appTheme.colors.red[400],
        floating: true,
        titleStyle: {
          textAlign: 'center',
        },
      });
      return false;
    }

    return true;
  };

  const handleUpdateEmployee = () => {
    if (!assert()) return;

    if (employee) {
      updateEmployee({
        ...employee,
        profilePicture,
        cpf: employee.cpf?.replace(/\D/g, ''),
        hiringDate: new Date(moment(date, 'DD/MM/YYYY').format()),
      });
      setIsEditing(false);
      showMessage({
        message: 'Funcionário atualizado com sucesso!',
        type: 'success',
        backgroundColor: appTheme.colors.teal[400],
        floating: true,
        titleStyle: {
          textAlign: 'center',
        },
      });

      navigation.goBack();
    }
  };

  useLayoutEffect(() => {
    const findedEmployee = getEmployee(id);
    setEmployee(findedEmployee);
    setProfilePicture(findedEmployee?.profilePicture);
    setEmployeeBackup(findedEmployee);
    setDate(moment(findedEmployee?.hiringDate).format('DD/MM/YYYY'));
  }, []);

  useEffect(() => {
    if (employee) {
      navigation.setOptions({
        title: `Crachá de ${employee?.name}`,
      });
    }
  }, [employee]);

  const formatPhoneNumber = (phoneNumber?: string) => {
    const phone = phoneNumber?.replace(/\D/g, '');
    const match = phone?.match(/^(\d{2})(\d{1})(\d{4})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]} ${match[3]}-${match[4]}`;
    }

    return phoneNumber;
  };

  const formatCpf = (cpf: string) => {
    const match = cpf?.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
    }

    return cpf;
  };

  const formatSalary = (salary: string) => {
    return parseFloat(salary.replace(/\D/g, '')) / 100;
  };

  const { theme } = useThemeContext();

  return employee ? (
    <DefaultScreen style={{ width: '100%' }}>
      <ScrollView
        style={{
          height: '100%',
          paddingTop: 32,
        }}
      >
        <Badge themeType={theme} style={{ marginBottom: isEditing ? 128 : 0 }}>
          {isEditing && (
            <LeftButtonIcon onPress={handleUpdateEmployee}>
              <CheckCircle2 color={appTheme.colors.gray[100]} size={24} />
            </LeftButtonIcon>
          )}
          {isEditing ? (
            <RightButtonIcon
              onPress={() => {
                setIsEditing(false);
                setEmployee(employeeBackup);
              }}
            >
              <XCircle color={appTheme.colors.gray[100]} size={24} />
            </RightButtonIcon>
          ) : (
            <RightButtonIcon onPress={() => setIsEditing(true)}>
              <Edit color={appTheme.colors.gray[100]} size={24} />
            </RightButtonIcon>
          )}
          <BadgeHole themeType={theme} />
          <BadgeCircle themeType={theme} />
          {isEditing ? (
            <PicturePicker
              imageUri={profilePicture}
              setImageUri={setProfilePicture}
            />
          ) : (
            <ProfilePicture
              source={profilePicture}
              size={136}
              color={appTheme.colors.gray[100]}
            />
          )}
          <BadgeContent>
            <BadgeHeader>
              {isEditing ? (
                <BadgeNameInput
                  themeType={theme}
                  value={employee?.name}
                  onChangeText={(text) => {
                    setEmployee((prevState) =>
                      prevState ? { ...prevState, name: text } : undefined
                    );
                  }}
                />
              ) : (
                <BadgeName themeType={theme}>{employee?.name}</BadgeName>
              )}
              {isEditing ? (
                <BadgeJobTitleInput
                  value={employee?.jobTitle}
                  onChangeText={(text) => {
                    setEmployee((prevState) =>
                      prevState ? { ...prevState, jobTitle: text } : undefined
                    );
                  }}
                />
              ) : (
                <BadgeJobTitle>{employee?.jobTitle}</BadgeJobTitle>
              )}
            </BadgeHeader>
            <Info>
              <InfoItem>
                <Mail
                  color={appTheme.colors.gray[500]}
                  size={24}
                  strokeWidth={2}
                />
                {isEditing ? (
                  <InfoInput
                    themeType={theme}
                    value={employee?.email}
                    onChangeText={(text) => {
                      setEmployee((prevState) =>
                        prevState ? { ...prevState, email: text } : undefined
                      );
                    }}
                  />
                ) : (
                  <InfoText themeType={theme}>{employee?.email}</InfoText>
                )}
              </InfoItem>
              <InfoItem>
                <Fingerprint
                  color={appTheme.colors.gray[500]}
                  size={24}
                  strokeWidth={2}
                />
                {isEditing ? (
                  <InfoInputMask
                    type="cpf"
                    themeType={theme}
                    value={employee?.cpf}
                    onChangeText={(text) => {
                      setEmployee((prevState) =>
                        prevState ? { ...prevState, cpf: text } : undefined
                      );
                    }}
                  />
                ) : (
                  <InfoText themeType={theme}>
                    {formatCpf(employee?.cpf)}
                  </InfoText>
                )}
              </InfoItem>
              <InfoItem>
                <Phone
                  color={appTheme.colors.gray[500]}
                  size={24}
                  strokeWidth={2}
                />
                {isEditing ? (
                  <InfoInputMask
                    themeType={theme}
                    type="cel-phone"
                    options={{
                      maskType: 'BRL',
                      withDDD: true,
                      dddMask: '(99) ',
                    }}
                    value={employee?.phoneNumber}
                    onChangeText={(text) => {
                      setEmployee((prevState) =>
                        prevState
                          ? { ...prevState, phoneNumber: text }
                          : undefined
                      );
                    }}
                  />
                ) : (
                  <InfoText themeType={theme}>
                    {formatPhoneNumber(employee?.phoneNumber)}
                  </InfoText>
                )}
              </InfoItem>
              <InfoItem>
                <Wallet
                  color={appTheme.colors.gray[500]}
                  size={24}
                  strokeWidth={2}
                />
                {isEditing ? (
                  <InfoInputMask
                    themeType={theme}
                    type="money"
                    options={{
                      precision: 2,
                      separator: ',',
                      delimiter: '.',
                      unit: 'R$ ',
                    }}
                    value={employee?.salary.toFixed(2).toString()}
                    onChangeText={(text) => {
                      setEmployee((prevState) =>
                        prevState
                          ? { ...prevState, salary: formatSalary(text) }
                          : undefined
                      );
                    }}
                  />
                ) : (
                  <InfoText themeType={theme}>{`R$ ${employee?.salary.toFixed(
                    2
                  )}`}</InfoText>
                )}
              </InfoItem>
              <InfoItem>
                <CalendarCheck2
                  color={appTheme.colors.gray[500]}
                  size={24}
                  strokeWidth={2}
                />
                {isEditing ? (
                  <InfoInputMaskDate
                    themeType={theme}
                    mask={Masks.DATE_DDMMYYYY}
                    value={date}
                    onChangeText={(text) => {
                      setDate(text);
                    }}
                  />
                ) : (
                  <InfoText themeType={theme}>
                    {moment(employee.hiringDate).format('DD/MM/YYYY')}
                  </InfoText>
                )}
              </InfoItem>
            </Info>
          </BadgeContent>
        </Badge>
      </ScrollView>
    </DefaultScreen>
  ) : (
    <Loading />
  );
};

export { EmployeeBadge };
