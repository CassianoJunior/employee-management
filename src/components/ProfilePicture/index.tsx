import { User } from 'lucide-react-native';
import { useThemeContext } from '../../contexts/ThemeContext';
import appTheme from '../../theme';
import { Image, ImageSection, WithoutImage } from './styles';

interface ProfilePictureProps {
  source?: string | null;
  size?: number;
  color: string;
}

const ProfilePicture = ({ source, size, color }: ProfilePictureProps) => {
  const { theme } = useThemeContext();

  return source ? (
    <ImageSection size={size} borderColor={color}>
      <Image source={{ uri: source }} size={size} alt="Profile picture" />
    </ImageSection>
  ) : (
    <WithoutImage size={size} color={color} themeType={theme}>
      <User
        color={
          color
            ? color
            : theme === 'dark'
            ? appTheme.colors.zinc[800]
            : appTheme.colors.gray[100]
        }
        strokeWidth={1}
        size={size && size - 24}
      />
    </WithoutImage>
  );
};

export { ProfilePicture };
