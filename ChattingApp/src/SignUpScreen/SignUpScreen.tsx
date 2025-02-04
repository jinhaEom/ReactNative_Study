import React, { useCallback, useContext, useMemo, useState } from 'react';
import validator from 'validator';
import Screen from '../components/Screen';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Colors from '../components/Colors';
import AuthContext from '../components/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.GRAY,
  },
  errorText: {
    color: Colors.RED,
    fontSize: 15,
    marginTop: 5,
  },
  signInTextButton: {
    marginTop: 10,
    alignItems: 'center',
    color: Colors.GRAY,
  },
  signUpButton: {
    backgroundColor: Colors.BLACK,
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
  },
  signUpButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledSignUpButton: {
    backgroundColor: Colors.GRAY,
  },
  signInTextButtonText: {
    color: Colors.BLACK,
    fontSize: 16,
    marginTop: 5,
  },
  signingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const { processingSignUp, signUp } = useContext(AuthContext);
  const {navigate} = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const emailErrorText = useMemo(() => {
    if (email.length === 0) {
      return '이메일을 입력해주세요.';
    }
    if (!validator.isEmail(email)) {
      return '이메일 형식이 올바르지 않습니다.';
    }
    return null;
  }, [email]);

  const passwordErrorText = useMemo(() => {
    if (password.length === 0) {
      return '비밀번호를 입력해주세요.';
    }
    if (password.length < 6) {
      return '비밀번호는 6자 이상이어야 합니다.';
    }
    if (password !== passwordConfirm) {
      return '비밀번호가 일치하지 않습니다.';
    }
    return null;
  }, [password, passwordConfirm]);

  const confirmedPasswordErrorText = useMemo(() => {
    if (passwordConfirm.length === 0) {
      return '비밀번호를 입력해주세요.';
    }
    if (passwordConfirm.length < 6) {
      return '비밀번호는 6자 이상이어야 합니다.';
    }
    if (password !== passwordConfirm) {
      return '비밀번호가 일치하지 않습니다.';
    }
    return null;
  }, [passwordConfirm, password]);

  const nameErrorText = useMemo(() => {
    if (name.length === 0) {
      return '이름을 입력해주세요.';
    }
    return null;
  }, [name]);
  const onChangeEmailText = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const onChangePasswordText = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const onChangePasswordConfirmText = useCallback((text: string) => {
    setPasswordConfirm(text);
  }, []);

  const onChangeNameText = useCallback((text: string) => {
    setName(text);
  }, []);

  const signUpButtonEnabled = useMemo(() => {
    return (
      emailErrorText == null &&
      passwordErrorText == null &&
      confirmedPasswordErrorText == null &&
      nameErrorText == null
    );
  }, [
    emailErrorText,
    passwordErrorText,
    confirmedPasswordErrorText,
    nameErrorText,
  ]);

  const signUpButtonStyle = useMemo(() => {
    if (signUpButtonEnabled) {
      return styles.signUpButton;
    }
    return [styles.signUpButton, styles.disabledSignUpButton];
  }, [signUpButtonEnabled]);

  const onPressSignUpButton = useCallback(async () => {
    try {
      await signUp(email, password, name);
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }, [email, password, name, signUp]);

  const onPressSignInButton = useCallback(() => {
    navigate('SignIn');

  }, [navigate]);
  return (
    <Screen title="회원가입">
      {processingSignUp ? (
        <View style={styles.signingContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.section}>
            <Text>이메일</Text>
            <TextInput
              value={email}
              onChangeText={onChangeEmailText}
              style={styles.input}
            />
            {emailErrorText && (
              <Text style={styles.errorText}>{emailErrorText}</Text>
            )}
          </View>
          <View style={styles.section}>
            <Text>비밀번호</Text>
            <TextInput
              value={password}
              secureTextEntry={true}
              onChangeText={onChangePasswordText}
              style={styles.input}
            />
            {passwordErrorText && (
              <Text style={styles.errorText}>{passwordErrorText}</Text>
            )}
          </View>
          <View style={styles.section}>
            <Text>비밀번호 확인</Text>
            <TextInput
              value={passwordConfirm}
              secureTextEntry={true}
              onChangeText={onChangePasswordConfirmText}
              style={styles.input}
            />
            {confirmedPasswordErrorText && (
              <Text style={styles.errorText}>{confirmedPasswordErrorText}</Text>
            )}
          </View>
          <View style={styles.section}>
            <Text>이름</Text>
            <TextInput
              value={name}
              onChangeText={onChangeNameText}
              style={styles.input}
            />
            {nameErrorText && (
              <Text style={styles.errorText}>{nameErrorText}</Text>
            )}
          </View>
          <View>
            <TouchableOpacity
              style={signUpButtonStyle}
              onPress={onPressSignUpButton}
              disabled={!signUpButtonEnabled}
              >
              <Text style={styles.signUpButtonText}>회원가입</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signInTextButton}
              onPress={onPressSignInButton}>
              <Text style={styles.signInTextButtonText} onPress={onPressSignInButton}>
                이미 계정이 있으신가요?
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </Screen>
  );
};

export default SignUpScreen;
