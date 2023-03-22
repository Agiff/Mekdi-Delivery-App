import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Card, Text } from 'react-native-paper';
import { formatName, formatPrice } from '../helpers';

export default function DetailScreen({ navigation, route }) {
  const { Category, Ingredients, description, imgUrl, name, price } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.cardContainer}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.nameText}>{name}</Text>
        </Card.Content>
        <Card.Cover source={{ uri: imgUrl }} style={styles.imageDetail}/>
        <Card.Content>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>{formatPrice(price)}</Text>
            <Text style={styles.categoryText}>{formatName(Category.name)}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>{description}</Text>
          </View>
          <Text style={styles.nameText}>Ingredient list:</Text>
          {
            Ingredients.length === 0 && <Text>-</Text> 
          }
          {
            Ingredients?.map((ingredient, index) => {
              return <Text key={ingredient.id} style={styles.ingredientText}>{++index}. {formatName(ingredient.name)}</Text>
            })
          }
        </Card.Content>
        <Card.Actions>
          <Button textColor='tomato' style={{ borderColor: 'tomato' }}>Kembali</Button>
          <Button buttonColor='tomato'>Pesan</Button>
        </Card.Actions>
      </Card>
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
  }
})