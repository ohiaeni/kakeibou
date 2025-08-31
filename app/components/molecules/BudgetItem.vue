<script setup lang="ts">
interface Props {
  id: number
  name: string
  icon: string
  percentage: number
  amount: number
  color?: string
}

interface Emits {
  (e: 'click', id: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleClick = () => {
  emit('click', props.id)
}
</script>

<template>
  <v-card
    class="d-flex align-center justify-center cursor-pointer elevation-1"
    color="surface"
    rounded="lg"
    hover
    @click="handleClick"
  >
    <div class="d-flex flex-column align-center justify-center ga-2 pa-3 w-100 h-100">
      <AtomsProgressCircle
        :value="percentage"
        :color="amount === 0 ? 'grey-lighten-1' : color"
        :display-text="amount === 0 ? '未設定' : `${percentage}%`"
      />
      <AtomsCategoryInfo
        :icon="icon"
        :name="name"
        :color="color"
        :is-active="amount !== 0"
      />
    </div>
  </v-card>
</template>
