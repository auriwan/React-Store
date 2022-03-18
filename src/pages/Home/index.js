import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  Alert,
} from 'react-native';
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
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    onRefresh();
    return onRefresh();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setData();
    axios
      .get('http://api-test-q.camp404.com/public/api/material', {
        headers: {Authorization: `Bearer ${stateGlobal.access_token}`},
      })
      .then(response => {
        let res = response.data;
        setData(res.materials);
        setRefreshing(false);
      })
      .catch(error => {
        setRefreshing(false);
        Alert.alert(`Gagal Mendapatkan data ${error.toString()}`);
      });
  }, []);

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
