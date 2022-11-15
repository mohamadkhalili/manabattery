<template>
  <section>
    <v-btn
      :disabled="activeOutput"
      @click="generateReport"
      class="mt-4 primary mr-4"
    >
      دریافت خروجی
    </v-btn>
    <p class="mt-4 mr-4" v-if="activeOutput">لطفا اطلاعات را تکمیل نمایید.</p>
    <vue-html2pdf
      ref="html2Pdf"
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
      filename="export-estimation"
      :pdf-quality="2"
      :manual-pagination="true"
      pdf-format="a4"
      :paginate-elements-by-height="2400"
    >
      <v-col
        style="padding: 20px; margin: 20px; text-align: center"
        slot="pdf-content"
      >
        <div class="pdf-item">
          <img
            src="/nuxt/header1.jpg"
            style="width: 100%; position: absolute; top: 0px; right: 0px"
          />

          <div style="margin-top: 160px; direction: rtl; margin-right: 50px">
            <p
              class="text-center"
              style="width: 100%; text-align: center; margin-top: 26px"
            >
              با نام مانای او
            </p>
            <p style="text-align: justify">
              گزارش حاضر براساس انتخاب شما آماده گردیده است. در این خصوص ذکر چند
              نکته لازم به نظر می‌رسد:
            </p>
            <p style="text-align: justify">
              1- مصرفی دستگاههای نرمال موجود در بازار را پوشش می‌دهند و اگر
              کاربر از دستگاه خاصی استفاده می‌کند (مانند کامپیوترهای گیمینگ،
              پرینترهای چاپخانه‌ای و...) میزان توان باید براساس توان مصرفی واقعی
              آن تجهیز وارد شود لذا قابلیت وارد کردن توان بصورت دستی در سیستم
              تخمین بار درنظرگرفته شده است.
            </p>
            <p style="text-align: justify">
              2- جهت حصول اطمینان از تخمین بار و در نهایت سایزینگ مناسب تجهیز
              برق اضطراری شرکت حامی انرژی مانا پیشنهاد می‌دهد %20 مازاد بر خروجی
              تخمین بار انجام شده برای توان دستگاه برق اضطراری درنظرگرفته شود.
              لذا خروجی دریافتی شامل مقدار واقعی و مقدار با %20 مازاد بر توان
              اعلامی می‌باشد.
            </p>

            <p style="text-align: justify">
              در ارتباط با زمان پشتیبانی، ذکر این نکته بسیار حائز اهمیت می‌باشد
              که نوع تجهیز برق اضطراری انتخابی عامل اصلی در انتخاب آن می‌باشد.
              به طور مثال زمان انتخابی برای دیزل ژنراتور بسیار متفاوت از UPS
              می‌باشد. زمان پشتیبانی UPS بسیار کمتر از دیزل ژنراتور می‌باشد و در
              این زمان صرفاً باید تجهیزات برقی متصل به UPS را در وضعیت پایدار
              قرار دهیم تا برق اصلی وصل شود (مثلا اگر کامپیوتر متصل است فایل‌ها
              را ذخیره کرده و سپس خاموش کنیم) در حالیکه دیزل ژنراتور امکان
              استفاده برای ساعت‌ها را دارا می‌باشد.
            </p>
            <line-chart
              class="ma-2"
              :chart-options="chartOptions"
              :chart-data="chartData"
              chart-id="myCustomId"
              style="
                max-height: 300px;
                width: 300px;
                margin-inline: auto;
                margin-top: 10px;
              "
            />
          </div>
          <img
            src="/nuxt/footer.jpg"
            style="width: 100%; position: absolute; top: 1000px; right: 0px"
          />
        </div>
        <div class="html2pdf__page-break" />

        <div
          class="pdf-item"
          style="direction: rtl; margin: 30px !important; min-height: 870px"
        >
          <img
            src="/nuxt/header1.jpg"
            style="width: 100%; position: absolute; top: 1120px; right: 0px"
          />

          <div style="margin-top: 160px; margin-right: 20px">
            <div>
              <v-divider />
              <v-col>
                <v-row>
                  <v-divider vertical />
                  <v-col cols="1">ردیف</v-col>
                  <v-divider vertical />
                  <v-col cols="3">نام دستگاه</v-col>
                  <v-divider vertical />
                  <v-col cols="3">توان اکتیو مصرفی (W)</v-col>
                  <v-divider vertical />
                  <v-col cols="2">ضریب توان (P.F)</v-col>
                  <v-divider vertical />
                  <v-col cols="3">توان ظاهری مصرفی (VA)</v-col>
                  <v-divider style="margin-right: 3px" vertical />
                </v-row>
              </v-col>
              <v-divider />
            </div>
            <div v-for="(object, index) in objectList" :key="index">
              <v-col>
                <v-row>
                  <v-divider vertical />
                  <v-col cols="1">{{ index + 1 }}</v-col>
                  <v-divider vertical />
                  <v-col cols="3">{{ object.title }}</v-col>
                  <v-divider vertical />
                  <v-col cols="3"
                    >{{
                      object.wat
                        ? object.wat
                        : (object.va * object.coefficient).toFixed(2)
                    }}
                  </v-col>
                  <v-divider vertical />
                  <v-col cols="2">{{ object.coefficient }}</v-col>
                  <v-divider vertical />
                  <v-col cols="3"
                    >{{
                      object.va
                        ? object.va
                        : (object.wat / object.coefficient).toFixed(2)
                    }}
                  </v-col>
                  <v-divider style="margin-right: 3px" vertical />
                </v-row>
              </v-col>
              <v-divider />
            </div>
            <div>
              <v-col>
                <v-row>
                  <v-divider vertical />
                  <v-col cols="4" style="font-weight: bold">بار مصرفی</v-col>
                  <v-divider vertical />
                  <v-col cols="3">{{ getSumOfWat.toFixed(2) }}</v-col>
                  <v-divider vertical />
                  <v-col cols="2"
                    >{{ (getSumOfWat / getSumOfVa).toFixed(2) }}
                  </v-col>
                  <v-divider vertical />
                  <v-col cols="3">{{ getSumOfVa.toFixed(2) }}</v-col>
                  <v-divider style="margin-right: 3px" vertical />
                </v-row>
              </v-col>
              <v-divider />
            </div>
            <div>
              <v-col>
                <v-row>
                  <v-divider vertical />
                  <v-col cols="4" style="font-weight: bold"
                    >بار مصرفی با 20% مازاد (Spare)
                  </v-col>
                  <v-divider vertical />
                  <v-col cols="3">{{ getSumOfWat.toFixed(2) * 1.2 }}</v-col>
                  <v-divider vertical />
                  <v-col cols="2"
                    >{{ (getSumOfWat / getSumOfVa).toFixed(2) }}
                  </v-col>
                  <v-divider vertical />
                  <v-col cols="3">{{ getSumOfVa.toFixed(2) * 1.2 }}</v-col>
                  <v-divider style="margin-right: 3px" vertical />
                </v-row>
              </v-col>
              <v-divider />
            </div>
          </div>
          <img
            src="/nuxt/footer.jpg"
            style="
              width: 100%;
              position: absolute;
              right: 0px;
              top: 2100px;
              margin-top: auto;
              z-index: 9999;
            "
          />
        </div>
      </v-col>
    </vue-html2pdf>
  </section>
</template>

<script>
export default {
  name: 'PrintPage',
  props: {
    time: String,
  },
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
  watch: {
    getSumOfWat() {
      this.setDataChart()
      if (parseFloat(this.getSumOfWat) > 0 && parseInt(this.time) > 0) {
        this.activeOutput = false
      }
    },
    time() {
      this.chartData.labels = [0 + ' Minutes', parseInt(this.time) + ' Minutes']
      this.activeOutput = true
      if (parseFloat(this.getSumOfWat) > 0 && parseInt(this.time) > 0) {
        setTimeout(() => {
          this.activeOutput = false
        }, 1000)
      }
    },
  },
  data() {
    return {
      activeOutput: true,
      chartOptions: {
        title: {
          display: true,
          text: 'Total Power',
        },
      },
      chartData: {
        labels: [0, 120],
        datasets: [
          {
            data: [120, 120],
            label: 'KW',
            borderColor: '#3e95cd',
            fill: true,
          },
        ],
      },
    }
  },
  methods: {
    generateReport() {
      this.$refs.html2Pdf.generatePdf()
    },
    setDataChart() {
      this.chartData.labels = [0 + ' Minutes', parseInt(this.time) + ' Minutes']
      this.chartData.datasets[0].data = [
        parseFloat(this.getSumOfWat) / 1000,
        parseFloat(this.getSumOfWat) / 1000,
      ]
    },
  },
  created() {
    this.setDataChart()
  },
}
</script>

<style scoped></style>
