<template>
  <header class="header">
    <h1>MEDODS</h1>
  </header>
</template>

<script>
export default {
  name: 'PageHeader',
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 40px;
  margin-bottom: 10px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.header {
  margin: 0;
  padding: 1% 5%;
  color: #22b2ea;
  background-color: rgb(239 251 255 / 50%);
  text-shadow: 3px -4px 5px rgba(0, 0, 0, 0.5);
}
</style>
