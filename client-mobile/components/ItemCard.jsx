import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formatPrice } from '../helpers';
import { useNavigation } from '@react-navigation/native';

export default function ItemCard({ item }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Detail', item)}>
      <Image
        style={styles.itemImage}
        source={{
          uri: item.imgUrl
        }}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>From {formatPrice(item.price)}</Text>
      </View>
      <Text style={styles.arrowIcon}>
        <Ionicons name={'ios-chevron-forward'} size={25} color={'black'} />
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 10,
    marginTop: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 30
  },
  itemImage: {
    width: 60,
    height: 60,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10
  },
  itemPrice: {
    color: 'green',
    fontWeight: '600'
  },
  arrowIcon: {
    marginStart: 'auto'
  },
  contentContainer: {
    paddingLeft: 20,
    width: '75%'
  }
})