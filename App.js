import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [displayTime, setDisplayTime] = useState("");

  useEffect(() => {
    loadBusstopData();
  }, []);

  async function loadBusstopData() {
    setLoading(true);
    const response = await fetch(BUSSTOP_URL);
    const responseData = await response.json();
    const busData = responseData.services.filter(
      (service) => service.no === "155"
    )[0];
    setDisplayTime(busData.next.time);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus arrival time:</Text>
      <Text style={styles.time}>
        {loading ? <ActivityIndicator size="large" /> : displayTime}
      </Text>
      <TouchableOpacity onPress={loadBusstopData} style={styles.button}>
        <Text style={styles.buttonText}>Refresh!</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 36,
  },
  time: {
    fontSize: 48,
    margin: 24,
  },
  button: {
    backgroundColor: "green",
    padding: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
