<script setup lang="ts">
import { getUploadURL } from '@/composables/useUploadFile'
import { type Cover } from '@/types'
defineProps<{
  id: number,
  titulo: string,
  preco: number
  volume: number
  capa: Cover
}>()
</script>

<template>
<router-link :to="`/mangas/${id}`">
  <div class="card shadow-sm">
    <img class="card-img-top" width="100%" :src="getUploadURL(capa.url)" :alt="capa.altenativeText">
    <div class="card-body">
      <h5 class="card-title">{{ volume }} - {{ titulo }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">Preço: {{ preco }}</h6>
    </div>
  </div>
</router-link>
</template>

<style scoped>
.card-img-top:hover {
  filter: grayscale(0.9);
}
</style>