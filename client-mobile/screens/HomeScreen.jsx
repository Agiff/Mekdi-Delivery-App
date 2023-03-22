import React from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import LoginForm from '../components/LoginForm';
import { Text } from 'react-native-paper';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          source={{
            uri: 'https://www.mcdelivery.co.id/id/static/1677662128341/assets/62/banners/landing_28324_1140x475pixel-INA.jpg',
            width: '100%',
            height: 200
          }}
        />
        <LoginForm />
        <View style={styles.registerAdsContainer}>
          <Text variant='titleMedium' style={{ textAlign: 'center', marginTop: 5, marginBottom: 10, fontWeight: 'bold' }}>Nikmati Keuntungan Anggota</Text>
          <Text variant='bodyLarge' style={{ textAlign: 'center', marginTop: 5, marginBottom: 10 }}>
            Dapatkan penawaran eksklusif dan promosi, menampilkan riwayat pesanan dan menu favorit, serta menyelesaikan pesanan lebih cepat
          </Text>
          <TouchableOpacity style={styles.registerButton}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>BUAT AKUN</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>KURANG DARI 2 MENIT</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.guestContainer}>
          <Text variant='titleMedium' style={{ textAlign: 'center', marginTop: 5, marginBottom: 5, fontWeight: 'bold' }}>LANJUT TANPA DAFTAR</Text>
          <Text variant='bodySmall' style={{ textAlign: 'center', marginTop: 5, marginBottom: 10, fontWeight: 'bold' }}>
            Selesai pesanan dengan pembayaran online sebagai tamu
          </Text>
          <TouchableOpacity style={styles.guestButton}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>PESANAN TAMU</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  registerAdsContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 50,
    paddingVertical: 20
  },
  registerButton: {
    borderColor: 'orange',
    borderWidth: 2,
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 5
  },
  guestContainer: {
    paddingHorizontal: 50,
    paddingVertical: 20
  },
  guestButton: {
    borderColor: 'silver',
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 10
  },
});

export default HomeScreen;
