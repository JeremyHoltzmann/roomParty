import { View, ImageBackground } from "react-native";
import React from "react";
import { useState } from "react";

import { Button, Input } from "react-native-elements";

import { connect } from "react-redux";

function HomeScreen(props) {
  const [userName, setUserName] = useState("");

  function changeUserName(props) {
    props.navigation.navigate("Map");
    props.setUserName(userName);

    props.socket.emit("setUserName", {
      userName: userName,
    });
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ImageBackground
        style={{ flex: 1, justifyContent: "center", width: "100%" }}
        source={require("../assets/home.jpg")}
        resizeMode="cover"
      >
        <Input
          style={{ width: "20%" }}
          placeholder="Pseudo"
          leftIcon={{ type: "ionicon", name: "person", color: "#eb4d4b" }}
          onChangeText={(value) => setUserName(value)}
          value={userName}
        ></Input>

        <Button
          title="Go To Page Map"
          icon={{ type: "antdesign", name: "arrowright", color: "#eb4d4b" }}
          onPress={() => {
            changeUserName(props);
          }}
          type="outline"
        />
      </ImageBackground>
    </View>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    setUserName: function (userName) {
      dispatch({ type: "setUserName", userName });
    },
  };
}

function mapStateToProps(state) {
  return { userName: state.userName, socket: state.socket };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
