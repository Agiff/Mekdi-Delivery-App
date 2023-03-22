import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../config';
import { formatName } from '../helpers';

export default function CategoryBar({ filterHandler }) {
  const [categories, setCategories] = useState([]);
  const [activeBar, setActiveBar] = useState('food');

  const changeActiveBar = (category) => {
    setActiveBar(category);
    filterHandler(category);
  }

  useEffect(() => {
    fetch(baseUrl + 'categories')
      .then(res => {
        if (!res.ok) throw res.text();
        return res.json();
      })
      .then(data => {
        setCategories(data);
      })
      .catch(err => console.log(err));
  }, [])
  
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {
          categories?.map(category => {
            return <>
              <TouchableOpacity
                key={category.id}
                style={activeBar === category.name ? styles.categoryContainerSelected : styles.categoryContainer}
                onPress={() => changeActiveBar(category.name)}
              >
                <Text style={styles.categoryText}>{formatName(category.name)}</Text>
              </TouchableOpacity>
            </>
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