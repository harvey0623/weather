<template>
<div class="dataTable">
   <table id="datasetTable">
      <thead>
         <tr>
            <Th 
               v-for="(item,index) in thTitle"
               :key="index"
               :title="item.title"
               :width="item.width"
            ></Th>    
         </tr>
      </thead>
      <tbody>
         <Tr 
            v-for="item in datasetList"
            :key="item.dataid"
            :dataid="item.dataid"
            :dataname="item.dataname"
            :format="item.format"
         ></Tr>
      </tbody>
   </table>
</div>
</template>

<script>
import Th from './th.vue';
import Tr from './tr.vue';
export default {
   props: {
      thTitle: {
         type: Array,
         required: true
      },
      datasetList: {
         type: Array,
         required: true
      }
   },
   components: {
      Th,
      Tr
   }
}
</script>

<style lang="scss">
$tdLinkColor: map-get($elBgColor, hover);
#datasetTable {
   width: 100%;
   th {
      padding: 8px;
      font-weight: normal;
      background-color: map-get($elBgColor, menu);
      text-align: center;
   }
   td {
      padding: 8px 10px;
   }
   tbody {
      tr {
         border-bottom: 1px solid #ddd;
         &:nth-child(odd) {
            background-color: #f9f9f9;
         }
         &:nth-child(even) {
            background-color: #fff;
         }
      }
      td {
         &:last-child {
            text-align: center;
            vertical-align: top;
         }
         .dataLink {
            color: $tdLinkColor;
            &:hover {
               color: darken($tdLinkColor, 10%);
            }
         }
         .formatBox {
            >span {
               padding: 3px 12px;
               margin-right: 5px;
               line-height: initial;
               color: #fff;
               background-color: #74b904;
               border-radius: 10px;
               font-size: 12px;
            }
         }
      }
   }
}
</style>