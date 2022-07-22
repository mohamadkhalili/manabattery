<template>
  <v-card v-show="data.type" class="ma-2">
    <v-card-actions>
      <v-row>
        <v-switch
          class="mr-4"
          v-model="statusWat"
          :label="`${statusWat ? 'wat(وات)' : 'VA(ولت آمپر)'}`"
        ></v-switch>
        <v-spacer />

        <v-btn color="red" class="ma-2 mt-3" icon>
          <v-icon> mdi-delete </v-icon>
        </v-btn>
      </v-row>
    </v-card-actions>
    <v-icon color="primary" size="200px">{{ 'mdi-' + data.icon }}</v-icon>
    <v-card-title>{{ data.title }}</v-card-title>
    <v-text-field
      v-if="statusWat"
      class="mx-2"
      :value="data.wat"
      label="wat(وات)"
      outlined
      dense
    ></v-text-field>
    <v-text-field
      v-else
      class="mx-2"
      :value="data.va"
      label="VA(ولت آمپر)"
      outlined
      dense
    ></v-text-field>
  </v-card>
</template>

<script>
export default {
  name: 'CardToolsForReadEstimation',
  props: {
    valueWat: {
      type: String,
      default: null,
    },
    valueVA: {
      type: String,
      default: null,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      statusWat: true,
    }
  },
}
</script>

<style scoped></style>
