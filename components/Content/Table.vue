<template>
  <div :class="['class']">
    <ContentSlot
      :use="$slots.default"
      unwrap="p"
    />
  </div>
</template>
