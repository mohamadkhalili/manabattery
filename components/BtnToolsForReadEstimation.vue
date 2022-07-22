<template>
  <v-tooltip v-if="tooltip !== null" color="secondary" left>
    <template #activator="{ on, attrs }">
      <v-btn
        color="secondary"
        x-large
        icon
        v-bind="attrs"
        v-on="on"
        @click="$emit('add', type)"
      >
        <v-icon v-show="icon">
          {{ 'mdi-' + icon }}
        </v-icon>
      </v-btn>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
  <v-btn v-else color="secondary" x-large icon @click="$emit('add', type)">
    <v-icon v-show="icon">
      {{ 'mdi-' + icon }}
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'BtnToolsForReadEstimation',
  props: {
    icon: {
      type: String,
      default: '',
    },
    tooltip: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
  },
}
</script>

<style scoped></style>
