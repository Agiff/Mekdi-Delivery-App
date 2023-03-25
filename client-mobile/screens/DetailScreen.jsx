import { StyleSheet, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Card, Text } from 'react-native-paper';
import { formatName, formatPrice } from '../helpers';
import { useQuery } from '@apollo/client';
import { GET_ITEM_DETAIL } from '../config/queries';
import { ActivityIndicator } from 'react-native-paper';

export default function DetailScreen({ navigation, route }) {
  const [item, setItem] = useState({});
  const { id } = route.params;
  const { loading, data, error } = useQuery(GET_ITEM_DETAIL, {
    variables: {
      findItemId: id
    }
  })

  useEffect(() => {
    setItem(data?.findItem || {});
  }, [data])
  
  const handleOrder = () => {
    navigation.navigate('MenuScreen');
    ToastAndroid.showWithGravity('Terima kasih atas pesanannya', 1000, ToastAndroid.TOP);
  }

  if (error) return <Text>Error</Text>

  return (
    <SafeAreaView style={styles.container}>
      {
        loading ? <ActivityIndicator animating={true} color={'red'} size='large' style={styles.loading} /> :
        <Card style={styles.cardContainer}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.nameText}>{item.name}</Text>
          </Card.Content>
          <Card.Cover source={{ uri: item.imgUrl }} style={styles.imageDetail}/>
          <Card.Content>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>{formatPrice(item.price)}</Text>
              <Text style={styles.categoryText}>{item.category? formatName(item.category.name) : ''}</Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>{item.description}</Text>
            </View>
            <Text style={styles.nameText}>Ingredient list:</Text>
            {
              item.ingredients?.length === 0 && <Text>-</Text> 
            }
            {
              item.ingredients?.map((ingredient, index) => {
                return <Text key={ingredient.id} style={styles.ingredientText}>{++index}. {formatName(ingredient.name)}</Text>
              })
            }
            <Text style={styles.userContainer}><Text style={{ fontWeight: 'bold' }}>Created by: </Text>{item.user?.username}</Text>
          </Card.Content>
          <Card.Actions>
            <Button textColor='tomato' style={{ borderColor: 'tomato' }} onPress={() => navigation.goBack()}>Kembali</Button>
            <Button buttonColor='tomato' onPress={handleOrder}>Pesan</Button>
          </Card.Actions>
        </Card>
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  cardContainer: {
    backgroundColor: '#eee'
  },
  nameText: {
    fontWeight: 'bold',
    marginBottom: 10
  },
  imageDetail :{
    height: 300
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  priceText: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 16
  },
  categoryText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  descriptionContainer: {
    marginBottom: 10
  },
  descriptionText: {
    color: 'gray'
  },
  ingredientText: {
    marginBottom: 5
  },
  userContainer: {
    marginVertical: 10
  }
})