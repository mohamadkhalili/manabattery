<template>
  <section class="text-center">
    <section class="px-3 pt-2 d-block d-sm-flex" style="width: 100%">
      <v-text-field
        v-model="power"
        class="ma-1 col-12 col-sm-4"
        outlined
        dense
        label="توان مصرفی (KW)"
        @change="clear"
      />
      <v-text-field
        v-model="volt"
        class="ma-1 col-12 col-sm-4"
        outlined
        dense
        :error-messages="`${
          !volt || volt % 12 !== 0 ? 'ولتاژ باید ضریبی از 12 باشد.' : ''
        }`"
        label="ولتاژ (V)"
        @input="clear"
      />
      <v-select
        v-model="time"
        class="ma-1 col-12 col-sm-4 pl-4"
        outlined
        dense
        label="زمان پشتیبانی (min)"
        :items="timeList"
        @change="clear"
      />
    </section>
    <v-btn
      :disabled="!volt || volt % 12 !== 0 ? true : false"
      class="mt-n1 primary"
      @click="getResult"
      >محاسبه</v-btn
    >

    <v-card v-if="batteryResult && batteryResult.image">
      <p class="text-h6 text-right mr-4">پیشنهادات به ترتیت بهینه می باشد.</p>
      <div class="pt-4 d-flex flex-wrap">
        <template v-for="(item, index) in resultProposals">
          <v-card
            :key="index"
            v-if="index < 4"
            class="mx-auto ma-2"
            width="300px"
            height="520px"
          >
            <div class="pt-4">
              با
              {{ parseInt(item.count) + 1 }}
              ست باتری
              {{ volt / 12 }}
              سلولی
              {{ item.AH + 'َAH' }}
              {{ item.V + 'V' }}
              روشن بمان...
            </div>
            <v-img :src="item.image" />
            <v-card-title class="py-2">
              باتری
              {{ item.AH + 'َAH' }}
              {{ item.V + 'V' }}
              UFO
            </v-card-title>
            <v-card-title class="py-2">
              تعداد
              {{ ((parseInt(item.count) + 1) * volt) / 12 }}
              دستگاه
            </v-card-title>
            <v-card-actions>
              <v-btn :href="item.url" class="primary" width="100%">
                خرید
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </div>
    </v-card>
  </section>
</template>

<script>
export default {
  name: 'BatterySizing',
  data() {
    return {
      timeList: [15, 30, 60, 180, 300, 600, 1200],
      time: null,
      volt: null,
      power: null,
      batterySize: [
        {
          AH: 4.5,
          V: 12,
          url: 'https://manabattery.ir/product/%d8%a8%d8%a7%d8%aa%d8%b1%db%8c-12-%d9%88%d9%84%d8%aa-4-5-%d8%a2%d9%85%d9%be%d8%b1%d8%b3%d8%a7%d8%b9%d8%aa-%db%8c%d9%88%d9%81%d9%88/',
          image:
            'https://manabattery.ir/wp-content/uploads/2022/06/4.5-Ah-UFO.jpg',
        },
        {
          AH: 7.5,
          V: 12,
          url: 'https://manabattery.ir/product/%d8%a8%d8%a7%d8%aa%d8%b1%db%8c-12-%d9%88%d9%84%d8%aa-7-5-%d8%a2%d9%85%d9%be%d8%b1%d8%b3%d8%a7%d8%b9%d8%aa-%db%8c%d9%88%d9%81%d9%88/',
          image:
            'https://manabattery.ir/wp-content/uploads/2022/06/7.5-Ah-UFO.jpg',
        },
        {
          AH: 9,
          V: 12,
          url: 'https://manabattery.ir/product/%d8%a8%d8%a7%d8%aa%d8%b1%db%8c-12-%d9%88%d9%84%d8%aa-9-%d8%a2%d9%85%d9%be%d8%b1%d8%b3%d8%a7%d8%b9%d8%aa-%db%8c%d9%88%d9%81%d9%88/',
          image:
            'https://manabattery.ir/wp-content/uploads/2022/06/9-Ah-UFO.jpg',
        },
        {
          AH: 12,
          V: 12,
          url: 'https://manabattery.ir/product/%d8%a8%d8%a7%d8%aa%d8%b1%db%8c-12-%d9%88%d9%84%d8%aa-12-%d8%a2%d9%85%d9%be%d8%b1%d8%b3%d8%a7%d8%b9%d8%aa-%db%8c%d9%88%d9%81%d9%88/',
          image:
            'https://manabattery.ir/wp-content/uploads/2022/06/12-Ah-UFO.jpg',
        },
        {
          AH: 18,
          V: 12,
          url: 'https://manabattery.ir/product/%d8%a8%d8%a7%d8%aa%d8%b1%db%8c-12-%d9%88%d9%84%d8%aa-18-%d8%a2%d9%85%d9%be%d8%b1%d8%b3%d8%a7%d8%b9%d8%aa-%db%8c%d9%88%d9%81%d9%88/',
          image:
            'https://manabattery.ir/wp-content/uploads/2022/06/18-Ah-UFO.jpg',
        },
        {
          AH: 28,
          V: 12,
          url: 'https://manabattery.ir/product/%d8%a8%d8%a7%d8%aa%d8%b1%db%8c-12-%d9%88%d9%84%d8%aa-28-%d8%a2%d9%85%d9%be%d8%b1%d8%b3%d8%a7%d8%b9%d8%aa-%db%8c%d9%88%d9%81%d9%88/',
          image:
            'https://manabattery.ir/wp-content/uploads/2022/06/28-Ah-UFO-1.jpg',
        },
        {
          AH: 42,
          V: 12,
          url: 'https://manabattery.ir/product/%d8%a8%d8%a7%d8%aa%d8%b1%db%8c-12-%d9%88%d9%84%d8%aa-42-%d8%a2%d9%85%d9%be%d8%b1%d8%b3%d8%a7%d8%b9%d8%aa-%db%8c%d9%88%d9%81%d9%88/',
          image:
            'https://manabattery.ir/wp-content/uploads/2022/06/42-Ah-UFO.jpg',
        },
        {
          AH: 65,
          V: 12,
          url: 'https://manabattery.ir/product/%d8%a8%d8%a7%d8%aa%d8%b1%db%8c-12-%d9%88%d9%84%d8%aa-65-%d8%a2%d9%85%d9%be%d8%b1%d8%b3%d8%a7%d8%b9%d8%aa-%db%8c%d9%88%d9%81%d9%88/',
          image:
            'https://manabattery.ir/wp-content/uploads/2022/06/65-Ah-UFO.jpg',
        },
        {
          AH: 100,
          V: 12,
          url: 'https://manabattery.ir/product/%d8%a8%d8%a7%d8%aa%d8%b1%db%8c-12-%d9%88%d9%84%d8%aa-100-%d8%a2%d9%85%d9%be%d8%b1%d8%b3%d8%a7%d8%b9%d8%aa-%db%8c%d9%88%d9%81%d9%88/',
          image:
            'https://manabattery.ir/wp-content/uploads/2022/06/100-Ah-UFO.jpg',
        },
      ],
      backupList: [
        { time: 15, KT: 0.615530303 },
        { time: 30, KT: 0.981873112 },
        { time: 60, KT: 1.715039578 },
        { time: 180, KT: 3.517316017 },
        { time: 300, KT: 5.574614065 },
        { time: 600, KT: 10 },
        { time: 1200, KT: 18.95043732 },
      ],
      resultProposals: [],
      temp: 1.098901099,
      aging: 1.25,
      result: null,
      batteryResult: null,
      panel: 1,
    }
  },
  methods: {
    clear() {
      this.result = null
      this.batteryResult = null
    },
    getResult() {
      const I = parseInt(this.power * 1000) / parseInt(this.volt)
      this.result =
        I *
        this.temp *
        this.aging *
        this.backupList.find((item) => item.time === parseInt(this.time)).KT
      this.resultProposals = this.batterySize
      this.resultProposals.forEach((item, index) => {
        this.resultProposals[index].count = this.result / item.AH
      })
      this.resultProposals.sort(
        (a, b) =>
          parseInt(a.count) + 1 - a.count - (parseInt(b.count) + 1 - b.count)
      )
      // this.batteryType = this.batterySize.find((item) => item.AH >= this.result)
      console.log(this.resultProposals)
      this.batteryResult = this.resultProposals[0]
    },
  },
}
</script>

<style scoped></style>
