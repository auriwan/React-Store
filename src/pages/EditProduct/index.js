import React, {useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Header} from '../../component';
import Images from '../../assets';
import * as ImagePicker from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import axios from 'axios';
import QueryString from 'query-string';

const EditProduct = ({navigation, route}) => {
  const [image, setImage] = useState();
  const stateGlobal = useSelector(state => state);
  const [img, setImg] = useState(route?.params?.image);
  const [productName, setProductName] = useState(route?.params?.title);
  const [Desc, setDesc] = useState(route?.params?.desc);
  const [Price, setPrice] = useState(route?.params?.price);

  const upload = () => {
    //open Library
    ImagePicker.launchImageLibrary(
      {mediaType: 'photo', quality: 0.5, includeBase64: true},
      response => {
        if (response.didCancel || response.error) {
          Alert.alert('Oops Batal Memilih photo');
        } else {
          if (response?.assets[0]?.fileSize < 1000000) {
            setImage(response);
            setImg(response);
          } else {
            Alert.alert('Ukuran Product tidak boleh lebih dari 500kb');
          }
        }
      },
    );
  };

  const update = async () => {
    if (
      (productName === '' || productName === route?.params?.title) &&
      (Desc === '' || Desc === route?.params?.desc) &&
      (Price === '' || Price === route?.params?.price) &&
      image === undefined
    ) {
      Alert.alert('Peringatan', 'Data Isian Tidak Boleh Kosong');
      return false;
    }

    const url = `http://api-test.q.camp404.com/public/api/material/${route?.params?.id}`;

    const data = QueryString.stringify({
      nama_barang: productName,
      deskripsi: Desc,
      harga: Price,
      gambar: image ? `data:image/jpg:base64,${image?.assets[0]?.base64}` : img,
    });

    await axios({
      method: 'PATCH',
      url: url,
      headers: {
        Authorization: `Bearer ${stateGlobal.access_token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    })
      .then(response => {
        Alert.alert('Berhasil Diubah');
        navigation.goBack();
      })
      .catch(error => {
        console.error(error.response.data);
        Alert.alert('Gagal diubah');
      });
  };

  return (
    <SafeAreaView style={styles.page}>
      <Header title={'Edit Product'} />
      <ScrollView
        style={styles.container}
        showsHorizontalScrollIndicator={false}>
        <Text style={styles.label}>Product Name</Text>
        <TextInput
          style={styles.textInput}
          value={productName}
          onChangeText={setProductName}
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.textArea}
          numberOfLines={3}
          multiline
          value={Desc}
          onChangeText={setDesc}
          textAlignVertical={'top'}
        />
        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.textInput}
          value={Price.toString()}
          onChangeText={setPrice}
        />
        <Text style={styles.label}>Photo</Text>
        <TouchableOpacity style={styles.uploadImage} onPress={() => upload()}>
          {img || image ? (
            <Image
              source={{uri: image?.assets[0]?.uri || img}}
              resizeMode={'cover'}
              style={styles.previewImage}
            />
          ) : (
            <Image source={Images.ICPlus} style={styles.plushIcon} />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnUpdate} onPress={() => update()}>
          <Text style={styles.btnUpdateText}>Update</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProduct;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F2E41',
    marginBottom: 8,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#c4c4c4',
    borderRadius: 6,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  textArea: {
    height: 80,
    borderWidth: 1,
    borderColor: '#c4c4c4',
    borderRadius: 6,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  uploadImage: {
    width: 100,
    height: 100,
    backgroundColor: '#C4C4C4',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plushIcon: {
    width: 40,
    height: 40,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 6,
  },
  btnUpdate: {
    height: 45,
    width: '100%',
    backgroundColor: '#1F8597',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 32,
  },
  btnUpdateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
