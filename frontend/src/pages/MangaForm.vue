<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { isAxiosError } from 'axios'
import { useRouter } from 'vue-router'
import { type Manga } from '@/types'
import { getUploadURL } from '@/composables/useUploadFile'
import { mangaService } from '@/api/MangaService'

const props = defineProps<{
  id?: number
}>()
const manga = ref<Manga>({} as Manga)

onBeforeMount( async () => {
  if(props.id) {
    manga.value = await mangaService.get(props.id)
  }
})

const cover = ref<File>()

const router = useRouter()

const loading = ref(false)
const feedbackMessage = ref('')
const error = ref(false)


async function criarManga() {
  if(cover.value) {
    loading.value = true
    try {
      const { title, number, price } = manga.value
      await mangaService.create(title, price, number, cover.value)
      feedbackMessage.value = "Manga criado com sucesso"
      setTimeout(() => {
        router.push("/admin")
      }, 2000)
    } catch (e) {
      error.value = true
      mostrarError(e)
    } finally {
      loading.value = false
    }
  } else {
    error.value = true
    feedbackMessage.value = "A capa é obrigatória"
  }
}

async function atualizarManga() {
  loading.value = true
  try {
    const { id, title, number, price } = manga.value
    await mangaService.update(id, title, price, number, cover.value)
    manga.value = await mangaService.get(manga.value.id)
    feedbackMessage.value = "Manga atualizado com sucesso"
  } catch (e) {
    error.value = true
    mostrarError(e)
  } finally {
    loading.value = false
  }
}

function mostrarError(e: unknown) {
  if(isAxiosError(e)) {
    const detalhes = e.response?.data.error.details.errors.map(err => err.message)
    console.log(detalhes)
    feedbackMessage.value = `${e.response?.data.error.message} ${detalhes}`
  } else if (e instanceof Error) {
    feedbackMessage.value = e.message
  } 
}

function handleFile(event: Event) {
  const inputEvent = event as InputEvent
  const target = inputEvent.target as HTMLInputElement
  const file = target.files?.item(0) as File
  cover.value = file
}

</script>

<template>
  <div v-if="loading == false && feedbackMessage" class="col-12 alert alert-dismissible fade show" 
  :class="{ 'alert-success': !error, 'alert-danger': error }" role="alert">
    {{ feedbackMessage }}
    <button type="button" class="btn-close" aria-label="Close" @click="feedbackMessage=''"></button>
  </div>
  <img class="col-auto"  v-if="manga.cover" :src="getUploadURL(manga.cover.url)" />
  <div class="row text-start">
    <div class="col-12 mb-3">
      <label for="coverInput" class="form-label">Manga cover</label>
      <input type="file" id="coverInput" accept="image/*" class="form-control" @change="handleFile">
    </div>
    <div class="col-12 mb-3">
      <label for="titleInput" class="form-label">Manga title</label>
      <input type="text" id="titleInput" class="form-control" placeholder="an awesome title" v-model="manga.title">
    </div>
    <div class="col-3 mb-3 ">
      <label for="numberInput" class="form-label">Manga number</label>
      <input type="number" id="numberInput" class="form-control" placeholder="volume number" v-model="manga.number">
    </div>
    <div class="col-2 mb-3">
      <label for="priceInput" class="form-label">Manga price</label>
      <input type="text" id="priceInput" class="form-control"  placeholder="00.00" v-model="manga.price">
    </div>
  </div>
  <router-link to="/admin" class="btn btn-danger">Cancel</router-link>
  <button class="btn btn-info" v-if="props.id" @click="atualizarManga" >Atualizar</button>
  <button class="btn btn-success" v-else @click="criarManga" :disabled="!cover" >Create</button>
</template>