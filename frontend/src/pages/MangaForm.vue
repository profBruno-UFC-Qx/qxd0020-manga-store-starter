<script setup lang="ts">
import { type Manga } from '@/types'
import { getUploadURL } from '@/composables/useUploadFile'
import { mangaService } from '@/api/MangaService'


</script>

<template>
  <div class="col-12 alert alert-dismissible alert-danger fade show" role="alert">
    Coloque uma mensagem aqui
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  <img class="col-auto" />
  <div class="row text-start">
    <div class="col-12 mb-3">
      <label for="coverInput" class="form-label">Manga cover</label>
      <input type="file" id="coverInput" accept="image/*" class="form-control">
    </div>
    <div class="col-12 mb-3">
      <label for="titleInput" class="form-label">Manga title</label>
      <input type="text" id="titleInput" class="form-control" placeholder="an awesome title">
    </div>
    <div class="col-3 mb-3 ">
      <label for="numberInput" class="form-label">Manga number</label>
      <input type="number" id="numberInput" class="form-control" placeholder="volume number">
    </div>
    <div class="col-2 mb-3">
      <label for="priceInput" class="form-label">Manga price</label>
      <input type="text" id="priceInput" class="form-control"  placeholder="00.00">
    </div>
  </div>
  <router-link to="/admin" class="btn btn-danger">Cancel</router-link>
  <a class="btn btn-success" >Create</a>
</template>