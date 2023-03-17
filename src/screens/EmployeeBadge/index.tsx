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

  const handleUpdateEmployee = () => {
    if (employee) {
      updateEmployee(employee);
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
    setEmployee(getEmployee(id));
  }, []);

  useEffect(() => {
    if (employee) {
      navigation.setOptions({
        title: `Crachá de ${employee?.name}`,
      });
    }
    if (employee && !isEditing) {
      setEmployee(getEmployee(id));
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

  return employee ? (
    <DefaultScreen style={{ width: '100%' }}>
      <ScrollView style={{ height: '90%' }}>
        <Badge>
          {isEditing && (
            <LeftButtonIcon onPress={handleUpdateEmployee}>
              <CheckCircle2 color={theme.colors.purple[800]} size={24} />
            </LeftButtonIcon>
          )}
          <RightButtonIcon
            onPress={() => {
              setIsEditing((prevState) => !prevState);
            }}
          >
            {isEditing ? (
              <XCircle color={theme.colors.purple[800]} size={24} />
            ) : (
              <Edit color={theme.colors.purple[800]} size={24} />
            )}
          </RightButtonIcon>
          <BadgeHole />
          <BadgeCircle />
          <ProfilePicture
            source={employee?.profilePicture}
            size={136}
            color={theme.colors.gray[100]}
          />

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
                      suffixUnit: '',
                    }}
                    value={String(employee?.salary)}
                    onChangeText={(text) => {
                      setEmployee((prevState) =>
                        prevState
                          ? { ...prevState, salary: Number(text) }
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
