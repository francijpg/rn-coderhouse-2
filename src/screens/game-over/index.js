import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, Dimensions } from "react-native";
import { styles } from "./styles";

import { Card } from "../../components/index";
import theme from "../../constants/theme";

const GameOver = ({ rounds, choise, onRestart }) => {
  const [isPortrait, setIsPortrait] = useState(true);

  const onPortrait = () => {
    const dim = Dimensions.get("screen");
    return dim.height >= dim.width;
  };

  const statePortrait = () => setIsPortrait(onPortrait());

  useEffect(() => {
    Dimensions.addEventListener("change", statePortrait);
  });

  return (
    <View style={isPortrait ? styles.container : styles.containerLandscape}>
      <Image
        style={isPortrait ? styles.image : styles.imageLandscape}
        source={{
          uri: "https://images.pexels.com/photos/4835429/pexels-photo-4835429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        }}
      />
      <Card style={styles.resultContainer}>
        <Text>Intentos: {rounds}</Text>
        <Text>El número era: {choise}</Text>
      </Card>
      <Button title="Reiniciar" onPress={onRestart} color={theme.primary} />
    </View>
  );
};

export default GameOver;
