import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import axios from 'axios';
import {Colors} from '../assets/themes';

const Login = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async () => {
    const dataToSend = {
      empId: email,
      password: password,
    };
    try {
      const response = await axios.post(
        'http://10.0.2.2:3001/api/v1/login',
        dataToSend,
      );
      response.data.data
        ? navigation.navigate('Home')
        : 'Invalid credentials. Try again!';
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error sending data:', JSON.stringify(error));
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.heading}>
        GeoCompensate
      </Text>
      <TextInput
        label={'Employee ID'}
        style={styles.emailInput}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        secureTextEntry={true}
        label={'Password'}
        style={styles.emailInput}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button style={styles.button} mode="contained" onPress={handleLogin}>
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: Colors.grayBlue,
  },
  heading: {
    color: Colors.darkGrayBlue,
    marginBottom: 20,
    fontWeight: '800',
  },
  emailInput: {
    marginBottom: 20,
    width: '100%',
    backgroundColor: Colors.white,
  },
  button: {
    backgroundColor: Colors.darkGrayBlue,
  },
});

export default Login;
