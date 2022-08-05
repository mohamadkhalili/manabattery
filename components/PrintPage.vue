<template>
  <section>
    <v-btn @click="generateReport" class="mt-4 primary mr-4">
      دریافت خروجی
    </v-btn>
    <vue-html2pdf
      ref="html2Pdf"
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
      filename="export-estimation"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      :paginate-elements-by-height="1400"
    >
      <v-col style="padding: 20px; margin: 20px" slot="pdf-content">
        <div class="pdf-item" style="direction: rtl; margin: 30px !important">
          <div>
            <v-divider />
            <v-col>
              <v-row>
                <v-divider vertical />
                <v-col cols="4">نام</v-col>
                <v-divider vertical />
                <v-col cols="3">W</v-col>
                <v-divider vertical />
                <v-col cols="2">ضریب توان</v-col>
                <v-divider vertical />
                <v-col cols="3">VA</v-col>
                <v-divider style="margin-right: 3px" vertical />
              </v-row>
            </v-col>
            <v-divider />
          </div>
          <div v-for="(object, index) in objectList" :key="index">
            <v-col>
              <v-row>
                <v-divider vertical />
                <v-col cols="4">{{ object.title }}</v-col>
                <v-divider vertical />
                <v-col cols="3">{{
                  object.wat
                    ? object.wat
                    : (object.va * object.coefficient).toFixed(2)
                }}</v-col>
                <v-divider vertical />
                <v-col cols="2">{{ object.coefficient }}</v-col>
                <v-divider vertical />
                <v-col cols="3">{{
                  object.va
                    ? object.va
                    : (object.wat / object.coefficient).toFixed(2)
                }}</v-col>
                <v-divider style="margin-right: 3px" vertical />
              </v-row>
            </v-col>
            <v-divider />
          </div>
          <div>
            <v-col>
              <v-row>
                <v-divider vertical />
                <v-col cols="4">مجموع</v-col>
                <v-divider vertical />
                <v-col cols="3">{{ getSumOfWat.toFixed(2) }}</v-col>
                <v-divider vertical />
                <v-col cols="2">{{
                  (getSumOfWat / getSumOfVa).toFixed(2)
                }}</v-col>
                <v-divider vertical />
                <v-col cols="3">{{ getSumOfVa.toFixed(2) }}</v-col>
                <v-divider style="margin-right: 3px" vertical />
              </v-row>
            </v-col>
            <v-divider />
          </div>
        </div>
      </v-col>
    </vue-html2pdf>
  </section>
</template>

<script>
export default {
  name: 'PrintPage',
  computed: {
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
    generateReport() {
      this.$refs.html2Pdf.generatePdf()
    },
  },
}
</script>

<style scoped></style>
