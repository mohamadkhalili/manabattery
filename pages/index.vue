<template>
  <div class="ma-6">
    <v-card class="pa-6" width="100%" height="100%" shaped>
      <v-row>
        <div style="width: 100px !important; display: block">
          <btn-tools-for-read-estimation
            v-for="(item, index) in btnData"
            :key="index"
            :icon="item.icon"
            :type="item.type"
            :tooltip="item.title"
            @add="addOutput"
          />
        </div>
        <v-row style="width: calc(100% - 130px)">
          <card-tools-for-read-estimation
            v-for="(item, index) in outputData"
            :key="index"
            :data="item"
          ></card-tools-for-read-estimation>
        </v-row>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      btnData: [
        {
          icon: 'desktop-classic',
          type: 'computer',
          title: 'کامپیوتر',
          wat: 340,
          coefficient: 0.9,
        },
        {
          icon: 'ceiling-fan',
          type: 'fan',
          title: 'پنکه',
          wat: 500,
          coefficient: 0.8,
        },
        {
          icon: 'fridge-top',
          type: 'refrigerator',
          title: 'یخچال',
          va: 1000,
          coefficient: 0.7,
        },
      ],
      outputData: [],
    }
  },
  methods: {
    addOutput(type) {
      this.outputData.push(this.btnData.find((item) => item.type === type))
    },
  },
}
</script>
