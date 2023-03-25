import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../config';
import { formatName } from '../helpers';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../config/queries';

export default function CategoryBar({ filterHandler }) {
  const [categories, setCategories] = useState([]);
  const [activeBar, setActiveBar] = useState('food');

  const { loading, data, error } = useQuery(GET_CATEGORIES);

  const changeActiveBar = (category) => {
    setActiveBar(category);
    filterHandler(category);
  }

  useEffect(() => {
    setCategories(data?.getCategories || []);
  }, [data])

  if (error) return <Text>Error</Text>
  
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {
          loading ? '' : categories?.map(category => {
            return <View key={category.id}>
              <TouchableOpacity
                style={activeBar === category.name ? styles.categoryContainerSelected : styles.categoryContainer}
                onPress={() => changeActiveBar(category.name)}
              >
                <Text style={styles.categoryText}>{formatName(category.name)}</Text>
              </TouchableOpacity>
            </View>
          })
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  categoryContainerSelected: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderColor: 'orange',
    borderBottomWidth: 2,
  },
  categoryContainer: {
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  categoryText: {
    fontWeight: 'bold',
    fontSize: 16
  }
})