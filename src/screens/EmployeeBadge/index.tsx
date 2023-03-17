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

  const [profilePicture, setProfilePicture] = useState<
    string | null | undefined
  >(undefined);

  const handleUpdateEmployee = () => {
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
    if (employee && !isEditing) {
      const findedEmployee = getEmployee(id);
      setEmployee(findedEmployee);
      setProfilePicture(findedEmployee?.profilePicture);
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
    return Number(salary.replace('R$', '').replace(',', '.'));
  };

  return employee ? (
    <DefaultScreen style={{ width: '100%' }}>
      <ScrollView style={{ height: '90%' }}>
        <Badge>
          {isEditing && (
            <LeftButtonIcon
              onPress={() => {
                setIsEditing(false);
                handleUpdateEmployee();
              }}
            >
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
              imageBase64={profilePicture}
              setImageBase64={setProfilePicture}
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
                    value={String(employee?.salary)}
                    onChangeText={(text) => {
                      setEmployee((prevState) =>
                        prevState
                          ? { ...prevState, salary: Number(formatSalary(text)) }
                          : undefined
                      );
                    }}
                  />
                ) : (
                  <InfoText>{`R$ ${employee?.salary}`}</InfoText>
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
