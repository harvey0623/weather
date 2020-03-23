import DatasetPage from '@/views/dataset/index.vue';
import DatasetContent from '@/views/dataset/content.vue';

const list = [
   { 
      path: 'forecast',
      name: 'forecast',
      navName: '預報',
      children: {
         name: 'forecastContent',
      } 
   },
   { 
      path: 'observation',
      name: 'observation',
      navName: '觀測',
      children: {
         name: 'observationContent',
      } 
   },
   { 
      path: 'earthquake',
      name: 'earthquake',
      navName: '地震海嘯',
      children: {
         name: 'earthquakeContent',
      } 
   },
   { 
      path: 'climate',
      name: 'climate',
      navName: '氣候',
      children: {
         name: 'climateContent',
      } 
   },
   { 
      path: 'warning',
      name: 'warning',
      navName: '天氣警特報',
      children: {
         name: 'warningContent',
      } 
   },
   { 
      path: 'mathematics',
      name: 'mathematics',
      navName: '數值預報',
      children: {
         name: 'mathematicsContent',
      } 
   },
   { 
      path: 'astronomy',
      name: 'astronomy',
      navName: '天文',
      children: {
         name: 'astronomyContent',
      } 
   },
];

const datasetPath = list.reduce((prev, current) => {
   prev.push({
      path: current.path,
      name: current.name,
      component: DatasetPage,
      meta: {
         navName: current.navName
      },
      children: [
         {
            path: ':id',
            name: current.children.name,
            component: DatasetContent,
            meta: {
               navName: ''
            }
         },
      ]
   });
   return prev;
}, []);

export default datasetPath;