import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function CupertinoButtonPurple(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <Text style={styles.calendar}>Calendar</Text>
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
    paddingRight: 16,
  },
  calendar: {
    color: "rgba(253,252,252,1)",
    fontSize: 28
  }
});

export default CupertinoButtonPurple;
