import React, { useContext, useCallback, useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Screen from '../components/Screen';
import AuthContext from '../components/AuthContext';
import Colors from '../components/Colors';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Collections, RootStackParamList, User } from '../types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ImageCropPicker from 'react-native-image-crop-picker';
import Profile from './Profile';
import UserPhoto from '../components/UserPhoto';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sectionTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.BLACK,
  },
  userSectionContent: {
    backgroundColor: Colors.BLACK,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  myProfile: {
    marginTop: 10,
  },
  myNameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
  myEmailText: {
    fontSize: 14,
    marginTop: 4,
    color: Colors.WHITE,
  },
  logoutText: {
    fontSize: 14,
    color: Colors.WHITE,
  },
  userListSection: {
    marginTop: 40,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userList: {
    flex: 1,
  },
  userListItem: {
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  otherNameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  otherEmailText: {
    marginTop: 4,
    fontSize: 14,
    color: Colors.BLACK,
  },
  seprator: {
    height: 10,
  },
  emptyText: {
    color: Colors.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  profile: {
    marginRight: 10,
  },
  userPhoto: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const HomeScreen = () => {
  const { user: me, updateProfileImage } = useContext(AuthContext);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  console.log('this is all users :', users);
  const onPressLogout = useCallback(() => {
    auth().signOut();
  }, []);

  const loadUsers = useCallback(async () => {
    try {
      setLoadingUsers(true);
      const snapshot = await firestore().collection(Collections.USERS).get();
      setUsers(
        snapshot.docs
          .map(doc => doc.data() as User)
          .filter(user => user.userId !== me?.userId),
      );
    } finally {
      setLoadingUsers(false);
    }
  }, [me?.userId]);
  const onPressProfile = useCallback(async () => {
    const image = await ImageCropPicker.openPicker({
      cropping: true,
      cropperCircleOverlay: true,
    });
    console.log('image', image);
    await updateProfileImage(image.path);
  }, [updateProfileImage]);
  const renderLoading = useCallback(() => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
  }, []);
  const ItemSeparator = useCallback(() => <View style={styles.seprator} />, []);
  const renderEmpty = useCallback(
    () => <Text style={styles.emptyText}>사용자가 없습니다.</Text>,
    [],
  );
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  if (me == null) {
    return null;
  }
  return (
    <Screen title="홈">
      <View style={styles.container}>
        <View>
          <Text style={styles.sectionTitleText}>나의 정보</Text>
          <View style={styles.userSectionContent}>
            <Profile
              style={styles.profile}
              onPress={onPressProfile}
              imageUrl={me.profileUrl}
              text={me.name[0]}
            />
            <View style={styles.myProfile}>
              <Text style={styles.myNameText}>{me.name}</Text>
              <Text style={styles.myEmailText}>{me.email}</Text>
            </View>
            <TouchableOpacity onPress={onPressLogout}>
              <Text style={styles.logoutText}>로그아웃</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.userListSection}>
          {loadingUsers ? (
            renderLoading()
          ) : (
            <>
              <Text style={styles.sectionTitleText}>
                다른 사용자와 대화해보세요!
              </Text>
              <FlatList
                style={styles.userList}
                data={users}
                renderItem={({ item: user }) => (
                  <TouchableOpacity
                    style={styles.userListItem}
                    onPress={() => {
                      navigate('Chat', {
                        userIds: [me.userId, user.userId],
                        other: user,
                      });
                    }}>
                    <UserPhoto
                      style={styles.userPhoto}
                      imageUrl={user.profileUrl}
                      name={user.name}
                    />
                    <View>
                      <Text style={styles.otherNameText}>{user.name}</Text>
                      <Text style={styles.otherEmailText}>{user.email}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={ItemSeparator}
                ListEmptyComponent={renderEmpty}
              />
            </>
          )}
        </View>
      </View>
    </Screen>
  );
};

export default HomeScreen;
