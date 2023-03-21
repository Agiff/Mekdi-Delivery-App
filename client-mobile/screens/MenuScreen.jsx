import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { baseUrl } from '../config';
import ItemCard from '../components/ItemCard';

export default function MenuScreen() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(baseUrl + 'items')
      .then(res => {
        if (!res.ok) throw res.text();
        return res.json();
      })
      .then(data => {
        setItems(data);
      })
      .catch(err => console.log(err));
  }, [])
  

  return (
    <SafeAreaView style={styles.container}>
      {
        <FlatList
          data={items}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return <ItemCard item={item}/>
          }}
        />
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})