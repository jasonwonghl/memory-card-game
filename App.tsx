import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import GameScreen, { CARD_PAIRS_VALUE } from 'view/game/GameScreen'

export default function App() {
  return (
    <SafeAreaProvider>
      <GameScreen cardPairsValue={CARD_PAIRS_VALUE} />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  )
}
