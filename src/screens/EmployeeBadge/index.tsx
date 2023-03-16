import { useNavigation, useRoute } from '@react-navigation/native';
import { Edit, Mail, Phone, Wallet } from 'lucide-react-native';
import { useLayoutEffect } from 'react';
import theme from '../../theme';
import {
  Badge,
  BadgeCircle,
  BadgeContent,
  BadgeHeader,
  BadgeHole,
  BadgeJobTitle,
  BadgeName,
  EditIcon,
  Info,
  InfoItem,
  InfoText,
} from './styles';

import { DefaultScreen } from '../../components/DefaultScreen';
import { ProfilePicture } from '../../components/ProfilePicture';
import { useEmployeeContext } from '../../contexts/EmployeeContext';

interface EmployeeBadgeProps {
  id: string;
}

const EmployeeBadge = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as EmployeeBadgeProps;

  const { getEmployee } = useEmployeeContext();

  const employee = getEmployee(id);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Crachá de ${employee?.name}`,
    });
  }, []);

  const formatPhoneNumber = (phoneNumber?: string) => {
    const phone = phoneNumber?.replace(/\D/g, '');
    const match = phone?.match(/^(\d{2})(\d{1})(\d{4})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]} ${match[3]}-${match[4]}`;
    }

    return phoneNumber;
  };

  return (
    <DefaultScreen style={{ justifyContent: 'center' }}>
      <Badge>
        <EditIcon>
          <Edit color={theme.colors.purple[800]} size={24} />
        </EditIcon>
        <BadgeHole />
        <BadgeCircle />
        <ProfilePicture
          source={employee?.profilePicture}
          size={136}
          color={theme.colors.gray[100]}
        />

        <BadgeContent>
          <BadgeHeader>
            <BadgeName>{employee?.name}</BadgeName>
            <BadgeJobTitle>{employee?.jobTitle}</BadgeJobTitle>
          </BadgeHeader>
          <Info>
            <InfoItem>
              <Mail color={theme.colors.gray[500]} size={24} strokeWidth={2} />
              <InfoText>{employee?.email}</InfoText>
            </InfoItem>
            <InfoItem>
              <Phone color={theme.colors.gray[500]} size={24} strokeWidth={2} />
              <InfoText>{formatPhoneNumber(employee?.phoneNumber)}</InfoText>
            </InfoItem>
            <InfoItem>
              <Wallet
                color={theme.colors.gray[500]}
                size={24}
                strokeWidth={2}
              />
              <InfoText>{`R$ ${employee?.salary.toFixed(2)}`}</InfoText>
            </InfoItem>
          </Info>
        </BadgeContent>
      </Badge>
    </DefaultScreen>
  );
};

export { EmployeeBadge };
