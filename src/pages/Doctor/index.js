import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {DummyDoctor1, DummyDoctor2, DummyDoctor3} from '../../assets';
import {
  DoctorCategory,
  Gap,
  HomeProfile,
  NewsItem,
  RatedDoctor,
} from '../../components';
import {Fire} from '../../config';
import {colors, fonts, getData, showError} from '../../utils';

const Doctor = ({navigation}) => {
  const [news, setNews] = React.useState([]);
  const [categoryDoctor, setCategoryDoctor] = React.useState([]);
  const [doctors, setDoctors] = React.useState([]);

  React.useEffect(() => {
    getCategoryDoctor();
    getTopRatedDoctors();
    getNews();
  }, []);

  const getCategoryDoctor = () => {
    Fire.database()
      .ref('category_doctor/')
      .once('value')
      .then((res) => {
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter((el) => el !== null);
          setCategoryDoctor(filterData);
        }
      })
      // Error
      .catch((err) => {
        showError(err.message);
      });
  };

  const getTopRatedDoctors = () => {
    Fire.database()
      .ref('doctors/')
      .orderByChild('rate')
      .limitToLast(3)
      .once('value')
      .then((res) => {
        if (res.val()) {
          const oldData = res.val();
          const data = [];
          Object.keys(oldData).map((key) => {
            data.push({
              id: key,
              data: oldData[key],
            });
          });

          setDoctors(data);
        }
      })
      // Error
      .catch((err) => {
        showError(err.message);
      });
  };

  const getNews = () => {
    Fire.database()
      .ref('news/')
      .once('value')
      .then((res) => {
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter((el) => el !== null);
          setNews(res.val());
        }
      })
      // Error
      .catch((err) => {
        showError(err.message);
      });
  };

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
              {categoryDoctor.map((item) => {
                return (
                  <DoctorCategory
                    key={item.id}
                    category={item.category}
                    onPress={() => navigation.navigate('ChooseDoctor', item)}
                  />
                );
              })}
              <Gap width={22} />
            </View>
          </ScrollView>
        </View>
        <View style={styles.wrapperSection}>
          <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
          {doctors.map((doctor) => {
            return (
              <RatedDoctor
                key={doctor.id}
                avatar={{uri: doctor.data.photo}}
                name={doctor.data.fullName}
                desc={doctor.data.profession}
                onPress={() => navigation.navigate('DoctorProfile', doctor)}
              />
            );
          })}
          <Text style={styles.sectionLabel}>Good News</Text>
        </View>
        {news.map((item) => {
          return (
            <NewsItem
              key={item.id}
              title={item.title}
              date={item.date}
              image={item.image}
            />
          );
        })}
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
