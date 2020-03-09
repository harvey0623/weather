<template>
   <div id="recaptcha" ref="myrecaptcha"></div>
</template>

<script>
export default {
   props: {
      token: {
         type: String,
         retuired: true 
      }
   },
   data: () => ({
      sitekey: '6LfqA68UAAAAAHivfnF1r5rAYcZn2hAnnjGtd2US',
      widgetId: 0
   }),
   methods: {
      execute() {
         window.grecaptcha.execute(this.widgetId);
      },
      reset() {
         grecaptcha.reset(this.widgetId);
      },
      render() {
         this.widgetId = grecaptcha.render(this.$refs.myrecaptcha, {
            sitekey: this.sitekey,
            size: 'normal',
            callback: (token) => {
               this.$emit('update:token', token);
            },
            'expired-callback'(err) {
               console.log(err);
            },
            'error-callback'() {
               console.log(err);
            }
         });
      }
   },
   mounted() {
      grecaptcha.ready(() => {
         this.render();
      });
   }
};
</script>