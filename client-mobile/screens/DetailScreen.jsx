import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Card, Text } from 'react-native-paper';
import { formatPrice } from '../helpers';

export default function DetailScreen({ navigation, route }) {
  const { Category, Ingredients, description, imgUrl, name, price } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <Card.Content>
          <Text variant="titleLarge">{name}</Text>
        </Card.Content>
        <Card.Cover source={{ uri: imgUrl }} />
        <Text>{formatPrice(price)}</Text>
        <Text>{Category.name}</Text>
        <Text>{description}</Text>
        <Text>Ingredient list:</Text>
        {
          Ingredients?.map((ingredient, index) => {
            return <Text key={ingredient.id}>{++index}. {ingredient.name}</Text>
          })
        }
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
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
  detailImage: {

  },
  detailName: {

  }
})