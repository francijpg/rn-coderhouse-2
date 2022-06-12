import React, { useState } from "react";
import { View, SafeAreaView, ActivityIndicator } from "react-native";
import { Header } from "./src/components/index";
import StartGame from "./src/screens/start-game/index";
import GameScreen from "./src/screens/game-screen/index";
import GameOver from "./src/screens/game-over";
import theme from "./src/constants/theme";
import { useFonts } from "expo-font";
import { styles } from "./styles";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  const [loaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "open-sans-semibold": require("./assets/fonts/OpenSans-SemiBold.ttf"),
    "open-sans-extrabold": require("./assets/fonts/OpenSans-ExtraBold.ttf"),
    "open-sans-light": require("./assets/fonts/OpenSans-Light.ttf"),
    "open-sans-italic": require("./assets/fonts/OpenSans-Italic.ttf"),
  });

  if (!loaded) {
    return <ActivityIndicator size="large" color={theme.colors.primary} />;
  }

  const onStartGame = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const handlerGameOver = (rounds) => {
    setGuessRounds(rounds);
  };

  const handlerRestartGame = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  let content = <StartGame onStartGame={onStartGame} />;

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userOptions={userNumber} onGameOver={handlerGameOver} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOver
        rounds={guessRounds}
        choise={userNumber}
        onRestart={handlerRestartGame}
      />
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header title="Adivina el número" />
        {content}
      </View>
    </SafeAreaView>
  );
}
