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
   <transition name="fade" mode="out-in">
      <div
         class="collectBox" 
         v-if="currentId === 'collect'" 
         :key="'collect'">
         <DatasetTitle 
            v-if="metaNotEmpty" 
            :title="datasetMeta.dataname"
         ></DatasetTitle>
         <DataCollect
            v-if="metaNotEmpty" 
            :datasetMeta="datasetMeta"
         ></DataCollect>
      </div>
      <div class="previewBox" v-else :key="'preview'">
         <DataPreview 
            v-if="contentNotEmpty"
            :fields="datasetContent.result.fields"
            :location="datasetContent.records.location[0]"
         ></DataPreview>
      </div>
   </transition>
   <BackBox :backPath="backPath"></BackBox>
</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Tablist from '@/components/Tablist/index.vue';
import DatasetTitle from '@/components/DatasetTitle/index.vue';
import DataCollect from '@/components/DataCollect/index.vue';
import DataPreview from '@/components/DataPreview/index.vue';
import BackBox from '@/components/BackBox/index.vue';
export default {
   data: () => ({
      datasetMeta: {},
      datasetContent: {},
      currentId: 'collect',
      statusArr: { collect: false, preview: false },
      listArr: [
         { id: 'collect', title: '資料集' },
         { id: 'preview', title: '資料預覽' },
      ],
   }),
   computed: {
      ...mapState('dataset', ['pageNumber']),
      ...mapGetters('dataset', ['pageName']),
      tabList() {
         return this.listArr.reduce((prev, current) => {
            let obj = {};
            obj.hasData = this.statusArr[current.id];
            prev.push({ ...obj, ...current });
            return prev;
         }, []);
      },
      metaNotEmpty() {
         return Object.entries(this.datasetMeta).length !== 0;
      },
      contentNotEmpty() {
         return Object.entries(this.datasetContent).length !== 0;
      },
      routeName() {
         return this.$route.name;
      },
      backPath() {
         let pageName = this.pageName;
         return {
            name: pageName !== '' ? pageName : this.routeName.replace('Content', ''),
            query: { page: this.pageNumber }
         }
      }
   },
   methods: {
      ...mapActions('dataset', ['getDatasetMeta', 'getDatasetContent']),
      setPageTitle(text) {  //想不到方法,暫時先這樣寫
         document.querySelector('.pageTitle > p').textContent = text;
      },
      async getData() {
         let id = this.$route.params.id;
         this.datasetMeta = await this.getDatasetMeta({ id }).then(res => res) || {};
         this.datasetContent = await this.getDatasetContent({ id }).then(res => res) || {};
         this.setPageTitle(this.metaNotEmpty ? this.datasetMeta.dataname : '');
         this.statusArr = {
            collect: this.metaNotEmpty,
            preview: this.contentNotEmpty
         }
      }
   },
   created() {
      this.getData();
   },
   watch: {
      $route(to, name) {
         this.getData();
      }
   },
   beforeDestroy() {
      this.setPageTitle('');
   },
   components: {
      DatasetTitle,
      Tablist,
      DataCollect,
      DataPreview,
      BackBox
   }
}
</script>

<style lang="scss">
.datasetContent {
   padding-top: 15px;
}
</style>