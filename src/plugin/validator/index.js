import { ValidationObserver , ValidationProvider, extend, setInteractionMode } from 'vee-validate';
import { required, email, confirmed, size, ext } from 'vee-validate/dist/rules';
import checkTwId from './checkTwId.js';
import i18n from '@/plugin/i18n/index.js';

export default {
   install(Vue, options) {
      Vue.component('ValidationObserver', ValidationObserver);
      Vue.component('ValidationProvider', ValidationProvider);
      setInteractionMode('eager');

      extend('required', {
         ...required,
         message: i18n.t('validate.required')
      });

      extend('email', {
         ...email,
         message: i18n.t('validate.email')
      });

      extend('mobile', {
         message: i18n.t('validate.mobile'),
         validate: value => value.length === 10 && /^09\d{8}$/.test(value)
      });

      extend('password', {
         message: i18n.t('validate.password'),
         validate(value) {
            let valueLength = value.length;
            return valueLength >= 8 && valueLength <= 20;
         }
      });

      extend('samePw', {
         ...confirmed,
         message: i18n.t('validate.pwNotEqual')
      });

      extend('twId', {
         message: i18n.t('validate.taiwanId'),
         validate: value => checkTwId(value)
      });

      extend('imageType', {
         ...ext,
         message: i18n.t('validate.imageType'),
      });

      extend('avatarSize', {
         ...size,
         message: i18n.t('validate.fileSize'),
      });

   }
}