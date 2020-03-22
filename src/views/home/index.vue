<template>
<div class="home">
   <DefaultHeader :isDefault="true"></DefaultHeader>
   <section>
      <div class="homeCenter mycontainer">
         <div class="visitCount">
            訪客人次 {{ homeData.visitCount | currency }} 人
         </div>
         <div class="statistics">{{ statisticData }}</div>
         <div class="categoryBox">
            <CategoryList
               v-for="item in categoryData"
               :key="item.id"
               :id="item.id"
               :title="item.title"
               :count="item.value"
               :imgUrl="item.imgUrl"
            ></CategoryList>
         </div>
      </div>
   </section>
</div>
</template>

<script>
import { mapState } from 'vuex';
import DefaultHeader from '@/components/Header/index.vue';
import Home from '@/api/home.js';
import currency from '@/filter/currency.js';
import CategoryList from '@/components/CategoryList/index.vue';
export default {
   metaInfo() {
      return { title: this.seo.title, meta: this.seo.meta }
   },
   data: () => ({
      homeData: {
         visitCount: 0,
         datasetSizeByType: {},
         statisticSum: {
            statisticAll: 0 ,
            statisticDays: 0
         }
      },
      mappingList: [
         { id: 'F', title: '預報', imgUrl: '/img/home/forecast.svg', value: 0 },
         { id: 'O', title: '觀測', imgUrl: '/img/home/observe.svg', value: 0  },
         { id: 'E', title: '地震海嘯', imgUrl: '/img/home/tsunami.svg', value: 0  },
         { id: 'C', title: '氣候', imgUrl: '/img/home/climate.svg', value: 0  },
         { id: 'W', title: '天氣警特報', imgUrl: '/img/home/icon2.svg', value: 0  },
         { id: 'M', title: '數值預報', imgUrl: '/img/home/number-forecast.svg', value: 0  },
         { id: 'A', title: '天文', imgUrl: '/img/home/astronomy.png', value: 0  }
      ]
   }),
   computed: {
      ...mapState('meta', { seo: state => state.metaInfo.home }),
      statisticData() {
         let { statisticAll, statisticDays } = this.homeData.statisticSum;
         return `總下載次數 ${currency(statisticAll)} 
            最近一個月下載次數 ${currency(statisticDays)}`;
      },
      categoryData() {
         let { datasetSizeByType } = this.homeData;
         let keyLength = Object.keys(datasetSizeByType).length;
         if (keyLength === 0) return this.mappingList;
         return this.mappingList.reduce((prev, current) => {
            let obj = { value: datasetSizeByType[current.id] };
            prev.push({ ...current, ...obj });
            return prev;
         }, []);
      }
   },
   async created() {
      let { success, data } = await Home.getHomeData().then(res => res.data);
      if (success) this.homeData = data;
   },
   components: {
      DefaultHeader,
      CategoryList
   }
}
</script>

<style lang="scss" src="./index.scss"></style>