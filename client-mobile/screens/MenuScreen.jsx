import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { baseUrl } from '../config';
import ItemCard from '../components/ItemCard';
import { ActivityIndicator } from 'react-native-paper';
import CategoryBar from '../components/CategoryBar';
import { useQuery } from '@apollo/client';
import { GET_ITEMS_BY_CATEGORY } from '../config/queries';

export default function MenuScreen() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('food');
  const { loading, data, error } = useQuery(GET_ITEMS_BY_CATEGORY, {
    variables: {
      category
    }
  });

  useEffect(() => {
    setItems(data?.getItemsByCategory || []);
  }, [data])

  const filterHandler = (category) => {
    setCategory(category);
  }

  if (error) return <Text>Error</Text>

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
        <CategoryBar filterHandler={filterHandler}/>
      </View>
      {
        loading ? <ActivityIndicator animating={true} color={'red'} size='large' style={styles.loading} /> :
        <FlatList
          showsVerticalScrollIndicator={false}
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
  },
  loading: {
    flex: 1,
    alignItems: 'center'
  }
})