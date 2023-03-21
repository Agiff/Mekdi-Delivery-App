import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TextInput, Text } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import { Button } from 'react-native-paper';

export default function LoginForm() {
  const [checked, setChecked] = React.useState(false);

  return (
    <View style={styles.formContainer}>
      <Text variant='headlineSmall' style={styles.boldCenter}>AKSES BARU KE MCDELIVERY™</Text>
      <Text variant='bodyMedium' style={[styles.boldCenter, { marginTop: 10, marginBottom: 5 }]}>Masuk dengan akun aplikasi McDonald's untuk mulai pesan</Text>
      <TextInput
        label="Email"
        selectionColor='black'
        activeUnderlineColor='black'
        style={styles.loginInput}
      />
      <TextInput
        label="Password"
        selectionColor='black'
        activeUnderlineColor='black'
        style={styles.loginInput}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
        <Checkbox
          color='red'
          uncheckedColor='red'
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Text>Ingat saya</Text>
      </View>
      <TouchableOpacity style={styles.loginButton} activeOpacity={0.5}>
        <Text style={styles.loginButtonText}>Log Masuk</Text>
      </TouchableOpacity>
      <Text variant='bodyLarge' style={{ textAlign: 'center', marginTop: 5, marginBottom: 10 }}>Lupa password?</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 50,
    paddingVertical: 20
  },
  boldCenter: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  loginInput: {
    backgroundColor: '#fff',
    marginBottom: 5
  },
  loginButton: {
    borderRadius: 5,
    paddingVertical: 3,
    backgroundColor: 'red',
    alignItems: 'center',
    paddingVertical: 13,
    marginBottom: 5
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
})