<script setup lang="ts">
import { COLOR_OPTIONS } from '~/constants/colors'

interface CategoryForm {
  name: string
  description: string
  icon: string
  color: string
}

interface Props {
  showDialog: boolean
  categoryForm: CategoryForm
  availableIcons: string[]
}

interface Emits {
  'update:showDialog': [value: boolean]
  'update:categoryForm': [value: CategoryForm]
  'save': []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleSave = () => {
  emit('save')
}

const handleCancel = () => {
  emit('update:showDialog', false)
}

const updateCategoryForm = (field: keyof CategoryForm, value: string) => {
  emit('update:categoryForm', {
    ...props.categoryForm,
    [field]: value,
  })
}
</script>

<template>
  <v-dialog :model-value="props.showDialog" max-width="600" @update:model-value="emit('update:showDialog', $event)">
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
              :model-value="props.categoryForm.name"
              label="カテゴリ名"
              variant="outlined"
              required
              :rules="[(v) => !!v || 'カテゴリ名は必須です']"
              @update:model-value="(value) => updateCategoryForm('name', value)"
            />
          </v-col>

          <v-col cols="12">
            <v-textarea
              :model-value="props.categoryForm.description"
              label="説明（任意）"
              variant="outlined"
              rows="3"
              @update:model-value="(value) => updateCategoryForm('description', value)"
            />
          </v-col>

          <v-col cols="12">
            <v-select
              :model-value="props.categoryForm.icon"
              label="アイコン"
              variant="outlined"
              :items="props.availableIcons"
              required
              :rules="[(v) => !!v || 'アイコンを選択してください']"
              @update:model-value="(value) => updateCategoryForm('icon', value)"
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
                <v-list-item v-bind="itemProps">
                  <template #prepend>
                    <v-icon>{{ item.value }}</v-icon>
                  </template>
                </v-list-item>
              </template>
            </v-select>
          </v-col>

          <v-col cols="12">
            <v-select
              :model-value="props.categoryForm.color"
              label="カラー"
              variant="outlined"
              :items="COLOR_OPTIONS"
              required
              :rules="[(v) => !!v || 'カラーを選択してください']"
              @update:model-value="(value) => updateCategoryForm('color', value)"
            >
              <template #selection="{ item }">
                <div class="d-flex align-center">
                  <v-chip
                    :color="item.value"
                    variant="flat"
                    class="mr-2"
                    size="small"
                  />
                </div>
              </template>
              <template #item="{ props: itemProps, item }">
                <v-list-item v-bind="itemProps" :title="''">
                  <template #prepend>
                    <v-chip
                      :color="item.value"
                      variant="flat"
                      size="small"
                    />
                  </template>
                </v-list-item>
              </template>
            </v-select>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="px-6 pb-4">
        <v-spacer />
        <v-btn
          color="grey"
          variant="text"
          @click="handleCancel"
        >
          キャンセル
        </v-btn>
        <v-btn
          color="primary"
          variant="elevated"
          :disabled="!props.categoryForm.name.trim() || !props.categoryForm.icon || !props.categoryForm.color"
          @click="handleSave"
        >
          保存
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
