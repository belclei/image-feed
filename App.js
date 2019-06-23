import React from "react";
import { StyleSheet, View } from "react-native";
import CardList from "./components/CardList";
import { Constants } from "expo";

const items = [
  { id: 0, author: "Chuck Norris" },
  { id: 1, author: "John Snow" },
  { id: 2, author: "Belclei Fasolo" },
  { id: 3, author: "Sabrina de Freitas" },
  { id: 4, author: "Selia Fasolo" },
  { id: 5, author: "Gabriele Fasolo" },
  { id: 6, author: "Helio Fasolo" },
  { id: 7, author: "Antonio Nunes" },
  { id: 8, author: "Armando Volta" }
];

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <CardList items={items} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#fff"
  }
});
