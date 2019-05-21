<template>
  <div class="max-w-2xl mx-auto">
    <h1>Form</h1>
    <div class="row">
      <label for="">Hersteller</label>
      <input v-model="form.manufacturer" type="text" />
    </div>
    <div class="row">
      <label for="">Modell</label>
      <input v-model="form.model" type="text" />
    </div>
    <div class="row">
      <label for="">Preis (gesamt)</label>
      <input v-model="form.priceTotal" type="text" />
    </div>
    <div class="row">
      <label for="">Preis/Monat</label>
      <input v-model="form.priceMonth" type="text" />
    </div>

    <div class="mt-8 text-right">
      <button
        class="rounded bg-green-600 px-3 py-2 text-white shadow-md text-sm border-none uppercase tracking-wide font-bold"
        type="submit"
        @click="saveForm"
      >
        Speichern
      </button>
    </div>
  </div>
</template>

<script>
import AddCarMutation from '~/apollo/queries/saveCar.gql'

export default {
  data: () => ({
    form: {
      manufacturer: '',
      model: '',
      priceTotal: '',
      priceMonth: '',
    },
  }),

  methods: {
    async saveForm() {
      try {
        const response = await this.$apollo.mutate({
          mutation: AddCarMutation,
          variables: {
            input: {
              manufacturer: this.form.manufacturer,
              model: this.form.model,
            },
          },
        })

        // eslint-disable-next-line
        console.log(response)
      } catch (error) {
        // eslint-disable-next-line
        console.error(error)
      }
    },
  },
}
</script>

<style scoped>
.row {
  @apply flex flex-row mt-4 items-center;
}

label {
  @apply w-1/3;
}

input {
  @apply rounded border border-gray-300 h-8 w-2/3 text-sm px-2;
}
</style>
