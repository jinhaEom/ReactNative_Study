import React, { useCallback, useContext, useMemo, useState } from 'react';
import Screen from '../components/Screen';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import validator from 'validator';
import Colors from '../components/Colors';
import AuthContext from '../components/AuthContext';

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
  signInButton: {
    backgroundColor: Colors.BLACK,
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
  },
  signInButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledSignInButton: {
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
  signInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, processingSignIn } = useContext(AuthContext);

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

    return null;
  }, [password]);

  const onChangeEmailText = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const onChangePasswordText = useCallback((text: string) => {
    setPassword(text);
  }, []);
  const signInButtonEnabled = useMemo(() => {
    return emailErrorText == null && passwordErrorText == null;
  }, [emailErrorText, passwordErrorText]);
  const signInButtonStyle = useMemo(() => {
    if (signInButtonEnabled) {
      return styles.signInButton;
    }
    return [styles.signInButton, styles.disabledSignInButton];
  }, [signInButtonEnabled]);

  const onPressSignInButton = useCallback(async () => {
    try {
      await signIn(email, password);
    } catch (error: any) {
      Alert.alert('로그인 실패', error.message);
    }
  }, [email, password, signIn]);
  return (
    <Screen title="로그인">
      <View style={styles.container}>
        {processingSignIn ? (
          <View style={styles.signingContainer}>
            <ActivityIndicator />
          </View>
        ) : (
          <>
            <View style={styles.section}>
              <Text style={styles.title}>이메일</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={onChangeEmailText}
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
            <View>
              <TouchableOpacity
                style={signInButtonStyle}
                onPress={onPressSignInButton}
                disabled={!signInButtonEnabled}>
                <Text style={styles.signInButtonText}>로그인</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </Screen>
  );
};

export default SignInScreen;
