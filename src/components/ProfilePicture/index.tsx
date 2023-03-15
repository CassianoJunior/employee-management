import { User } from 'lucide-react-native';
import theme from '../../theme';
import { Image, WithoutImage } from './styles';

interface ProfilePictureProps {
  source?: string;
  size?: number;
  color?: string;
}

const ProfilePicture = ({ source, size, color }: ProfilePictureProps) => {
  return source ? (
    <Image source={source} size={size} color={color} />
  ) : (
    <WithoutImage size={50} color={color}>
      <User color={theme.colors.gray[300]} strokeWidth={1} size={40} />
    </WithoutImage>
  );
};

export { ProfilePicture };
