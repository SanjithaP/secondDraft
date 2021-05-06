import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function CupertinoButtonPurple1(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <Text style={styles.achievements}>Achievements</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5233ff",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    paddingLeft: 16,
    paddingRight: 16
  },
  achievements: {
    color: "#fff",
    fontSize: 15
  }
});

export default CupertinoButtonPurple1;
