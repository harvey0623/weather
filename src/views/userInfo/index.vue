<template>
<div class="userInfo">
   <div class="formLayout vertical">
      <component
         v-for="(item, index) in userField"
         :key="index"
         :is="item.componentName"
         :rules="item.rules"
         :fieldName="item.fieldName"
         :placeholder="item.placeholder"
         :fieldType="item.fieldType"
         :readonly="item.readonly"
         v-model="item.value">
         <div class="formTitle">{{ item.fieldTitle }}</div>
      </component>
   </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
   data: () => ({
      userField: [
         {
            componentName: 'TextInput',
            rules: '',
            fieldName: 'name',
            placeholder: '輸入姓名',
            fieldType: 'text',
            fieldTitle: '會員姓名',
            readonly: true,
            value: '',
         },
         {
            componentName: 'TextInput',
            rules: '',
            fieldName: 'email',
            placeholder: '輸入電子信箱',
            fieldType: 'email',
            fieldTitle: '電子信箱',
            readonly: true,
            value: '',
         }
      ],
   }),
   metaInfo() {
      return { title: this.seo.title, meta: this.seo.meta }
   },
   computed: {
      ...mapState('meta', { seo: state => state.metaInfo.userInfo }),
      ...mapState('auth', ['fbUser']),
      pickData() {
         let keyArr = ['name', 'email'];
         return keyArr.reduce((prev, current) => {
            prev[current] = this.fbUser[current];
            return prev;
         }, {});
      }
   },
   created() {
      this.userField.forEach(user => {
         user.value = this.pickData[user.fieldName];
      });
   },
}
</script>

