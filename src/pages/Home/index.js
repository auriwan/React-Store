import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header, ProductCard} from '../../component';

const Home = () => {
  const dummy = [
    {
      id: 1,
      title: 'Product Named',
      desc: 'Lorem',
      price: '3000',
      image: 'https://source.unsplash.com/1600x900/?shoes',
    },
    {
      id: 2,
      title: 'Product Named',
      desc: 'Lorem',
      price: '3000',
      image: 'https://source.unsplash.com/1600x900/?shoes',
    },
    {
      id: 3,
      title: 'Product Named',
      desc: 'Lorem',
      price: '3000',
      image: 'https://source.unsplash.com/1600x900/?shoes',
    },
  ];

  const renderItem = ({item}) => (
    <ProductCard
      title={item.title}
      desc={item.desc}
      price={item.price}
      image={item.image}
    />
  );

  return (
    <SafeAreaView style={styles.page}>
      <Header title={'Home'} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dummy}
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
