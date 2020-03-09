<template>
<div class="login">
   <div class="loginMethod memberBox">
      <PageTitle title="氣象會員登入"></PageTitle>
      <BaseButton class="btnWeather" text="氣象會員登入"></BaseButton>
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
               <Recaptcha ref="ecaptcha" :token.sync="token"></Recaptcha>
               <input type="hidden" v-model="token">
               <p 
                  class="validate-error" 
                  v-if="errors.length !== 0"
               >{{ errors[0] }}</p>
            </ValidationProvider>
         </div>
         <BaseButton 
            class="btnWeather btnSubmit" 
            text="氣象會員登入"
            @click.native="submitHandler"
         ></BaseButton>
      </ValidationObserver>
   </div>
   <div class="loginMethod otherBox">
      <PageTitle title="其他方式登入"></PageTitle>
      <BaseButton class="btnFb" text="Facebook會員登入"></BaseButton>
   </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import Recaptcha from '@/components/recaptcha/index.vue';
export default {
   data: () => ({
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
      ],
      token: ''
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
         console.log(isValid);

      },
   },
   mounted() {
      
   },
   components: {
      Recaptcha
   }
}
</script>

<style lang="scss" src="./index.scss"></style>