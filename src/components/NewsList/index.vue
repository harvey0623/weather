<template>
<li class="newsList">
   <p class="date">{{ createdate }}</p>
   <p class="title">
      <router-link :to="linkDetail()">{{ title }}</router-link>
   </p>
</li>
</template>

<script>
export default {
   props: {
      id: {
         type: Number,
         required: true
      },
      title: {
         type: String,
         required: true
      },
      createdate: {
         type: String,
         required: true
      },
      pageNumber: {
         type: Number,
         required: true
      }
   },
   methods: {
      linkDetail() {
         return {
            name: 'newsDetail',
            params: { id: this.id },
            query: { page: this.pageNumber }
         }
      }
   }
}
</script>

<style lang="scss">
.newsList {
   display: flex;
   align-items: center;
   padding: 12px;
   border-bottom: 1px dotted map-get($borderColor, list);
   @include elGutter(margin-bottom, 15px);
   >.date {
      padding: 5px 8px;
      color: map-get($fontColor, primary);
      background-color: map-get($elBgColor, menu);
      font-size: 14px;
      font-weight: bold;
   }
   >.title {
      flex: 1;
      padding-left: 40px;
      >a {
         &:hover {
            text-decoration: underline;
         }
      }
   }
}
</style>