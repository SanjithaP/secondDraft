import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function CupertinoButtonPurple2(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <Text style={styles.sendNotifications}>Send Notifications</Text>
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
  sendNotifications: {
    color: "#fff",
    fontSize: 17
  }
});

export default CupertinoButtonPurple2;
