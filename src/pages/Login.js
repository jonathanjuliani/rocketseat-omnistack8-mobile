import React, { useState, useEffect } from 'react'
import {
    KeyboardAvoidingView,
    StyleSheet,
    Image,
    TextInput,
    Text,
    TouchableOpacity,
    Platform
  } from 'react-native';
  
  import logo from '../assets/logo.png'
import api from '../services/api'
import AsyncStorage from '@react-native-community/async-storage'
  
  /*
  colors
  F5F4F2
  8BA6CA
  7159C1
  77779F
  272D46
  */
  
 
 const Login = ({ navigation }) => {

  const [user, setUser] = useState('')

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if(user) {
        navigation.navigate('Main', { user })
      }
    })
  }, [])

  async function handleLogin () {
    
    console.log('handle login')
    const response = await api.post('/devs', {
      username: user
    })

    await AsyncStorage.setItem('user', _id)

    const { _id } = response.data
    console.log(response)

    navigation.navigate('Main')
  }
    return (
    <KeyboardAvoidingView
        behavior="padding"
        enabled={Platform.OS === 'ios'}
        style={styles.container}>
        <Image source={logo} />
        <TextInput autoCapitalize="none" autoCorrect={false} placeholder="Usuário do github" placeholderTextColor="#999" style={styles.input} onChangeText={setUser} />
        <TouchableOpacity style={styles.button} onPress={handleLogin}><Text style={styles.buttonText}>Entrar</Text></TouchableOpacity>
    </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272D46',
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  input: {
      height: 45,
      alignSelf: "stretch",
      backgroundColor: '#F5F4F2',
      borderWidth: 1,
      borderColor: '#F5F4F2',
      borderRadius: 4,
      marginTop: 20,
      paddingHorizontal: 15,
  },
  button: {
    height: 46,
    alignSelf: "stretch",
    backgroundColor: '#7159C1',
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: '#FFF',
    fontWeight: "bold",
    fontSize: 16
  }
})
export default Login
