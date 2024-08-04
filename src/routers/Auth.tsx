import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackParamList} from 'types/routes';
import auth from 'screens/auth';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthGroup() {
  return (
    <Stack.Group>
      <Stack.Screen name="LoginScreen" component={auth.LoginScreen} />
    </Stack.Group>
  );
}
