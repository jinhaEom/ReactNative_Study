import React, { useMemo, useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { RouteProp } from '@react-navigation/native';
import Screen from '../components/Screen';
import useChat from './useChat';
import { ActivityIndicator } from 'react-native';
import { useCallback } from 'react';
import Colors from '../components/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthContext from '../components/AuthContext';
import Message from './Message';
import UserPhoto from '../components/UserPhoto';
import moment from 'moment';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatContainer: {
    flex: 1,
    padding: 20,
  },
  memberSection: {},
  membersTitleText: {
    fontSize: 16,
    color: Colors.BLACK,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  userProfile: {
    width: 34,
    height: 34,
    borderRadius: 34 / 2,
    borderWidth: 1,
    backgroundColor: Colors.BLACK,
    borderColor: Colors.LIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userProfileText: {
    color: Colors.WHITE,
  },
  messageList: {
    flex: 1,
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputContainer: {
    flex: 1,
    marginRight: 10,
    borderRadius: 24,
    borderColor: Colors.BLACK,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 10,
    minHeight: 50,
    justifyContent: 'center',
  },
  textInput: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50 / 2,
    width: 50,
    height: 50,
    backgroundColor: Colors.BLACK,
  },
  sendText: {
    color: Colors.WHITE,
  },
  sendIcon: {
    color: Colors.WHITE,
    fontSize: 16,
  },
  myMessageContainer: {
    marginTop: 12,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.GRAY,
    marginLeft: 24,
    padding: 10,
    backgroundColor: Colors.GRAY,
  },
  otherMessageContainer: {
    marginTop: 12,
    borderWidth: 1,
    marginRight: 24,
    borderRadius: 12,
    borderColor: Colors.GRAY,
    padding: 10,
  },
  messageSeparator: {
    height: 8,
  },
});
const disableSendButtonStyle = [
  styles.sendButton,
  { backgroundColor: Colors.GRAY },
];
const ChatScreen = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, 'Chat'>>();
  const { other, userIds } = params;
  const {
    loadingChat,
    chat,
    sendMessage,
    messages,
    loadingMessages,
    updateMessageReadAt,
    userToMessageReadAt,
  } = useChat(userIds);
  const [text, setText] = useState('');
  const sendDisabled = useMemo(() => text.length === 0, [text]);
  const { user: me } = useContext(AuthContext);
  const loading = loadingChat || loadingMessages;

  console.log('messages', messages);
  useEffect(() => {
    if (me != null && messages.length > 0) {
      updateMessageReadAt(me?.userId);
    }
  }, [me, messages.length, updateMessageReadAt]);
  const onChangeText = useCallback((newText: string) => {
    setText(newText);
  }, []);
  const onPressSendButton = useCallback(() => {
    if (me != null) {
      sendMessage(text, me);
      setText('');
    }
  }, [sendMessage, text, me]);

  const renderChat = useCallback(() => {
    if (chat == null) {
      return null;
    }
    return (
      <View style={styles.chatContainer}>
        <View style={styles.memberSection}>
          <Text style={styles.membersTitleText}>대화상대</Text>
          <FlatList
            data={chat.users}
            renderItem={({ item: user }) => (
              <UserPhoto
                size={34}
                imageUrl={user.profileUrl}
                style={styles.userProfile}
                name={user.name}
              />
            )}
            horizontal={true}
          />
        </View>

        <FlatList
          inverted={true}
          style={styles.messageList}
          data={messages}
          renderItem={({ item: message }) => {
            const user = chat.users.find(u => u.userId === message.user.userId);
           const unreadUsers = chat.users.filter(u => {
              const messageReadAt = userToMessageReadAt[u.userId] ?? null;
              if (messageReadAt == null) {
                return true;
              }
              return moment(messageReadAt).isBefore(message.createdAt);
            });
            const unreadCount = unreadUsers.length;
            return (
              <Message
                unreadCount={unreadCount}
                name={user?.name ?? ''}
                text={message.text}
                createdAt={message.createdAt}
                isOtherMessage={message.user.userId !== me?.userId}
                imageUrl={user?.profileUrl}
              />
            );
          }}
          ItemSeparatorComponent={() => (
            <View style={styles.messageSeparator} />
          )}
        />
        <View style={styles.inputContainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="메시지 입력"
              style={styles.textInput}
              value={text}
              onChangeText={onChangeText}
              multiline={true}
            />
          </View>
          <TouchableOpacity
            style={sendDisabled ? disableSendButtonStyle : styles.sendButton}
            disabled={sendDisabled}
            onPress={onPressSendButton}>
            <Ionicons style={styles.sendIcon} name="send" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }, [
    chat,
    text,
    onChangeText,
    sendDisabled,
    onPressSendButton,
    messages,
    me?.userId,
    userToMessageReadAt,
  ]);

  return (
    <Screen title={other.name}>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator />
          </View>
        ) : (
          renderChat()
        )}
      </View>
    </Screen>
  );
};

export default ChatScreen;
