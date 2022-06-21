<template>
  <NuxtPage v-if="initCompleted" />
</template>

<script lang="ts" setup>
  const { user, loading } = useAuth();

  const initCompleted = computed(() => {
    return !loading;
  })
</script>