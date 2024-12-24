import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from '../Button';
import {IconName} from '../Icons';

export const HeaderIcon: React.FC<{
  onPress: () => void;
  iconName: IconName;
}> = props => {
  return (
    <Button onPress={props.onPress}>
      <Icon name={props.iconName} size={28} color="black" />
    </Button>
  );
};
