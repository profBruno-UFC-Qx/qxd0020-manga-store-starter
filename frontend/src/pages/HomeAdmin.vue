<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { isAxiosError } from 'axios'
import { type Manga } from '@/types'
import { getUploadURL } from '@/composables/useUploadFile';
import { mangaService } from '@/api/MangaService'

const loading = ref(true)
const mangas = ref<Manga[]>([]) 
const error = ref('')
const feedback = ref('')
const selectedManga = ref<{id: number, title: string}>({id: 0, title: ''})


onMounted(async () => {
  try {
    mangas.value = await mangaService.all()
  } catch (e) {
    if(isAxiosError(e)) {
      error.value = e.response?.data.error.message
    } else if(e instanceof Error) {
      error.value = e.message
    }
  } finally {
    loading.value = false
  }
})

function selectManga(id: number, title: string) {
  selectedManga.value = {id, title}
}

async function remove() {
  try {
    const res = await mangaService.delete(selectedManga.value.id)
    mangas.value = mangas.value.filter((m) => m.id != selectedManga.value.id)
    feedback.value = `Manga ${res.title} removido com sucesso`
  } catch (e) {
    console.log(e)
    if(e instanceof Error) {
      error.value = e.message
    }
  }
}
</script>

<template>
<div class="alert alert-success" v-if="feedback" role="alert">
  {{ feedback }}
</div>

<div class="alert alert-danger" v-if="error" role="alert">
  {{ error }}
</div>

<router-link to="/mangas/novo" class="btn btn-success"><i class="bi bi-plus"></i>Add</router-link>
      
<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
  <table class="table table-striped">
    <thead>
      <tr>
      <th>#</th>
      <th>Title</th>
      <th>Cover</th>
      <th>Number</th>
      <th>Price</th>
      <th>Actions</th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="manga in mangas" :key="manga.id">
        <td><a :id="`${manga.number}`">{{ manga.number }}</a></td>
        <td>{{ manga.title }}</td>
        <td><img :src="getUploadURL(manga.cover.url)" class="img-thumbnail rounded-3 w-25" alt="..."/></td>
        <td>{{ manga.number }}</td>
        <td>{{ manga.price }}</td>
        <td>
          <a class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="selectManga(manga.id, manga.title)" ><i class="bi bi-trash"></i></a> 
          <router-link :to="`/mangas/editar/${manga.id}`" class="btn btn-sm btn-primary"><i class="bi bi-pencil"></i></router-link></td>
      </tr>
    </tbody>
  </table>
</div>


<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Confirmação</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Você tem certeza que deseja deletar o manga <strong>{{ selectedManga?.title }}</strong>?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Não</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="remove">Sim</button>
      </div>
    </div>
  </div>
</div>

</template>