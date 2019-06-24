import React from "react";
import { Platform, StyleSheet, View, Modal, AsyncStorage } from "react-native";
import { Constants } from "expo";

import Feed from "./screens/Feed";
import Comments from "./screens/Comments";

const ARBITRATY_KEY_WITH_ALL_COMMENTS_DATA =
  "ARBITRATY_KEY_WITH_ALL_COMMENTS_DATA";

export default class App extends React.Component {
  state = {
    commentsForItem: {},
    showModal: false,
    selectedItemId: null
  };
  async componentDidMount() {
    try {
      const commentsForItem = await AsyncStorage.getItem(
        ARBITRATY_KEY_WITH_ALL_COMMENTS_DATA
      );

      this.setState({
        commentsForItem: commentsForItem ? JSON.parse(commentsForItem) : {}
      });
    } catch (e) {
      console.log("Falha ao obter dados dos comentarios");
    }
  }
  onSubmitComment = text => {
    const { selectedItemId, commentsForItem } = this.state;
    const comments = commentsForItem[selectedItemId] || [];

    const updated = {
      ...commentsForItem,
      [selectedItemId]: [...comments, text]
    };

    this.setState({ commentsForItem: updated });

    try {
      AsyncStorage.setItem(
        ARBITRATY_KEY_WITH_ALL_COMMENTS_DATA,
        JSON.stringify(updated)
      );
    } catch (e) {
      console.log("Falha ao salvar comentario", text, "para", selectedItemId);
    }
  };
  openCommentScreen = id => {
    this.setState({
      showModal: true,
      selectedItemId: id
    });
  };
  closeCommentScreen = () => {
    this.setState({
      showModal: false,
      selectedItemId: null
    });
  };
  render() {
    const { commentsForItem, showModal, selectedItemId } = this.state;
    return (
      <View style={styles.container}>
        <Feed
          style={styles.feed}
          commentsForItem={commentsForItem}
          onPressComments={this.openCommentScreen}
        />
        <Modal
          visible={showModal}
          animationType="slide"
          onRequestClose={this.closeCommentScreen}
        >
          <Comments
            style={styles.comments}
            comments={commentsForItem[selectedItemId] || []}
            onClose={this.closeCommentScreen}
            onSubmitComment={this.onSubmitComment}
          />
        </Modal>
      </View>
    );
  }
}
const platformVersion =
  Platform.OS === "ios" ? parseInt(Platform.Version, 10) : Platform.Version;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#fff"
  },
  feed: {
    flex: 1,
    marginTop:
      Platform.OS === "android" || platformVersion < 11
        ? Constants.statusBarHeight
        : 0
  },
  comments: {
    flex: 1,
    marginTop:
      Platform.OS === "ios" && platformVersion < 11
        ? Constants.statusBarHeight
        : 0
  }
});
