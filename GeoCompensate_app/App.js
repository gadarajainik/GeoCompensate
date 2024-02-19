import React from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';
import {Button} from 'react-native-paper';

import {Colors} from 'react-native/Libraries/NewAppScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Button
        icon="camera"
        mode="outlined"
        onPress={() => console.log('Pressed')}>
        Press me
      </Button>
    </SafeAreaView>
  );
}

export default App;
