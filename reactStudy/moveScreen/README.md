- 화면이동에 대한 테스트
- npm install @react-navigation/native
   - React Navigation의 기능 제공, 앱 내 화면전환과 네비게이션 상태 관리 담당
- npm install @react-navigation/stack
   - 앱 내 화면에서 화면을 스택으로 관리하는 네비게이션 패턴을 구현할떄 사용

- Test중 에러발생 (Invariant Violation: requireNativeComponent: "RNSScreen" was not found in the UIManager.)   
   - 네비게이션 관련 라이브러리 설치를 덜 해서 생기는 문제 
      - npm install react-native-screens react-native-safe-area-context
      - npx pod-install ios


