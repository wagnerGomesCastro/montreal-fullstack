<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue'

import FormUser from './FormUser.vue'

interface FormUserRef {
  onSubmit: () => void
  resetForm: () => void
}

const buttonToogle = ref<HTMLButtonElement | null>(null)
const childFormUserRef = ref<FormUserRef | null>(null)

defineProps({
  title: {
    type: String,
    description: '',
  },
  action: {
    type: String,
    description: '',
  },
  dataForm: {
    type: Object,
    default: () => ({
      firstName: null,
      lastName: null,
      email: null,
      password: null,
    }),
  },
})

const toggleModal = () => {
  buttonToogle.value?.click()
}

const onSubmit = async () => {
  if (childFormUserRef.value) {
    childFormUserRef.value.onSubmit()
  }
}

const resetForm = () => {
  if (childFormUserRef.value) {
    childFormUserRef.value.resetForm()
  }
}
</script>

<template>
  <!-- For advanced modal usage you can check out https://getbootstrap.com/docs/5.3/components/modal/ -->
  <div class="content">
    <button
      v-show="false"
      ref="buttonToogle"
      class="btn btn-primary"
      data-bs-target="#modal-block-vcenter"
      data-bs-toggle="modal"
    >
      trigger modal
    </button>

    <div
      class="modal fade"
      id="modal-block-vcenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modal-block-vcenter"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-md show" role="document">
        <div class="modal-content">
          <BaseBlock :title="title" transparent class="mb-0">
            <template #options>
              <button
                type="button"
                class="btn-block-option"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i class="fa fa-fw fa-times"></i>
              </button>
            </template>

            <template #content>
              <div class="fs-sm">
                <FormUser
                  ref="childFormUserRef"
                  :dataForm="dataForm"
                  :action="action"
                  :closeModal="toggleModal"
                />
              </div>

              <div class="block-content block-content-full text-end bg-body">
                <button
                  type="button"
                  class="btn btn-sm btn-alt-secondary me-4"
                  data-bs-dismiss="modal"
                  @click="resetForm"
                >
                  Cancelar
                </button>

                <button @click="onSubmit" type="button" class="btn btn-sm btn-primary">
                  Enviar
                </button>
              </div>
            </template>
          </BaseBlock>
        </div>
      </div>
    </div>
  </div>
</template>
