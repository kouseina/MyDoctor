import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  DummyDoctor1,
  DummyDoctor2,
  DummyDoctor3,
  JSONCategoryDoctor,
} from '../../assets';
import {
  DoctorCategory,
  Gap,
  HomeProfile,
  NewsItem,
  RatedDoctor,
} from '../../components';
import {colors, fonts, getData} from '../../utils';

const Doctor = ({navigation}) => {
  React.useEffect(() => {
    getData('user').then((res) => {
      console.log('user: ', res);
    });
  }, []);

  return (
    <View style={styles.page}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.wrapperSection}>
          <Gap height={30} />
          <HomeProfile onPress={() => navigation.navigate('UserProfile')} />
          <Text style={styles.welcome}>
            Mau konsultasi dengan siapa hari ini?
          </Text>
        </View>
        <View style={styles.wrapperScroll}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.category}>
              <Gap width={32} />
              {JSONCategoryDoctor.data.map((item) => {
                return (
                  <DoctorCategory
                    key={item.id}
                    category={item.category}
                    onPress={() => navigation.navigate('ChooseDoctor')}
                  />
                );
              })}
              <Gap width={22} />
            </View>
          </ScrollView>
        </View>
        <View style={styles.wrapperSection}>
          <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
          <RatedDoctor
            avatar={DummyDoctor1}
            name="Alexa Rachel"
            desc="Podiatrist"
            onPress={() => navigation.navigate('DoctorProfile')}
          />
          <RatedDoctor
            avatar={DummyDoctor2}
            name="Sunny Frank"
            desc="Dentist"
            onPress={() => navigation.navigate('DoctorProfile')}
          />
          <RatedDoctor
            avatar={DummyDoctor3}
            name="Poe Minn"
            desc="Pediatrician"
            onPress={() => navigation.navigate('DoctorProfile')}
          />
          <Text style={styles.sectionLabel}>Good News</Text>
        </View>
        <NewsItem />
        <NewsItem />
        <NewsItem />
        <Gap height={30} />
      </ScrollView>
    </View>
  );
};

export default Doctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  wrapperSection: {
    paddingHorizontal: 16,
  },
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 209,
  },
  category: {
    flexDirection: 'row',
  },
  wrapperScroll: {
    marginHorizontal: -16,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
});
