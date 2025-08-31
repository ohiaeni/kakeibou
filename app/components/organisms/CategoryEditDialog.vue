<script setup lang="ts">
interface CategoryForm {
  name: string
  description: string
  icon: string
  color: string
}

interface Props {
  isOpen: boolean
  categoryForm: CategoryForm
  availableIcons: string[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
  'update:categoryForm': [value: CategoryForm]
  'save': []
}>()

const categoryFormModel = computed({
  get: () => props.categoryForm,
  set: value => emit('update:categoryForm', value),
})

const dialogModel = computed({
  get: () => props.isOpen,
  set: value => emit('update:isOpen', value),
})
</script>

<template>
  <v-dialog v-model="dialogModel" max-width="600">
    <v-card>
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2" color="secondary">
          mdi-pencil
        </v-icon>
        カテゴリの編集
      </v-card-title>

      <v-card-text class="pt-4">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="categoryFormModel.name"
              label="カテゴリ名"
              variant="outlined"
              required
              :rules="[(v) => !!v || 'カテゴリ名は必須です']"
            />
          </v-col>

          <v-col cols="12">
            <v-textarea
              v-model="categoryFormModel.description"
              label="説明（任意）"
              variant="outlined"
              rows="3"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="categoryFormModel.icon"
              label="アイコン"
              variant="outlined"
              :items="availableIcons"
              required
            >
              <template #selection="{ item }">
                <div class="d-flex align-center">
                  <v-icon class="mr-2">
                    {{ item.value }}
                  </v-icon>
                  {{ item.value }}
                </div>
              </template>
              <template #item="{ props: itemProps, item }">
                <v-list-item
                  v-bind="itemProps"
                  :prepend-icon="item.value"
                  :title="item.value"
                />
              </template>
            </v-select>
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="categoryFormModel.color"
              label="カラー"
              variant="outlined"
              :items="['primary', 'secondary', 'success', 'warning', 'error', 'info']"
              required
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="px-6 pb-4">
        <v-spacer />
        <v-btn
          color="grey"
          variant="text"
          @click="dialogModel = false"
        >
          キャンセル
        </v-btn>
        <v-btn
          color="secondary"
          variant="elevated"
          :disabled="!categoryFormModel.name || !categoryFormModel.icon"
          @click="emit('save')"
        >
          保存
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
