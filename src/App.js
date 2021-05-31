import React from 'react';
import {GetStarted, Splash} from './pages';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import FlashMessage from 'react-native-flash-message';
import {Loading} from './components';
import {Provider, useSelector} from 'react-redux';
import store from './redux/store';
import {LogBox} from 'react-native';

const MainApp = () => {
  const globalState = useSelector((state) => state);
  LogBox.ignoreLogs(['Setting a timer']);

  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {globalState.loading && <Loading />}
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
