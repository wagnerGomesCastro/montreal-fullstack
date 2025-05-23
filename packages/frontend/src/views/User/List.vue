<!-- eslint-disable vue/block-lang -->
<script setup>
import { reactive, computed, onMounted, ref } from 'vue'
import ModalForm from '@/components/ModalForm/index.vue'
import { useUserStore } from '@/stores/user' // Certifique-se de ajustar o caminho

// // Vue Dataset, for more info and examples you can check out https://github.com/kouts/vue-dataset/tree/next
import {
  Dataset,
  DatasetItem,
  DatasetInfo,
  DatasetPager,
  DatasetSearch,
  DatasetShow,
} from 'vue-dataset'

// Get example data
// import users from '@/data/usersDataset.json'

const userStore = useUserStore()

const modalInstance = null

const openModal = ref('modal')
const method = ref(null)
const titleModal = ref('')

const user = reactive({
  firstName: null,
  lastName: null,
  email: null,
  password: null,
})

const toggleModal = () => {
  openModal.value = 'modal'
}

const handlerRemoveUser = async (id) => {
  await userStore.deleteUserById(id)
}

const handlerEditUser = (item) => {
  console.log(item)

  if (item) {
    user.id = item.id
    user.firstName = item.firstName
    user.lastName = item.lastName
    user.email = item.email
    user.password = item.password
  }

  method.value = 'update'
  titleModal.value = 'Atualizar Usuário'

  toggleModal()
}

const handlerCreateUser = () => {
  // user.id = ''
  user.firstName = ''
  user.lastName = ''
  user.email = ''
  user.password = ''

  method.value = 'create'
  titleModal.value = 'Adicionar Usuário'

  toggleModal()
}

// Helper variables
const cols = reactive([
  {
    name: 'Nome',
    field: 'firstName',
    sort: '',
  },
  {
    name: 'Sobrenome',
    field: 'lastName',
    sort: '',
  },
  {
    name: 'Email',
    field: 'email',
    sort: '',
  },
  {
    name: 'Data de criação',
    field: 'cratedAt',
    sort: '',
  },
])

// Sort by functionality
const sortBy = computed(() => {
  return cols.reduce((acc, o) => {
    if (o.sort) {
      if (o.sort === 'asc') {
        acc.push(o.field)
      } else {
        acc.push('-' + o.field)
      }
    }
    return acc
  }, [])
})

// const userMaped = computed(() => {
//   return users.value.map((user) => {
//     const [firstName, lastName] = user.name.split(' ')
//     return {
//       firstName,
//       lastName,
//       email: user.email,
//       createdAt: user.createdAt,
//     }
//   })
// })

const userMaped = computed(() => {
  return userStore.users
})

// On sort th click
function onSort(event, i) {
  let toset
  const sortEl = cols[i]

  if (!event.shiftKey) {
    cols.forEach((o) => {
      if (o.field !== sortEl.field) {
        o.sort = ''
      }
    })
  }

  if (!sortEl.sort) {
    toset = 'asc'
  }

  if (sortEl.sort === 'desc') {
    toset = event.shiftKey ? '' : 'asc'
  }

  if (sortEl.sort === 'asc') {
    toset = 'desc'
  }

  sortEl.sort = toset
}

// Apply a few Bootstrap 5 optimizations
onMounted(() => {
  // Remove labels from
  document.querySelectorAll('#datasetLength label').forEach((el) => {
    el.remove()
  })

  // Replace select classes
  const selectLength = document.querySelector('#datasetLength select')

  selectLength.classList = ''
  selectLength.classList.add('form-select')
  selectLength.style.width = '80px'

  userStore.getUsers()
})
</script>

<template>
  <BasePageHeading title="Usuários" subtitle="lista de usuários" />

  <div class="content">
    <BaseBlock title="" content-full>
      <Dataset
        v-slot="{ ds }"
        :ds-data="userMaped"
        :ds-sortby="sortBy"
        :ds-search-in="['firstName', 'lastName', 'email', 'cratedAt']"
      >
        <div class="row" :data-page-count="ds.dsPagecount">
          <div id="datasetLength" class="col-md-4 py-2">
            <DatasetShow :dsShowEntries="5" />
          </div>
          <div class="col-md-5 py-2">
            <DatasetSearch ds-search-placeholder="Pesquisar..." />
          </div>

          <div class="col-md-3 py-2">
            <button
              @click="handlerCreateUser"
              :data-bs-toggle="openModal"
              data-bs-target="#modal-block-vcenter"
              type="button"
              class="btn btn-sm btn-alt-secondary p-2"
            >
              <i class="fa fa-fw fa-plus"></i> Adicionar usuário
            </button>
          </div>
        </div>
        <hr />

        <div class="row">
          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table table-striped mb-0">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th
                      v-for="(th, index) in cols"
                      :key="th.field"
                      :class="['sort', th.sort]"
                      @click="onSort($event, index)"
                    >
                      {{ th.name }} <i class="gg-select float-end"></i>
                    </th>
                    <th class="text-center" style="width: 100px">Ações</th>
                  </tr>
                </thead>
                <DatasetItem tag="tbody" class="fs-sm">
                  <template #default="{ row, rowIndex }">
                    <tr>
                      <th scope="row">{{ row.id }}</th>
                      <td style="min-width: 150px">{{ row.firstName }}</td>
                      <td style="min-width: 150px">{{ row.lastName }}</td>
                      <td>{{ row.email }}</td>
                      <td style="min-width: 150px">{{ row.createdAt }}</td>

                      <td class="text-center">
                        <div class="btn-group">
                          <button
                            type="button"
                            class="btn btn-sm btn-alt-secondary"
                            @click="handlerEditUser(row)"
                            :data-bs-toggle="openModal"
                            data-bs-target="#modal-block-vcenter"
                          >
                            <i class="fa fa-fw fa-pencil-alt"></i>
                          </button>

                          <button
                            @click="handlerRemoveUser(row.id)"
                            type="button"
                            class="btn btn-sm btn-alt-secondary"
                          >
                            <i class="fa fa-fw fa-times"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </template>
                </DatasetItem>
              </table>
            </div>
          </div>
        </div>
        <div class="d-flex flex-md-row flex-column justify-content-between align-items-center">
          <DatasetInfo class="py-3 fs-sm" />
          <DatasetPager class="flex-wrap py-3 fs-sm" />
        </div>
      </Dataset>
    </BaseBlock>

    <ModalForm :title="titleModal" :dataForm="user" :action="method" />
  </div>
</template>

<style lang="scss" scoped>
.gg-select {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(1);
  width: 22px;
  height: 22px;
}
.gg-select::after,
.gg-select::before {
  content: '';
  display: block;
  box-sizing: border-box;
  position: absolute;
  width: 8px;
  height: 8px;
  left: 7px;
  transform: rotate(-45deg);
}
.gg-select::before {
  border-left: 2px solid;
  border-bottom: 2px solid;
  bottom: 4px;
  opacity: 0.3;
}
.gg-select::after {
  border-right: 2px solid;
  border-top: 2px solid;
  top: 4px;
  opacity: 0.3;
}
th.sort {
  cursor: pointer;
  user-select: none;
  &.asc {
    .gg-select::after {
      opacity: 1;
    }
  }
  &.desc {
    .gg-select::before {
      opacity: 1;
    }
  }
}
</style>
