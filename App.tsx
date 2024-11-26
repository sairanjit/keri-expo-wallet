import "./shim"
import "./globals"
import React from "react"
import { Button, SafeAreaView, StyleSheet } from "react-native"
import signify from "signify-ts"

function App(): React.JSX.Element {
  const test = async () => {
    try {
      await signify.ready()
      const passcode = signify.randomPasscode()

      console.log("Passcode : ", passcode)
    } catch (error) {
      console.log("Error", error)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Button title="Test signify" onPress={test} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default App
