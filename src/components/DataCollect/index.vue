<template>
<div class="dataCollect">
   <table class="collectTable">
      <thead>
         <tr>
            <th width="30%"></th>
            <th width="70%"></th>
         </tr>
      </thead>
      <tbody>
         <Tr 
            v-for="item in rowList"
            :key="item.id"
            :rowData="item"
         ></Tr>
      </tbody>
   </table>
</div>
</template>

<script>
import Tr from './tr.vue';
export default {
   props: {
      datasetMeta: {
         type: Object,
         required: true
      }
   },
   data: () => ({
      mappingList: [
         { id: 'type', title: '資料集類型', link: false, linkName: '' },
         { id: 'dataDescription', title: '主要欄位說明', link: false, linkName: '' },
         { id: 'fieldDesc', title: '主要欄位說明', link: false, linkName: '' },  
         { id: 'publisher', title: '資料集提供機關', link: false, linkName: '' },
         { id: 'accrualPeriodicity', title: '更新頻率', link: false, linkName: '' },
         { id: 'license', title: '授權方式', link: false, linkName: '' },
         { id: 'licenseURL', title: '授權說明網址', link: true, linkName: '' },
         { id: 'cost', title: '計費方式', link: false, linkName: '' },
         { id: 'characterSetCode', title: '編碼格式', link: false, linkName: '' },
         { id: 'publisherContactName', title: '資料集提供機關聯絡人', link: false, linkName: '' },
         { id: 'publisherContactPhone', title: '資料集提供機關聯絡人電話', link: false, linkName: '' },
         { id: 'landingPage', title: '備註(說明資料)', link: true, linkName: '說明資料' }
      ]
   }),
   computed: {
      rowList() {
         return this.mappingList.reduce((prev, current) => {
            let obj = {};
            obj.value = this.datasetMeta[current.id];
            prev.push({ ...obj, ...current });
            return prev;
         }, []);
      }
   },
   components: {
      Tr
   }
}
</script>

<style lang="scss">
.collectTable {
   tr {
      border-bottom: 1px solid map-get($borderColor, list);
      >th:first-child,
      >td:first-child {
         background-color: map-get($elBgColor, menu);
      }
      >th:first-child {
         font-weight: bold;
      }
   }
   th, td {
      padding: 8px 10px;
      color: map-get($fontColor, table);
      font-size: 15px;
      >a {
         color: map-get($fontColor, primary);
         text-decoration: underline;
      }
   }
}
</style>