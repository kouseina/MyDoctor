import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IconAddPhoto, IconRemovePhoto, ILNullPhoto} from '../../assets';
import {Button, Gap, Header, Link} from '../../components';
import {colors, fonts, storeData} from '../../utils';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import {Fire} from '../../config';

const UploadPhoto = ({navigation, route}) => {
  const {fullName, profession, uid} = route.params;
  const [hasPhoto, setHasPhoto] = React.useState(false);
  const [photo, setPhoto] = React.useState(ILNullPhoto);
  const [photoForDB, setPhotoForDB] = React.useState('');

  const getImage = () => {
    const options = {
      includeBase64: true,
      quality: 0.5,
      maxWidth: 200,
      maxHeight: 200,
    };

    launchImageLibrary(options, (res) => {
      console.log('response: ', res);

      if (res.didCancel) {
        showMessage({
          message: 'Oops, sepertinya anda tidak memilih foto nya?',
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
      } else if (res.error) {
        showMessage({
          message: res.errorMessage,
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
      } else {
        setPhotoForDB(`data:${res.type};base64, ${res.base64}`);
        // console.log('response image: ', res.base64);
        const source = {uri: res.uri};

        setPhoto(source);
        setHasPhoto(true);
      }
    });
  };

  const uploadAndContinue = () => {
    Fire.database()
      .ref(`users/${uid}/`)
      .update({photo: photoForDB})
      .then(() => {
        const data = route.params;
        data.photo = photoForDB;

        storeData('user', data).then(() => {
          navigation.replace('MainApp');
        });
      })

      // Error
      .catch((error) => {
        showMessage({
          message: error.errorMessage,
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
      });
  };

  return (
    <View style={styles.pages}>
      <Header title="Upload Photo" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={getImage}>
            <Image source={photo} style={styles.avatar} />
            {hasPhoto && <IconRemovePhoto style={styles.addPhoto} />}
            {!hasPhoto && <IconAddPhoto style={styles.addPhoto} />}
          </TouchableOpacity>
          <Gap height={24} />
          <Text style={styles.name}>{fullName}</Text>
          <Gap height={4} />
          <Text style={styles.profession}>{profession}</Text>
        </View>
        <View>
          <Button
            disable={!hasPhoto}
            title="Upload and Continue"
            onPress={uploadAndContinue}
          />
          <Gap height={30} />
          <Link
            title="Skip for this"
            align="center"
            size={16}
            onPress={() => navigation.replace('MainApp')}
          />
        </View>
      </View>
    </View>
  );
};

export default UploadPhoto;

const styles = StyleSheet.create({
  pages: {backgroundColor: colors.white, flex: 1},
  content: {
    paddingHorizontal: 40,
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 64,
  },
  profile: {alignItems: 'center', flex: 1, justifyContent: 'center'},
  avatar: {width: 110, height: 110, borderRadius: 110 / 2},
  avatarWrapper: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 130 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhoto: {position: 'absolute', right: 6, bottom: 8},
  name: {
    fontSize: 24,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
  },
  profession: {
    fontSize: 18,
    fontFamily: fonts.primary.normal,
    textAlign: 'center',
    color: colors.text.secondary,
  },
});
