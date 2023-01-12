<template>
  <div class="ma-6">
    <v-card class="pa-6" width="100%" height="100%" shaped>
      <v-row>
        <div style="width: 145px !important; display: flex; flex-wrap: inherit">
          <btn-tools-for-read-estimation
            v-for="(item, index) in allObjects"
            :key="index"
            :icon="item.icon"
            :type="item.type"
            :tooltip="item.title"
            @add="addOutput"
          />
        </div>
        <v-row class="mt-2" style="width: calc(100% - 130px)">
          <card-tools-for-read-estimation
            v-for="(item, index) in objectList"
            :key="index"
            :index="index"
            :data="item"
          ></card-tools-for-read-estimation>
        </v-row>
      </v-row>
      <v-text-field
        v-model="time"
        class="mt-8"
        outlined
        dense
        style="max-width: 400px"
        label="مدت زمان(دقیقه)"
        hint="لطفا مدت زمان استفاده از تجهیزات انتخاب شده را وارد کنید."
      ></v-text-field>

      <div class="mt-10 mr-4">
        <div>
          مجموع وات:
          <span>{{ getSumOfWat.toFixed(2) + 'W' }}</span>
        </div>
        <br />

        <div>
          مجموع ولت آمپر:
          <span>{{ getSumOfVa.toFixed(2) + 'VA' }}</span>
        </div>
        <br />

        <div v-if="getSumOfWat !== 0 && getSumOfVa !== 0">
          ضریب توان معادل:
          <span>{{ (getSumOfWat / getSumOfVa).toFixed(2) }}</span>
        </div>
      </div>
      <print-page :time="time" />
    </v-card>
  </div>
</template>

<script>
import CardToolsForReadEstimation from '../components/CardToolsForReadEstimation'
import allObjects from '~/components/objectList.json'
import PrintPage from '~/components/PrintPage'

export default {
  name: 'IndexPage',
  components: {
    PrintPage,
    CardToolsForReadEstimation,
  },
  data() {
    return {
      time: null,
    }
  },
  computed: {
    allObjects() {
      return allObjects
    },
    objectList() {
      return this.$store.state.batteryStimation.objectList
    },
    getSumOfWat() {
      return this.$store.getters['batteryStimation/getSumOfObjects'].sumWat
    },
    getSumOfVa() {
      return this.$store.getters['batteryStimation/getSumOfObjects'].sumVa
    },
  },
  methods: {
    addOutput(type) {
      this.$store.commit('batteryStimation/addObjectList', type)
    },
  },
}
</script>
