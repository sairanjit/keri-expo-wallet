import "./shim"
import "./globals"
import React from "react"
import { Button, SafeAreaView, StatusBar, StyleSheet, View } from "react-native"
import signify from "signify-ts"

function App(): React.JSX.Element {
  const isReady = async () => {
    try {
      const isReady = await signify.ready()

      // const bran1 = signify.randomPasscode()
      const salt = new signify.Salter({})

      console.log("Branch 1 check", salt.qb64)
    } catch (error) {
      console.log("Error in isReady", error)
    }
  }

  const setupAllie = async () => {
    try {
      await signify.ready()
      const passcode = signify.randomPasscode()

      console.log("Allie Passcode", passcode)

      const url = "http://192.168.1.28:3801"

      const bootUrl = "http://192.168.1.28:3803"

      const allieClient = new signify.SignifyClient(
        url,
        passcode,
        signify.Tier.low,
        bootUrl
      )

      console.log("Allie Client created")

      await allieClient.boot()

      console.log("Allie Client booted")

      await allieClient.connect()

      console.log("Allie Client connected")

      const allieClientState = await allieClient.state()

      console.log(
        "Allie Client connected. Client AID:",
        allieClientState.controller.state.i,
        "Agent AID: ",
        allieClientState.agent.i
      )

      const oobiUrl =
        "http://192.168.1.28:5642/oobi/BBilc4-L3tFUnfM_wJr4S4OJanAv_VmF_dJNN6vkf2Ha/controller?name=Wan&tag=witness"
      const oobiUrl1 =
        "http://192.168.1.28:5643/oobi/BLskRTInXnMxWaGqcpSyMgo0nYbalW99cGZESrz3zapM/controller?name=Wes&tag=witness"
      const oobiUrl2 =
        "http://192.168.1.28:5644/oobi/BIKKuvBwpmDVA4Ds-EpL5bt9OqPzWPja2LigFYZN2YfX/controller?name=Wil&tag=witness"

      const op = await allieClient.oobis().resolve(oobiUrl)

      console.log("Resolved OOBI 1", JSON.stringify(op, null, 2))

      const op1 = await allieClient.oobis().resolve(oobiUrl1)

      console.log("Resolved OOBI 2", JSON.stringify(op1, null, 2))

      const op2 = await allieClient.oobis().resolve(oobiUrl2)

      console.log("Resolved OOBI 3", JSON.stringify(op2, null, 2))

      let icpResult1 = await allieClient.identifiers().create("aid1", {
        toad: 1,
        wits: [
          "BBilc4-L3tFUnfM_wJr4S4OJanAv_VmF_dJNN6vkf2Ha",
          "BLskRTInXnMxWaGqcpSyMgo0nYbalW99cGZESrz3zapM",
          "BIKKuvBwpmDVA4Ds-EpL5bt9OqPzWPja2LigFYZN2YfX",
        ],
        transferable: true,
      })

      // const icpResult1 = await allieClient.identifiers().create("delegator", {
      //   toad: 3,
      //   wits: [
      //     "BBilc4-L3tFUnfM_wJr4S4OJanAv_VmF_dJNN6vkf2Ha",
      //     "BLskRTInXnMxWaGqcpSyMgo0nYbalW99cGZESrz3zapM",
      //     "BIKKuvBwpmDVA4Ds-EpL5bt9OqPzWPja2LigFYZN2YfX",
      //   ],
      // })
    } catch (error) {
      console.log("Error in setupAllie", error)
    }
  }

  const setupBrett = async () => {
    try {
      await signify.ready()
      const passcode = signify.randomPasscode()

      console.log("Brett Passcode", passcode)

      const url = "http://192.168.1.28:3701"

      const bootUrl = "http://192.168.1.28:3703"

      const allieClient = new signify.SignifyClient(
        url,
        passcode,
        signify.Tier.low,
        bootUrl
      )

      console.log("Brett Client created")

      await allieClient.boot()

      console.log("Brett Client booted")

      await allieClient.connect()

      console.log("Brett Client connected")

      const allieClientState = await allieClient.state()

      console.log(
        "Brett Client connected. Client AID:",
        allieClientState.controller.state.i,
        "Agent AID: ",
        allieClientState.agent.i
      )
    } catch (error) {
      console.log("Error in setupBrett", error)
    }
  }

  return (
    <View style={styles.container}>
      <Button title="isReady" onPress={isReady} />
      <View style={{ height: 10 }} />
      <Button title="Setup Allie" onPress={setupAllie} />
      <View style={{ height: 10 }} />
      <Button title="Setup brett" onPress={setupBrett} />
      <StatusBar barStyle={"default"} />
    </View>
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
