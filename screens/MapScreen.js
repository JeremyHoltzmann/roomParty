import { View, Text } from "react-native";
import React from "react";

import { connect } from "react-redux";

import { useState, useEffect } from "react";

import { Input, Button, Overlay } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

function MapScreen(props) {
  const [location, setLocation] = useState({
    coords: { latitude: 0, longitude: 0 },
  });
  const [visible, setVisible] = useState(false);
  const [listPOI, setListPOI] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [POILocation, setPOILocation] = useState({});
  const [addPOI, setAddPOI] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    async function askPermissions() {
      var { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === "granted") {
        await Location.watchPositionAsync(
          { distanceInterval: 2 },
          (location) => {
            setLocation(location);
          }
        );
      }
    }
    askPermissions();
  }, []);

  function onClickMap(coordinate) {
    if (!addPOI) return;
    setPOILocation(coordinate.nativeEvent.coordinate);
    toggleOverlay();
  }

  function addPOIFunction() {
    var tmpPOIList = [...props.POIList];
    var newPOI = {
      latitude: POILocation.latitude,
      longitude: POILocation.longitude,
      title: title,
      description: description,
    };
    tmpPOIList.push(newPOI);
    props.setPOI(newPOI);
    setTitle("");
    setDescription("");
    setPOILocation({});
    toggleOverlay();
    setAddPOI(false);
  }

  var markerList = props.POIList.map((element, i) => {
    return (
      <MapView.Marker
        key={i}
        coordinate={{
          latitude: element.latitude,
          longitude: element.longitude,
        }}
        title={element.title}
        description={element.description}
        pinColor={"blue"}
      />
    );
  });

  var buttonColor = "#eb4d4b";
  if (addPOI) {
    buttonColor = "#130f40";
  } else {
    buttonColor = "#eb4d4b";
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 48.866667,
          longitude: 2.333333,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={onClickMap}
      >
        <MapView.Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="Hello"
          description={`I'm here`}
          pinColor={"red"}
        />
        {markerList}
      </MapView>
      <Button
        title="ADD POI"
        buttonStyle={{ backgroundColor: buttonColor }}
        onPress={() => setAddPOI(!addPOI)}
      ></Button>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        // style={{ flex: 1, width: "80%", height: 50 }}
        overlayStyle={{ width: 200, height: 200 }}
      >
        <Input
          placeholder="Titre"
          onChangeText={(value) => setTitle(value)}
          value={title}
        ></Input>
        <Input
          placeholder="Description"
          onChangeText={(value) => setDescription(value)}
          value={description}
        ></Input>
        <Button
          title="ADD POI"
          buttonStyle={{ backgroundColor: "#eb4d4b" }}
          onPress={() => addPOIFunction()}
        ></Button>
      </Overlay>
    </SafeAreaView>
  );
}

function mapStateToProps(state) {
  return { POIList: state.POIList };
}

function mapDispatchToProps(dispatch) {
  return {
    setPOI: function (POI) {
      dispatch({ type: "setPOI", POI });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
