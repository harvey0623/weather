<template>
<div class="datasetContent">
   <div class="bookmarkBox">
      <Tablist 
         v-for="item in tabList"
         :key="item.id"
         :id="item.id"
         :title="item.title"
         :hasData="item.hasData"
         :currentId.sync="currentId"
      ></Tablist>
   </div>
   <DatasetTitle 
      v-if="datasetMeta !== null" 
      :title="datasetMeta.dataname"
   ></DatasetTitle>
   <DataCollect></DataCollect>
</div>
</template>

<script>
import { mapActions } from 'vuex';
import Tablist from '@/components/Tablist/index.vue';
import DatasetTitle from '@/components/DatasetTitle/index.vue';
import DataCollect from '@/components/DataCollect/index.vue';
export default {
   data: () => ({
      datasetMeta: null,
      datasetContent: null,
      currentId: 'collect',
      statusArr: { collect: true, preview: false },
      listArr: [
         { id: 'collect', title: '資料集' },
         { id: 'preview', title: '資料預覽' },
      ],
   }),
   computed: {
      tabList() {
         return this.listArr.reduce((prev, current) => {
            let obj = {};
            obj.hasData = this.statusArr[current.id];
            prev.push({ ...obj, ...current });
            return prev;
         }, []);
      }
   },
   methods: {
      ...mapActions('dataset', ['getDatasetMeta', 'getDatasetContent']),
      setPageTitle(text) {  //想不到方法,暫時先這樣寫
         document.querySelector('.pageTitle > p').textContent = text;
      },
      async getData() {
         let id = this.$route.params.id;
         this.datasetMeta = await this.getDatasetMeta({ id }).then(res => res);
         this.datasetContent = await this.getDatasetContent({ id }).then(res => res);
         this.setPageTitle(this.datasetMeta !== null ? this.datasetMeta.dataname : '');
         this.statusArr = {
            collect: this.datasetMeta !== null,
            preview: this.datasetContent !== null
         }
      }
   },
   created() {
      this.getData();
   },
   beforeDestroy() {
      this.setPageTitle('');
   },
   components: {
      DatasetTitle,
      Tablist,
      DataCollect
   }
}
</script>

<style lang="scss">
.datasetContent {
   padding-top: 15px;
}
</style>