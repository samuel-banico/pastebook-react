import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const EditAlbum = () => {
    const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  
  return (
    <View>
      <Text>EditAlbum</Text>
      <TouchableOpacity onPress={pickImage}>
                <Image
                    resizeMode='contain'
                    style={styles.img}
                    source={require('../../assets/img/add_image.png')}/>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  )
}

export default EditAlbum

const styles = StyleSheet.create({})