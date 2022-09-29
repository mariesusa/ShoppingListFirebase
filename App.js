import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { initializeApp } from'firebase/app';
import { getDatabase, push, ref, onValue, remove } from'firebase/database';

//import { initializeApp } from "firebase/app";

export default function App() {

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAP_5c4r4OoTEr8RMbH5-8mxsZ98cMaEt0",
  authDomain: "mobileprogrammingshoppin-ae73a.firebaseapp.com",
  databaseURL: "https://mobileprogrammingshoppin-ae73a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mobileprogrammingshoppin-ae73a",
  storageBucket: "mobileprogrammingshoppin-ae73a.appspot.com",
  messagingSenderId: "102492574472",
  appId: "1:102492574472:web:d3f9cbfc52a514be5512bd",
  measurementId: "G-0QCXZ9LLFW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
//const analytics = getAnalytics(app);

const [product, setProduct] = useState('');
const [amount, setAmount] = useState('');
const [items, setItems] = useState([]);

const saveProduct = () => {
  push(
    ref(database, 'items/'),
    { 'product': product, 'amount': amount }
  );
}

useEffect(() => {
  const itemsRef = ref(database, 'items/');
  onValue(itemsRef, (snapshot) => {
    const data = snapshot.val();
    setItems(Object.values(data));
    console.log((Object.values(data)))
  })
}, []);

const deleteProduct = (item) => {
  remove(
    ref(database, 'items/' + item.Key),
  )
}

const listSeparator = () => {
  return(
    <View
      style={{
        height: 5,
        width: '80%',
        backgroundColor: '#fff',
        marginLeft: '10%'
      }}
    />
  );
};

  return (
    <View style={styles.container}>
      
      <TextInput
        style={ styles.input }
        keyboardType='default'
        onChangeText={ product => setProduct(product) }
        value={ product }
        placeholder='Product'
      />

      <TextInput
        style={ styles.input }
        keyboardType='default'
        onChangeText={ amount => setAmount(amount) }
        value={ amount }
        placeholder='Amount'
      />

      <View style={ styles.button }>
        <Button title='SAVE'
          onPress={ saveProduct } 
        />
      </View>

      <Text style={{ fontSize: 18, marginTop: 3 }}>
        Shopping list
      </Text>

      <FlatList
        style={ styles.list }
        keyExtractor={ item => item.Key }
        renderItem={ ({ item }) => 
        <View style={ styles.listcontainer }>
          <Text>
            { item.product }
            <Text>, </Text>
            { item.amount }
          </Text>
          <Text style={{ color: '#0000ff' }} 
            onPress={() => deleteProduct(item.Key)}> Bought</Text>
            </View>}
      data={ items }
      ItemSeparatorComponent={ listSeparator }
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 20
  },
  input : {
    width: '80%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 3,
    marginTop: 3,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
button : {
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'lightblue',
    margin: 5,
    borderColor: 'black',
    borderWidth: 1,
    width: '20%',
    height: 40
  },
text : {
    color: 'black',
    fontSize: 20,
    marginBottom: 4,
  },
list : {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20
  },
listcontainer : {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
},
});
