<template>
<div class="meeting">
   <ul class="meetingBox">
      <MeetingList 
         v-for="item in meetingSort"
         :key="item.url"
         :createdate="item.createdate"
         :id="item.id"
         :url="item.url"
      ></MeetingList>
   </ul>
</div>
</template>

<script>
import { mapState } from 'vuex';
import Meeting from '@/api/meeting.js';
import MeetingList from '@/components/MeetingList/index.vue'
export default {
   data: () => ({
      meetingList: []
   }),
   metaInfo() {
      return { title: this.seo.title, meta: this.seo.meta };
   },
   computed: {
      ...mapState("meta", { seo: state => state.metaInfo.meeting }),
      meetingSort() {
         let copyData = JSON.parse(JSON.stringify(this.meetingList));
         if (copyData.length === 0) return [];
         return copyData.sort((a ,b) => {
            return new Date(b.createdate).getTime() - new Date(a.createdate).getTime();
         });
      }
   },
   async mounted() {
      let { success, data } = await Meeting.getMeetingList().then(res => res.data);
      if (success) this.meetingList = data;
   },
   components: {
      MeetingList
   }
}
</script>

<style lang="scss">

</style>