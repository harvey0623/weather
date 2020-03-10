import i18n from '@/plugin/i18n/index.js';
export default function() {
   return {
      home: {
         title: i18n.t('seo.home.title'),
         meta: [
            { property: 'og:title', content: i18n.t('seo.home.title') },
         ],
      },
      siteMap: {
         title: i18n.t('seo.siteMap.title'),
         meta: [
            { property: 'og:title', content: i18n.t('seo.siteMap.title') },
         ],
      },
      login: {
         title: i18n.t('seo.login.title'),
         meta: [
            { property: 'og:title', content: i18n.t('seo.login.title') },
         ],
      },
      userInfo: {
         title: i18n.t('seo.userInfo.title'),
         meta: [
            { property: 'og:title', content: i18n.t('seo.userInfo.title') },
         ],
      },
   }
}