<template>
<div class="login">
   <div class="loginMethod memberBox">
      <PageTitle title="氣象會員登入"></PageTitle>
      <BaseButton 
         @click.native="active = !active" 
         class="btnWeather" 
         text="氣象會員登入"
      ></BaseButton>
      <slide-up-down :active="active" @close-end="closeHandler">
         <ValidationObserver 
            tag="div" class="formLayout vertical" ref="form">
            <component
               v-for="(item, index) in loginField"
               :key="index"
               :is="item.componentName"
               :rules="item.rules"
               :fieldName="item.fieldName"
               :placeholder="item.placeholder"
               :fieldType="item.fieldType"
               v-model="item.value">
               <div class="formTitle">{{ item.fieldTitle }}</div>
            </component>
            <div class="formRow">
               <ValidationProvider 
                  rules="required"
                  v-slot="{ errors }"
                  tag="div">
                  <Recaptcha ref="recaptcha" :token.sync="token"></Recaptcha>
                  <input type="hidden" v-model="token">
                  <p 
                     class="validate-error" 
                     v-if="errors.length !== 0"
                  >{{ errors[0] }}</p>
               </ValidationProvider>
            </div>
            <BaseButton 
               class="btnWeather btnSubmit" 
               text="登入"
               @click.native="submitHandler"
            ></BaseButton>
         </ValidationObserver>
      </slide-up-down>
   </div>
   <div class="loginMethod otherBox">
      <PageTitle title="其他方式登入"></PageTitle>
      <BaseButton  
         class="btnFb" 
         text="Facebook會員登入"
         @click.native="loginHandler"
      ></BaseButton>
   </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import Recaptcha from '@/components/recaptcha/index.vue';

export default {
   data: () => ({
      token: '',
      active: false,
      loginField: [
         {
            componentName: 'TextInput',
            rules: 'required|email',
            fieldName: 'email',
            placeholder: '輸入郵件帳號',
            fieldType: 'text',
            fieldTitle: '郵件帳號',
            value: '',
         },
         {
            componentName: 'TextInput',
            rules: 'required|password',
            fieldName: 'password',
            placeholder: '輸入8~20字元密碼',
            fieldType: 'password',
            fieldTitle: '密碼',
            value: '',
         },
      ]
   }),
   metaInfo() {
      return { title: this.seo.title, meta: this.seo.meta }
   },
   computed: {
      ...mapState('meta', { seo: state => state.metaInfo.login }),
   },
   methods: {
      async submitHandler() {
         let isValid = await this.$refs.form.validate().then(res => res);
         if (!isValid) return;
         let formData = this.loginField.reduce((prev, current) => {
            prev[current.fieldName] = current.value;
            return prev;
         }, {});
        formData.token = this.token;
        console.log(formData);
      },
      closeHandler() {
         this.$refs.form.reset();
         this.loginField.forEach(field => field.value = '');
         this.$refs.recaptcha.reset();
      },
      async loginHandler() {
         let result = await this.$store.dispatch('auth/fbLogin').then(res => res);
         if (result) this.$router.push('/');
      }
   },
   components: {
      Recaptcha
   }
}
</script>

<style lang="scss" src="./index.scss"></style>