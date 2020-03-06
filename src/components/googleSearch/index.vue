<template>
<form 
   action="https://google.com/search" 
   method="get" 
   class="googleForm" 
   target="_blank">
   <input 
      type="text" 
      class="form-control" 
      name="q" 
      v-model="message" 
      placeholder="輸入關鍵字">
   <input 
      type="hidden" 
      name="sitesearch" 
      value="http://localhost:8080/#/"/>
   <button>搜尋</button>
</form>
</template>

<script>
export default {
   data: () => ({
      message: ''
   }),
}
</script>

<style lang="scss"></style>