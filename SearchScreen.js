// Search transaction and flat list
// Search transaction and flat list
// Search transaction and flat list
// Search transaction and flat list
// Search transaction and flat list
// Search transaction and flat list
// Search transaction and flat list
// Search transaction and flat list
// Search transaction and flat list
// Search transaction and flat list
// Search transaction and flat list
// Search transaction and flat list
// Search transaction and flat list
// Search transaction and flat list
// Search transaction and flat list
// Search transaction and flat list


import React from 'react';
import { Text, View } from 'react-native';
import config from '../config';
import db from '../config';

export default class Searchscreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      allTransactions:[],
      search:'',
      lastVisibleTransaction:null,
    }
  }
  fetchMoreTransactions = async()=>{
    var text = this.state.search;
    var enteredText = text.split("");

    if(enteredText[0].toUpperCase()===B){
      const query = await db.collection("transactions").where('bookId','==',text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
      query.docs.map((doc)=>{
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc
        })
      })
    }else if(enteredText[0].toUpperCase()===S){
      const query = await db.collection("transactions").where('studentId','==',text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
      query.docs.map((doc)=>{
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc
        })
      })
    }
  }
  componentDidMount = async()=>{
    const query = await db.collection('transactions').get()
    query.docs.map((doc)=>{
      this.setState({
        allTransactions:[...this.state.allTransactions,doc.data()]
      })
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
      <TextInput 
        style ={styles.bar}
        placeholder = "Enter Book Id or Student Id"
        onChangeText={(text)=>{this.setState({search:text})}}/>
        <TouchableOpacity
          style = {styles.searchButton}
          onPress={()=>{this.searchTransactions(this.state.search)}}
        >
          <Text>Search</Text>
        </TouchableOpacity>
        </View>
       
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  searchBar:{
    flexDirection:'row',
    height:40,
    width:'auto',
    borderWidth:0.5,
    alignItems:'center',
    backgroundColor:'grey',

  },
  bar:{
    borderWidth:2,
    height:30,
    width:300,
    paddingLeft:10,
  },
  searchButton:{
    borderWidth:1,
    height:30,
    width:50,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'green'
  }
})




