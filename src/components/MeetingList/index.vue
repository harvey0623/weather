<template>
<li class="meetingList">
   <p class="date">{{ createdate }}</p>
   <div class="title">
      <p @click="active = !active">{{ title }}</p>
      <slide-up-down 
         :active="active" 
         :duration="300" 
         class="slideBox">
         <a :href="`https://opendata.cwb.gov.tw${url}`">
            <i class="fas fa-download"></i>
            <span>下載會議記錄</span>
         </a>
      </slide-up-down>
   </div>
</li>
</template>

<script>
export default {
   props: {
      createdate: {
         type: String,
         required: true
      },
      id: {
         type: String,
         required: true
      },
      url: {
         type: String,
         required: true
      },
   },
   data: () => ({
      active: false
   }),
   computed: {
      title() {
         return `108年度交通部中央氣象局政府資料開放諮詢小組第${this.id}次會議紀錄`;
      }
   }
}
</script>

<style lang="scss">
$meetColor: map-get($fontColor, primary);

.meetingList {
   display: flex;
   align-items: flex-start;
   padding: 12px;
   border-bottom: 1px dotted map-get($borderColor, list);
   @include elGutter(margin-bottom, 15px);
   >.date {
      padding: 5px 8px;
      color: $meetColor;
      background-color: map-get($elBgColor, menu);
      font-size: 14px;
      font-weight: bold;
   }
   >.title {
      flex: 1;
      padding-left: 40px;
      padding-top: 3px;
      >p {
         &:hover {
            text-decoration: underline;
            cursor: pointer;
         }
      }
   }
}
.slideBox {
   >a {
      padding-top: 12px;
      font-size: 14px;
      color: $meetColor;
      &:hover {
         text-decoration: underline;
         color: darken($meetColor, 8%);
         >span {
            text-decoration: underline;
         }
      }
   }
}

</style>