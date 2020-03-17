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
         <tr>
            <td>資料集類型</td>
            <td>rawData</td>
         </tr>
      </tbody>
   </table>
</div>
</template>

<script>
export default {
   data: () => ({
      mappingList: [
         { id: 'type', title: '資料集類型', value: '' },
         { id: 'dataDescription', title: '主要欄位說明', value: '' },
         { id: 'fieldDesc', title: '主要欄位說明', value: '' },  
         { id: 'publisher', title: '資料集提供機關', value: '' },
         { id: 'accrualPeriodicity', title: '更新頻率', value: '' },
         { id: 'license', title: '授權方式', value: '' },
         { id: 'licenseURL', title: '授權說明網址', value: '' },
         { id: 'cost', title: '計費方式', value: '' },
         { id: 'characterSetCode', title: '編碼格式', value: '' },
         { id: 'publisherContactName', title: '資料集提供機關聯絡人', value: '' },
         { id: 'publisherContactPhone', title: '資料集提供機關聯絡人電話', value: '' },
         { id: 'landingPage', title: '備註(說明資料)', value: '' },
      ]
   })
}
</script>

<style lang="scss">
.collectTable {
   width: 100%;
   th, td {
      padding: 8px 10px;
      color: #666666;
      font-size: 15px;
   }
   tr {
      border-bottom: 1px solid #ddd;
      >th:first-child,
      >td:first-child {
         background-color: map-get($elBgColor, menu);
      }
      >th:first-child {
         font-weight: bold;
      }
   }
}
</style>