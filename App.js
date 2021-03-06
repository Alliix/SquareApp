// U232. Sastādīt Android lietotni, kas realizē attēla veidošanu ar pseidografikas līdzekļiem.
// Attēla izmēram jābūt 21x21 simboli. Katra simbola vērtību ņem no 10 simbolu masīva.
// Simbola indeksu nosaka sin(p) vērtības k-tā cipara aiz komata vērtība,
// kur p – vietas pozīcija attēlā. Simbolu masīvu un k ievada lietotājs.
//
// Risinājuma autore Alīna Govoruhina ag18071 OOP_2021

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  TouchableHighlight,
  Dimensions,
  FlatList,
  Keyboard,
  ActivityIndicator,
} from 'react-native';

const App: () => Node = () => {
  const [charArray, setCharArray] = useState([]);
  const [k, setK] = useState(null);
  const [resultArray, setResultArray] = useState([]);
  let textInputK = null;
  let textInputArray = null;

  const handleKInputChange = text => {
    if (/^\d+$/.test(text)) {
      setK(text);
    } else setK(null);
  };

  const handleArrayInputChange = text => {
    const arr = text.split('');
    const filtered = arr.filter(symbol => symbol != ' ');
    filtered.length = 10;
    setCharArray(filtered);
  };

  const generateResultArray = (arr, k) => {
    Keyboard.dismiss();
    setResultArray([]);
    if (!k) {
      Alert.alert('Missing valid input K!');
      return;
    }
    if (arr.length < 10) {
      Alert.alert('Input array has less than 10 elements!');
      return;
    }
    let p = 0;
    var result = [];
    for (var i = 0; i < 21; i++) {
      for (var ii = 0; ii < 21; ii++) {
        const sine = Math.sin(p);
        const index = Math.trunc((sine * Math.pow(10, k)) % 10);
        if (index < 0) index = -index;
        if (arr[index]) result.push(arr[index]);
        else result.push(' ');
        // if (p < 6) {
        //   console.log(p, {
        //     sine: sine,
        //     calc: sine * Math.pow(10, k),
        //     index: index,
        //     symbol: arr[index],
        //   });
        // }
        p++;
      }
    }
    setResultArray(result);
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item}</Text>
      </View>
    );
  };

  const clearImage = () => {
    Keyboard.dismiss();
    setCharArray([]);
    setK(null);
    setResultArray([]);
    textInputK.clear();
    textInputArray.clear();
  };

  const Square = () => {
    if (resultArray.length != 0) {
      return (
        <View>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <FlatList
            data={resultArray}
            style={styles.container}
            renderItem={renderItem}
            numColumns={21}
            keyExtractor={(item, index) => index}
          />
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <View>
        <View style={styles.mainArea}>
          <Text style={styles.text}>Input an array of 10 characters:</Text>
          <TextInput
            style={styles.input}
            ref={input => {
              textInputArray = input;
            }}
            // maxLength={10}
            onChangeText={s => {
              handleArrayInputChange(s);
            }}
            placeholder={'10 characters'}></TextInput>
          <Text style={styles.text}>Input number k:</Text>
          <TextInput
            style={styles.input}
            ref={input => {
              textInputK = input;
            }}
            keyboardType="number-pad"
            onChangeText={handleKInputChange}
            placeholder={'A positive integer'}></TextInput>
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
          onPress={() => generateResultArray(charArray, k)}>
          <Text style={styles.buttonText}>Generate image</Text>
        </TouchableHighlight>
        <Square />
        <TouchableHighlight
          style={styles.button}
          onPress={() => clearImage(charArray, k)}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableHighlight>
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
    marginVertical: 5,
  },
  buttonText: {alignSelf: 'center', color: 'white', fontSize: 18},
  container: {
    marginVertical: 10,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: Dimensions.get('window').width / 21,
  },
  itemText: {
    color: '#4D243D',
  },
});

export default App;
