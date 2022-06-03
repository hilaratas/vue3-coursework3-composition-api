<template>
  <div class="modal-backdrop" @click="$emit('close')"></div>
  <div class="modal">
    <slot>
      <h3>Подтвердить действие?</h3>
    </slot>
    <div>
      <button class="btn primary" @click="$emit('sendConfirm', false)">
        <slot name="reject">Нет</slot>
      </button>
      &nbsp;&nbsp;
      <button class="btn danger" @click="$emit('sendConfirm', true)">
        <slot name="confirm">Да</slot>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['close', 'sendConfirm']
}
</script>