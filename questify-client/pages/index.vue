<template>
  <h1>Hello world</h1>
  <p> number is : {{ num }} </p>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const num = ref(10);
</script>
