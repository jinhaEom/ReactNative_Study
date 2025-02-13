import React, { useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import moment from 'moment';
import Colors from '../components/Colors';
import UserPhoto from '../components/UserPhoto';
interface MessageProps {
  name: string;
  text: string;
  createdAt: Date;
  isOtherMessage: boolean;
  imageUrl?: string;
  unreadCount?: number;
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: 'flex-end',
    flex: 1,
  },
  nameText: {
    fontSize: 12,
    color: Colors.GRAY,
    marginBottom: 4,
  },
  messageContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  timeText: {
    fontSize: 12,
    color: Colors.GRAY,
  },
  bubble: {
    backgroundColor: Colors.BLACK,
    padding: 12,
    borderRadius: 12,
    flexShrink: 1,
  },
  messageText: {
    fontSize: 14,
    color: Colors.WHITE,
  },
  root: {
    flexDirection: 'row',
  },
  userPhoto: {
    marginRight: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadCountText: {
    fontSize: 12,
    color: Colors.GRAY,
  },
  metaInfo: {
    marginRight: 4,
    alignItems: 'flex-end',
  },
});

const otherMessageStyles = {
  container: [styles.container, { alignItems: 'flex-start' as const }],
  bubble: [styles.bubble, { backgroundColor: Colors.LIGHT_GRAY }],
  messageText: [styles.messageText, { color: Colors.BLACK }],
  timeText: [styles.timeText],
  metaInfo: [styles.metaInfo,{alignItems:'flex-start' as const ,marginRight : 0, marginLeft: 4}],
};
const Message = ({
  name,
  text,
  createdAt,
  isOtherMessage,
  imageUrl,
  unreadCount = 0,
}: MessageProps) => {
  const messageStyles = isOtherMessage ? otherMessageStyles : styles;
  const renderMessageContainer = useCallback(() => {
    const components = [
      <>
        <View key="metaInfo" style={messageStyles.metaInfo}>
          {unreadCount > 0 && (
            <Text style={styles.unreadCountText}>{unreadCount}</Text>
          )}
          <Text key="timeText" style={messageStyles.timeText}>
            {moment(createdAt).format('HH:mm')}
          </Text>
        </View>
        <View key="message" style={messageStyles.bubble}>
          <Text style={messageStyles.messageText}>{text}</Text>
        </View>
      </>,
    ];
    return isOtherMessage ? components.reverse() : components;
  }, [createdAt, text, messageStyles, isOtherMessage, unreadCount]);
  return (
    <View style={styles.root}>
      {isOtherMessage && (
        <UserPhoto
          style={styles.userPhoto}
          imageUrl={imageUrl}
          name={name}
          size={34}
        />
      )}
      <View style={messageStyles.container}>
        <Text style={styles.nameText}>{name}</Text>
        <View style={styles.messageContainer}>{renderMessageContainer()}</View>
      </View>
    </View>
  );
};
export default Message;
