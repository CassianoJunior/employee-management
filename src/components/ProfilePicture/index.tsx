import { User } from 'lucide-react-native';
import { View } from 'react-native';
import theme from '../../theme';
import { WithoutImage } from './styles';

interface ProfilePictureProps {
  source?: string;
}

const ProfilePicture = ({ source }: ProfilePictureProps) => {
  return source ? (
    <View></View>
  ) : (
    <WithoutImage size={50}>
      <User color={theme.colors.gray[300]} strokeWidth={1} size={40} />
    </WithoutImage>
  );
};

export { ProfilePicture };
