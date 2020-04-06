<template>
  <div>
    <code-mirror/>
  </div>
</template>

<script>
import CodeMirror from '@/components/CodeMirror'

export default {
  name: 'App',
  components: {
    CodeMirror
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
