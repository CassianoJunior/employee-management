import { useNavigation, useRoute } from '@react-navigation/native';
import {
  CheckCircle2,
  Edit,
  Mail,
  Phone,
  Wallet,
  XCircle,
} from 'lucide-react-native';
import { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import theme from '../../theme';
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
  InfoItem,
  InfoText,
  LeftButtonIcon,
  RightButtonIcon,
} from './styles';

import { showMessage } from 'react-native-flash-message';
import { DefaultScreen } from '../../components/DefaultScreen';
import { Loading } from '../../components/Loading';
import { PicturePicker } from '../../components/PicturePicker';
import { ProfilePicture } from '../../components/ProfilePicture';
import {
  EmployeeProps,
  useEmployeeContext,
} from '../../contexts/EmployeeContext';

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

  const assert = () => {
    if (!employee) return false;
    if (!employee.name) {
      showMessage({
        message: 'O nome do funcionário não pode ser vazio!',
        type: 'danger',
        backgroundColor: theme.colors.red[400],
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
        backgroundColor: theme.colors.red[400],
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
        backgroundColor: theme.colors.red[400],
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
        backgroundColor: theme.colors.red[400],
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
        backgroundColor: theme.colors.red[400],
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
      });
      setIsEditing(false);
      showMessage({
        message: 'Funcionário atualizado com sucesso!',
        type: 'success',
        backgroundColor: theme.colors.teal[400],
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

  const formatSalary = (salary: string) => {
    return parseFloat(salary.replace(/\D/g, '')) / 100;
  };

  return employee ? (
    <DefaultScreen style={{ width: '100%' }}>
      <ScrollView style={{ height: '100%', paddingTop: 32 }}>
        <Badge>
          {isEditing && (
            <LeftButtonIcon onPress={handleUpdateEmployee}>
              <CheckCircle2 color={theme.colors.purple[800]} size={24} />
            </LeftButtonIcon>
          )}
          {isEditing ? (
            <RightButtonIcon
              onPress={() => {
                setIsEditing(false);
                setEmployee(employeeBackup);
              }}
            >
              <XCircle color={theme.colors.purple[800]} size={24} />
            </RightButtonIcon>
          ) : (
            <RightButtonIcon onPress={() => setIsEditing(true)}>
              <Edit color={theme.colors.purple[800]} size={24} />
            </RightButtonIcon>
          )}
          <BadgeHole />
          <BadgeCircle />
          {isEditing ? (
            <PicturePicker
              imageUri={profilePicture}
              setImageUri={setProfilePicture}
            />
          ) : (
            <ProfilePicture
              source={profilePicture}
              size={136}
              color={theme.colors.gray[100]}
            />
          )}
          <BadgeContent>
            <BadgeHeader>
              {isEditing ? (
                <BadgeNameInput
                  value={employee?.name}
                  onChangeText={(text) => {
                    setEmployee((prevState) =>
                      prevState ? { ...prevState, name: text } : undefined
                    );
                  }}
                />
              ) : (
                <BadgeName>{employee?.name}</BadgeName>
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
                  color={theme.colors.gray[500]}
                  size={24}
                  strokeWidth={2}
                />
                {isEditing ? (
                  <InfoInput
                    value={employee?.email}
                    onChangeText={(text) => {
                      setEmployee((prevState) =>
                        prevState ? { ...prevState, email: text } : undefined
                      );
                    }}
                  />
                ) : (
                  <InfoText>{employee?.email}</InfoText>
                )}
              </InfoItem>
              <InfoItem>
                <Phone
                  color={theme.colors.gray[500]}
                  size={24}
                  strokeWidth={2}
                />
                {isEditing ? (
                  <InfoInputMask
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
                  <InfoText>
                    {formatPhoneNumber(employee?.phoneNumber)}
                  </InfoText>
                )}
              </InfoItem>
              <InfoItem>
                <Wallet
                  color={theme.colors.gray[500]}
                  size={24}
                  strokeWidth={2}
                />
                {isEditing ? (
                  <InfoInputMask
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
                  <InfoText>{`R$ ${employee?.salary.toFixed(2)}`}</InfoText>
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
