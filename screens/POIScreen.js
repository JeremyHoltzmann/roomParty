import { KeyboardAvoidingView, Text } from "react-native";
import React from "react";
import { ListItem, Input, Button } from "react-native-elements";
import { connect } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
function POIScreen(props) {
  function joinRoom(roomName) {
    props.socket.emit("joinRoom", {
      roomName: roomName,
      userName: props.userName,
    });
    props.clearMessage();
  }

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
      <Button
        title="Global"
        containerStyle={{ width: "100%", height: 40 }}
        style={{ width: "100%" }}
        buttonStyle={{ backgroundColor: "#eb4d4b" }}
        onPress={() => joinRoom("global")}
      />
      <Button
        title="Amis"
        containerStyle={{ width: "100%", height: 40 }}
        style={{ width: "100%" }}
        buttonStyle={{ backgroundColor: "#eb4d4b" }}
        onPress={() => joinRoom("ami")}
      />
      <Button
        title="Famille"
        containerStyle={{ width: "100%", height: 40 }}
        style={{ width: "100%" }}
        buttonStyle={{ backgroundColor: "#eb4d4b" }}
        onPress={() => joinRoom("famille")}
      />
    </SafeAreaView>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    clearMessage: function () {
      dispatch({ type: "clearMessage" });
    },
  };
}

function mapStateToProps(state) {
  return { socket: state.socket, userName: state.userName };
}

export default connect(mapStateToProps, mapDispatchToProps)(POIScreen);
