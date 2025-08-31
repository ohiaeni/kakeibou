<script setup lang="ts">
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

const colorOptions = [
  { title: 'プライマリー', value: 'primary' },
  { title: 'セカンダリー', value: 'secondary' },
  { title: '成功', value: 'success' },
  { title: '情報', value: 'info' },
  { title: '警告', value: 'warning' },
  { title: 'エラー', value: 'error' },
  { title: '赤', value: 'red' },
  { title: 'ピンク', value: 'pink' },
  { title: '紫', value: 'purple' },
  { title: '青', value: 'blue' },
  { title: '緑', value: 'green' },
  { title: 'オレンジ', value: 'orange' },
]
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
                  <v-list-item-title>{{ item.value }}</v-list-item-title>
                </v-list-item>
              </template>
            </v-select>
          </v-col>

          <v-col cols="12">
            <v-select
              :model-value="props.categoryForm.color"
              label="カラー"
              variant="outlined"
              :items="colorOptions"
              required
              :rules="[(v) => !!v || 'カラーを選択してください']"
              @update:model-value="(value) => updateCategoryForm('color', value)"
            >
              <template #selection="{ item }">
                <div class="d-flex align-center">
                  <v-chip :color="item.value" class="mr-2" size="small" />
                  {{ item.title }}
                </div>
              </template>
              <template #item="{ props: itemProps, item }">
                <v-list-item v-bind="itemProps">
                  <template #prepend>
                    <v-chip :color="item.value" size="small" />
                  </template>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
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
          color="secondary"
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
