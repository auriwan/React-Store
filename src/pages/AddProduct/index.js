import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {Header} from '../../component';
import Images from '../../assets';
import * as ImagePicker from 'react-native-image-picker';

const AddProduct = ({navigation}) => {
  const [image, setImage] = useState();
  const upload = () => {
    //open Image Library
    ImagePicker.launchImageLibrary(
      {mediaType: 'photo', quality: 1},
      response => {
        if (response.didCancel || response.error) {
          Alert.alert('Oops Batal Memilih photo');
        } else {
          setImage(response);
        }
      },
    );
  };

  return (
    <SafeAreaView style={styles.page}>
      <Header title={'Add Product'} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Product Name</Text>
        <TextInput style={styles.textInput} />
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.textArea}
          numberOfLines={3}
          multiline
          textAlignVertical="top"
        />
        <Text style={styles.label}>Price</Text>
        <TextInput style={styles.textInput} />
        <Text style={styles.label}>Photo</Text>
        <TouchableOpacity style={styles.uploadImage} onPress={() => upload()}>
          {image?.assets ? (
            <Image
              source={{uri: image?.assets[0].uri}}
              resizeMode={'cover'}
              style={styles.previewImage}
            />
          ) : (
            <Image source={Images.ICPlus} style={styles.plusIcon} />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSave}>
          <Text style={styles.btnSaveText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddProduct;

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
    color: '#2f2e41',
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
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 16,
    borderColor: '#c4c4c4',
    paddingHorizontal: 8,
  },
  uploadImage: {
    width: 100,
    height: 100,
    backgroundColor: '#c4c4c4',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    width: 40,
    height: 40,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 6,
  },
  btnSave: {
    width: 100,
    height: 45,
    backgroundColor: '#1f8597',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 32,
  },
  btnSaveText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
