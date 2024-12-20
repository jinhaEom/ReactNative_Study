declare module 'react-native-vector-icons/Ionicons' {
    import { Component } from 'react';
    class Icon extends Component<{
        name: string;
        size: number;
        color: string;
    }> {}
    export default Icon;
} 