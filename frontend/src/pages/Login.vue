<script setup lang="ts">
import { ref, computed } from 'vue'
import { isAxiosError } from 'axios'
import { useRouter } from 'vue-router'
import { authenticationService} from '@/api/AuthenticationService'

const email = ref('')
const password = ref('')
const isEmpty = computed(() => email.value.length == 0 || password.value.length == 0)
const submitted = ref(false)
const errorMessage = ref('')

const router = useRouter()

async function authenticate() {
  submitted.value = true
  try {
    const user = await authenticationService.login(email.value, password.value)
    if(user.role == 'admin') {
      router.push('/admin')
    } else {
      router.push('/')
    }
  } catch (e) {
    if(isAxiosError(e)) {
      console.log(e.response?.data)
      errorMessage.value = e.response?.data.error.message
    } 
  }
}

</script>
<template>
  <div class="row justify-content-center">
    <div class="col-6 card">
      <div class="card-body">
        <h5 class="card-title">Sign in</h5>
        <div v-if="errorMessage"  class="alert alert-danger" role="alert">
          {{ errorMessage }}
        </div>
        <form novalidate @submit.prevent="authenticate" :class="{ 'was-validated': submitted }">
          <div class="mb-3">
            <label for="emailInput" class="form-label">Email:</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="emailInput"
              placeholder="mail@mail.com"
              required
            />
            <div class="invalid-feedback">Você deve informar um email válido.</div>
          </div>
          <div class="mb-3">
            <label for="passwordInput" class="form-label">Password</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="passwordInput"
              required
            />
            <div class="invalid-feedback">A senha é um campo obrigatório.</div>
          </div>
          <div class="mb-3">
            <input
              type="submit"
              class="float-end btn btn-primary"
              value="Enviar"
              :disabled="isEmpty"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
