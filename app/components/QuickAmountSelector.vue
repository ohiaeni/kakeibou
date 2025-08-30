<script setup lang="ts">
interface Props {
  modelValue: number | null
}

interface Emits {
  (e: 'update:modelValue', value: number | null): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// 金額のクイック選択（加算・減算対応）
const handleAmountSelect = (amount: number, event: PointerEvent) => {
  const target = event.target as HTMLElement
  let pressTimer: NodeJS.Timeout | undefined = undefined

  // 長押し検出用の変数
  let isLongPress = false

  const handlePointerUp = () => {
    clearTimeout(pressTimer)
    target.removeEventListener('pointerup', handlePointerUp)
    target.removeEventListener('pointerleave', handlePointerUp)

    if (!isLongPress) {
      // 短押し：加算
      const newValue = (props.modelValue || 0) + amount
      emit('update:modelValue', newValue)
    }
  }

  const handleLongPress = () => {
    isLongPress = true
    // 長押し：減算（0未満にはしない）
    const newAmount = (props.modelValue || 0) - amount
    emit('update:modelValue', Math.max(0, newAmount))
  }

  // 長押し検出（500ms）
  pressTimer = setTimeout(handleLongPress, 500)

  target.addEventListener('pointerup', handlePointerUp)
  target.addEventListener('pointerleave', handlePointerUp)
}
</script>

<template>
  <!-- クイック金額選択 -->
  <div class="mt-4">
    <div class="text-body-2 font-weight-medium text-on-surface mb-2">
      クイック選択
    </div>
    <div class="d-flex flex-wrap justify-center ga-2 mb-2">
      <v-chip
        v-for="amount in [500, 1000, 2000, 3000, 5000, 10000]"
        :key="amount"
        variant="outlined"
        size="small"
        clickable
        style="transition: all 0.2s ease; user-select: none;"
        @pointerdown="handleAmountSelect(amount, $event)"
        @mouseenter="($event.target as HTMLElement).style.transform = 'scale(1.05)'"
        @mouseleave="($event.target as HTMLElement).style.transform = 'scale(1)'"
      >
        ¥{{ amount.toLocaleString() }}
      </v-chip>
    </div>
    <div class="text-caption text-on-surface text-center">
      タップで加算、長押しで減算
    </div>
  </div>
</template>
