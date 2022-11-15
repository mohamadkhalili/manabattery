<template>
  <v-card width="180px" max-height="300px" v-show="data.type" class="ma-2">
    <v-card-actions>
      <v-row>
        <span style="direction: ltr" class="pa-4 pt-5">
          {{ data.coefficient + 'ضریب توان ' }}
        </span>
        <v-spacer />
        <v-btn
          color="red"
          class="ma-2 mt-3"
          icon
          @click="
            () =>
              this.$store.commit(
                'batteryStimation/deleteObjectItem',
                this.$vnode.key
              )
          "
        >
          <v-icon> mdi-delete </v-icon>
        </v-btn>
      </v-row>
    </v-card-actions>
    <v-icon class="mx-10" color="primary" size="80px">{{
      'mdi-' + data.icon
    }}</v-icon>
    <v-card-subtitle class="pt-0 pb-6">{{ data.title }}</v-card-subtitle>
    <v-row class="mx-2 mb-1">
      <v-col cols="12" class="pa-0">
        <v-text-field
          class="mx-2 mb-2"
          :value="data.wat ? data.wat : (data.va * data.coefficient).toFixed(2)"
          @input="
            (event) =>
              this.$store.commit('batteryStimation/changeObjectWat', {
                wat: parseInt(event),
                key: this.$vnode.key,
              })
          "
          label="wat(وات)"
          outlined
          dense
          hide-details
        ></v-text-field>
      </v-col>

      <v-col cols="12" class="pa-0">
        <v-text-field
          class="mx-2 mb-2"
          :value="data.va ? data.va : (data.wat / data.coefficient).toFixed(2)"
          @input="
            (event) =>
              this.$store.commit('batteryStimation/changeObjectVa', {
                va: parseInt(event),
                key: this.$vnode.key,
              })
          "
          label="VA(ولت آمپر)"
          outlined
          dense
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'CardToolsForReadEstimation',
  props: {},
  computed: {
    data() {
      return this.$store.getters['batteryStimation/getObjectItem'](
        this.$vnode.key
      )
    },
  },
}
</script>

<style scoped></style>
