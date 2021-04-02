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
  Dimensions,
  FlatList,
  Keyboard,
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
  const [k, setK] = useState(null);
  const [resultArray, setResultArray] = useState([]);

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
    Keyboard.dismiss();
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
        // if(p<5){
        //   console.log(p, sine, sine * Math.pow(10, k), index, arr[index])
        // }
        p++;
      }
    }
    setResultArray(result);
  };

  const formatData = data => {
    let numberOfElementsLastRow = 21;
    while (numberOfElementsLastRow !== 21 && numberOfElementsLastRow !== 0) {
      data.push({key: `blank-${numberOfElementsLastRow}`});
      numberOfElementsLastRow++;
    }
    return data;
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <View>
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
          <Text style={styles.buttonText}>Generate image</Text>
        </TouchableHighlight>
        <FlatList
          data={formatData(resultArray)}
          style={styles.container}
          renderItem={renderItem}
          numColumns={21}
          keyExtractor={(item, index) => index}
        />
      </View>
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
    padding: 10,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
  smallerText: {
    fontSize: 18,
  },
  button: {
    backgroundColor: '#4D243D',
    borderRadius: 5,
    marginHorizontal: 20,
    height: 35,
    alignContent: 'center',
    justifyContent: 'center',
  },
  buttonText: {alignSelf: 'center', color: 'white', fontSize: 18},
  generatedImage: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    color: 'green',
  },
  container: {
    marginVertical: 10,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: Dimensions.get('window').width / 21, // approximate a square
  },
  itemText: {
    color: '#4D243D',
  },
});

export default App;
