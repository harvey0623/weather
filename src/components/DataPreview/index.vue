<template>
<div class="dataPreview" ref="preview">
   <table class="previewTable">
      <thead>
         <tr>
            <th 
               v-for="field in fields"
               :key="field.id"
               ref="th"
            >{{ field.id }}</th>
         </tr>
      </thead>
      <tbody>
         <tr 
            v-for="(item,index) in location.weatherElement"
            :key="index">
            <td ref="td">{{ location.lat }}</td>
            <td>{{ location.lon }}</td>
            <td>{{ location.locationName }}</td>
            <td>{{ location.stationId }}</td>
            <td>{{ location.time.obsTime }}</td>
            <td>{{ item.elementName }}</td>
            <td>{{ item.elementValue }}</td>
            <td></td>
            <td></td>
         </tr>
      </tbody>
   </table>
</div>
</template>

<script>
export default {
   props: {
      fields: {
         type: Array,
         required: true
      },
      location: {
         type: Object,
         required: true
      }
   },
   methods: {
      scrollHandler(evt) {
         let el = evt.target;
         let scrollY = el.scrollTop;
         let scrollX = el.scrollLeft;
         let thArr = this.$refs.th;
         let tdArr = this.$refs.td;
         thArr.forEach(th => th.style.top = scrollY + 'px');
         tdArr.forEach(td => td.style.left = scrollX + 'px');
         thArr[0].style.left = scrollX + 'px';
      }
   },
   mounted() {
      this.$refs.preview.addEventListener('scroll', this.scrollHandler);
   },
   beforeDestroy() {
      this.$refs.preview.removeEventListener('scroll', this.scrollHandler);
   }
}
</script>

<style lang="scss">
$tableBorderColor: map-get($borderColor, list);
.dataPreview {
   width: 100%;
   max-height: 600px;
   overflow: auto;
}
.previewTable {
   th, td {
      padding: 8px 15px;
      color: map-get($fontColor, table);
      text-align: center;
   }
   th {
      position: relative;
      background-color: map-get($elBgColor, menu);
      font-weight: normal;
      border-right: 1px solid $tableBorderColor;
      z-index: 2;
      &:first-child {
         z-index: 3;
      }
      &:last-child {
         border-right: none;
      }
   }
   tr {
      td {
         border-right: 1px solid $tableBorderColor;
         border-bottom: 1px solid $tableBorderColor;
         background-color: #fff;
         &:first-child {
            position: relative;
            z-index: 1;
         }
         &:last-child {
            border-right: none;
         }
      }
   }
}
</style>