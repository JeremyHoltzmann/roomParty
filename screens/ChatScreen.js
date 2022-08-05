import { View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import React, { useState } from "react";
import { ListItem, Input, Button } from "react-native-elements";
import { connect } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

import { useEffect } from "react";

function ChatScreen(props) {
  const [messageInput, setMessageInput] = useState("");

  function sendMessageToBack() {
    props.socket.emit("sendMessage", {
      userName: props.userName,
      message: messageInput,
    });
    setMessageInput("");
  }

  var regExp1 = /(?:\:\))/gm;
  var regExp2 = /(?:\:\()/gm;
  var regExp3 = /((fuck))/gim;

  useEffect(() => {
    props.socket.on(
      "sendMessageFromBack",
      (newMessage) => {
        var tmpMessageList = [...props.messageList];
        var message = newMessage.message;
        message = message
          .replace(regExp3, "\u2022\u2022\u2022")
          .replace(regExp2, "\u2639")
          .replace(regExp1, "\u263A");

        tmpMessageList.push({
          userName: newMessage.userName,
          message,
          color: "black",
        });

        props.setMessageList(tmpMessageList);
      },
      props.socket.on("leaveUser", (newMessage) => {
        var tmpMessageList = [...props.messageList];

        tmpMessageList.push({
          userName: "Server",
          message: newMessage,
          color: "red",
        });

        props.setMessageList(tmpMessageList);
      }),
      props.socket.on("joinUser", (newMessage) => {
        var tmpMessageList = [...props.messageList];

        tmpMessageList.push({
          userName: "Server",
          message: newMessage,
          color: "green",
        });

        props.setMessageList(tmpMessageList);
      })
    );

    return () => props.socket.off();
  }, [props.messageList]);

  var messageElements = props.messageList.map((element, i) => {
    return (
      <ListItem key={i} title="Test" subtitle="Test">
        <ListItem.Content>
          <ListItem.Title style={{ color: element.color }}>
            {element.userName}
          </ListItem.Title>
          <ListItem.Subtitle>{element.message}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  });

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
      <ScrollView
        contentContainerStyle={{ margin: 10 }}
        style={{ margin: 20, height: "50%" }}
      >
        {messageElements}
      </ScrollView>
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 0,
        }}
      >
        <Input
          placeholder="Message"
          onChangeText={(value) => setMessageInput(value)}
          value={messageInput}
        ></Input>
        <Button
          title="Send"
          icon={{
            type: "antdesign",
            name: "mail",
            color: "white",
          }}
          containerStyle={{ width: "100%", height: 40 }}
          style={{ width: "100%" }}
          buttonStyle={{ backgroundColor: "#eb4d4b" }}
          onPress={() => sendMessageToBack()}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function mapStateToProps(state) {
  return {
    userName: state.userName,
    socket: state.socket,
    messageList: state.messageList,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addMessage: function (message) {
      dispatch({ type: "addMessage", message });
    },
    setMessageList: function (array) {
      dispatch({ type: "setMessageList", array });
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
