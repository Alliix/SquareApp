import React, {useState, useRef} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button,
  Alert,
  TouchableHighlight,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => Node = () => {
  const [charArray, setCharArray] = useState([]);
  const [inputString, setInputString] = useState('');
  const [renderedImage, setRenderedImage] = useState([]);
  const [k, setK] = useState(null);

  const handleKInputChange = text => {
    if (/^\d+$/.test(text)) {
      setK(text);
    }
  };

  const handleArrayInputChange = text => {
    if (true) {
      const arr = text.split('');
      setCharArray(arr);
    }
  };

  const generateImage = (arr, k) => {
    let p = 0;
    var result = '';
    for (var i = 0; i <= 21; i++) {
      for (var ii = 0; ii <= 21; ii++) {
        const sine = Math.sin(p);
        const index =
          parseInt((sine * Math.pow(10, k)) % 10) < 0
            ? parseInt((sine * Math.pow(10, k)) % 10) * -1
            : parseInt((sine * Math.pow(10, k)) % 10);
        if (arr[index]) result = result + arr[index];
        else result = result + '*';
        p++;
      }
    }
    renderImage(result);
  };

  const renderImage = str => {
    let renderedRows = [];
    var i = 0;
    var rows = 0;
    while (rows <= 21) {
      renderedRows.push(
        <Text key={i}>
          <Text>({rows})</Text>
          <Text
            style={{
              textAlign: 'center',
              color: 'green',
            }}>
            {str.substring(i, i + 21)}
            {'\n'}
          </Text>
        </Text>,
      );
      i = i + 22;
      rows++;
    }
    setRenderedImage(renderedRows);
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.mainArea}>
          <Text style={styles.text}>Input an array of 10 characters:</Text>
          <TextInput
            style={styles.input}
            maxLength={10}
            onChangeText={s => {
              handleArrayInputChange(s);
            }}></TextInput>
          <Text style={styles.text}>Input number k:</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            onChangeText={handleKInputChange}></TextInput>
          <View style={{height: 10}}></View>
          <Text style={styles.smallerText}>
            Array:{' '}
            {charArray.map((c, i) => {
              if (i < 9) {
                return c + ', ';
              } else {
                return c + '!!!';
              }
            })}
          </Text>
          <Text style={styles.smallerText}>K: {k}</Text>
        </View>
        <TouchableHighlight
          style={styles.button}
          onPress={() => generateImage(charArray, k)}>
          <Text style={{alignSelf: 'center'}}>Generate image</Text>
        </TouchableHighlight>
        <Text>{renderedImage}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    padding: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  mainArea: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
  smallerText: {
    fontSize: 18,
  },
  button: {
    backgroundColor: '#f194ff',
    elevation: 8,
    borderRadius: 5,
    marginHorizontal: 20,
    height: 35,
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  generatedImage: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    color: 'green',
  },
});

export default App;
