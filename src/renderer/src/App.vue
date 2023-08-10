<script setup lang="ts">
import { ref } from 'vue'

const num = ref<number>(0)
window.api.onUpdateCounter((_event, value) => {
  num.value = value
  _event.sender.send('counter-value', value)
})
</script>

<template>
  <p>num: {{ num }}</p>
</template>

<style lang="less"></style>
