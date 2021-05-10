import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Button} from '../..';
import {DummyDoctor3} from '../../../assets';
import {colors, fonts} from '../../../utils';

const DarkProfile = ({onPress}) => {
  return (
    <View style={styles.container}>
      <Button type="icon-only" icon="back-light" onPress={onPress} />
      <View style={styles.content}>
        <Text style={styles.name}>Nairobi Putri Hayza</Text>
        <Text style={styles.desc}>Dokter Anak</Text>
      </View>
      <Image source={DummyDoctor3} style={styles.avatar} />
    </View>
  );
};

export default DarkProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    paddingVertical: 30,
    paddingLeft: 20,
    paddingRight: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {flex: 1, alignItems: 'center'},
  avatar: {height: 46, width: 46, borderRadius: 46 / 2},
  name: {fontSize: 20, fontFamily: fonts.primary[600], color: colors.white},
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.text.subTitle,
    marginTop: 6,
  },
});
