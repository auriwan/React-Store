import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView, Alert} from 'react-native-safe-area-context';
import {Header, ProductCard} from '../../component';
import {useSelector} from 'react-redux';
import axios from 'axios';

const Home = () => {
  // const dummy = [
  //   {
  //     id: 1,
  //     title: 'Product Named',
  //     desc: 'Lorem',
  //     price: '3000',
  //     image: 'https://source.unsplash.com/1600x900/?shoes',
  //   },
  //   {
  //     id: 2,
  //     title: 'Product Named',
  //     desc: 'Lorem',
  //     price: '3000',
  //     image: 'https://source.unsplash.com/1600x900/?shoes',
  //   },
  //   {
  //     id: 3,
  //     title: 'Product Named',
  //     desc: 'Lorem',
  //     price: '3000',
  //     image: 'https://source.unsplash.com/1600x900/?shoes',
  //   },
  // ];

  const stateGlobal = useSelector(state => state);
  const [data, setData] = useState();

  const renderItem = ({item}) => (
    <ProductCard
      title={item.nama_barang}
      desc={item.deskripsi}
      price={item.harga}
      image={item.gambar}
    />
  );
  useEffect(() => {
    axios
      .get('http://api-test.q.camp404.com/public/api/material', {
        headers: {Authorization: `Bearer ${stateGlobal.access_token}`},
      })
      .then(response => {
        let res = response.data;
        setData(res.materials);
      })
      .catch(error => {
        Alert.alert(console.log(error).toString);
      });
  });

  return (
    <SafeAreaView style={styles.page}>
      <Header title={'Home'} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={<Text style={styles.label}>List Product</Text>}
        ListFooterComponent={<Text style={styles.footer} />}
        style={styles.container}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2f2e41',
    marginBottom: 16,
    marginTop: 16,
    marginLeft: 16,
  },
  footer: {
    height: 30,
  },
});
