<!-- eslint-disable vue/block-lang -->
<script>
import { computed, reactive } from 'vue'

// Vuelidate, for more info and examples you can check out https://github.com/vuelidate/vuelidate
import useVuelidate from '@vuelidate/core'
import { required, minLength, email, helpers } from '@vuelidate/validators'

import { useUserStore } from '@/stores/user' // Certifique-se de ajustar o caminho

export default {
  props: {
    dataForm: {
      type: Object,
      default: () => ({
        firstName: null,
        lastName: null,
        email: null,
        password: null,
      }),
    },
    closeModal: {
      type: Function,
      default: () => {},
    },
    action: {
      type: String,
      description: '',
    },
  },
  setup(props, { expose }) {
    // console.log('props', props)

    const userStore = useUserStore()

    const userData = reactive(props.dataForm)

    // const regexp = helpers.regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)

    // Validation rules
    const rules = computed(() => {
      return {
        firstName: {
          required,
          minLength: minLength(3),
        },
        lastName: {
          required,
          minLength: minLength(3),
        },
        email: {
          required,
          email,
        },
        // password: {
        //   required,
        //   minLength: minLength(8),
        //   regexp,
        // },
      }
    })

    // Use vuelidate
    const v$ = useVuelidate(rules, userData)

    // On form submission
    async function onSubmit() {
      const result = await v$.value.$validate()

      console.log('onSubmit')

      console.log('result', result)

      if (!result) {
        // notify user form is invalid
        return
      }

      if (props.action === 'create') {
        // Create user
        console.log('userData', userData)
        await userStore.addUser(userData)
      } else if (props.action === 'update') {
        // Update user
        console.log('userData', userData)
        await userStore.updateUser(userData)
      }

      props.closeModal()
    }

    const resetForm = () => {
      v$.value.$reset()
    }

    expose({ onSubmit, resetForm })

    return { onSubmit, v$, userData }
  },
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <BaseBlock title="" content-full>
      <div class="row">
        <div class="col-12">
          <div class="mb-4">
            <label class="form-label" for="val-firstName"
              >Nome <span class="text-danger">*</span></label
            >
            <input
              type="text"
              id="val-firstName"
              class="form-control"
              :class="{
                'is-invalid': v$.firstName.$errors.length,
              }"
              v-model="userData.firstName"
              @blur="v$.firstName.$touch"
            />
            <div v-if="v$.firstName.$errors.length" class="invalid-feedback animated fadeIn">
              Campo obrigatório, no mínimo 3 caracteres
            </div>
          </div>

          <div class="mb-4">
            <label class="form-label" for="val-lastName"
              >Sobrenome <span class="text-danger">*</span></label
            >
            <input
              type="text"
              id="val-lastName"
              class="form-control"
              :class="{
                'is-invalid': v$.lastName.$errors.length,
              }"
              v-model="userData.lastName"
              @blur="v$.lastName.$touch"
            />
            <div v-if="v$.lastName.$errors.length" class="invalid-feedback animated fadeIn">
              Campo obrigatório, no mínimo 3 caracteres
            </div>
          </div>

          <div class="mb-4">
            <label class="form-label" for="val-email"
              >Email <span class="text-danger">*</span></label
            >
            <input
              type="text"
              id="val-email"
              class="form-control"
              :class="{
                'is-invalid': v$.email.$errors.length,
              }"
              v-model="userData.email"
              @blur="v$.email.$touch"
            />
            <div v-if="v$.email.$errors.length" class="invalid-feedback animated fadeIn">
              Por favor, insira um endereço de e-mail válido
            </div>
          </div>

          <!-- <div v-if="action === 'create'" class="">
            <label class="form-label" for="val-password"
              >Password <span class="text-danger">*</span></label
            >
            <input
              type="password"
              id="val-password"
              class="form-control"
              :class="{
                'is-invalid': v$.password.$errors.length,
              }"
              v-model="userData.password"
              @blur="v$.password.$touch"
            />
            <div v-if="v$.password.$errors.length" class="invalid-feedback animated fadeIn">
              Digite uma senha válida, deve conter pelo menos 8 caracteres, uma letra maiúscula, uma
              letra minúscula, um número e um caractere especial
            </div>
          </div> -->
        </div>
      </div>
    </BaseBlock>
  </form>
</template>
