import AsyncStorage from '@react-native-async-storage/async-storage';
import LocalizedStrings from 'react-native-localization';
import RNRestart from 'react-native-restart';
import {hindi} from './languages/hindi';
import {itailan} from './languages/italian';
import {english} from './languages/english';
import {marathi} from './languages/marathi';
import {Alert, I18nManager} from 'react-native';
import {arabic} from './languages/arabic';
// import {initializeRTL} from 'react-native-easy-localization-and-rtl';

let strings = new LocalizedStrings({
  en: english,
  it: itailan,
  hi: hindi,
  mrth: marathi,
  ar: arabic,
});

// initializeRTL(strings);

export default strings;

export const changeLanguage = async (lang, isRtl) => {
  strings.setLanguage(lang);
  let language = {
    lang: lang,
    isRtl: isRtl,
  };

  I18nManager.forceRTL(isRtl);
  // I18nManager.allowRTL(isRtl);

  await AsyncStorage.setItem('LANG', JSON.stringify(language)).then(() => {
    Alert.alert('Lokmart', 'Language changed !');
  });
  RNRestart.Restart();
};

export const getLang = async () => {
  let language = JSON.parse(await AsyncStorage.getItem('LANG'));
  console.log('language from async storage : ', language);
  if (language == null) {
    await AsyncStorage.setItem(
      'LANG',
      JSON.stringify({lang: 'en', isRtl: false}),
    );
    language = JSON.parse(await AsyncStorage.getItem('LANG'));
    console.log('when language NULL language from async storage : ', language);
  }
  strings.setLanguage(language.lang);
  return language;
};
