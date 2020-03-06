export default {
   data() {
      return {
         subject: ['announcement', 'dataset'],
         routeArr: []
      }
   },
   created() {
      this.routeArr = this.$router.options.routes.filter(item => {
         return this.subject.includes(item.name);
      });
   }
}