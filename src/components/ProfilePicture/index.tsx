import { User } from 'lucide-react-native';
import theme from '../../theme';
import { Image, ImageSection, WithoutImage } from './styles';

interface ProfilePictureProps {
  source?: string;
  size?: number;
  color: string;
}

const ProfilePicture = ({ source, size, color }: ProfilePictureProps) => {
  return source ? (
    <ImageSection size={size}>
      <Image
        source={{ uri: source }}
        size={size}
        color={color}
        alt="Profile picture"
      />
    </ImageSection>
  ) : (
    <WithoutImage size={size} color={color}>
      <User
        color={theme.colors.gray[300]}
        strokeWidth={1}
        size={size && size - 24}
      />
    </WithoutImage>
  );
};

export { ProfilePicture };
