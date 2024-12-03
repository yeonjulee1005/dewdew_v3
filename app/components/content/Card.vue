<template>
  <div :class="['class']">
    <ContentSlot :use="$slots.default" />
  </div>
</template>
