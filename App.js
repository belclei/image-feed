import React from "react";
import { StyleSheet, View } from "react-native";
import Card from "./components/Card";
import { Constants } from "expo";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Card
          fullname={"Belclei Fasolo"}
          linkText={"6 Comentários"}
          onPressLinkText={() => {
            console.log("link pressed!");
          }}
          image={{ uri: "https://unsplash.it/600/600" }}
        />
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
