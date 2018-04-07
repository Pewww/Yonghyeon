<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  font-family: 'nanumsquare';
}

#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #202020;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
