<template>
  <div id="app" class="app">
    <page-header/>
    <client-registration/>
    <page-footer/>
  </div>
</template>

<script>
import ClientRegistration from './views/ClientRegistration.vue';
import PageHeader from './components/PageHeader.vue';
import PageFooter from './components/PageFooter.vue';

export default {
  name: 'App',
  components: {
    PageHeader,
    ClientRegistration,
    PageFooter,
  },
};
</script>

<style lang="scss">
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
