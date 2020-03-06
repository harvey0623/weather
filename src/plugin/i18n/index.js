import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

const defaultLang = 'tw';
const langArr = ['tw', 'en'];
const currentLang = (function() {
   let userLang = localStorage.getItem('lang');
   return langArr.indexOf(userLang) !== -1 ? userLang : defaultLang;
})();

const i18n = new VueI18n({
   locale: currentLang,
   fallbackLocale: defaultLang,
   messages: {
      [currentLang]: require(`./locales/${currentLang}.json`)
   }
});

export default i18n;
export const langList = langArr;