<template>
  <div
    class="flex flex-column h-screen justify-center items-center bg-gray-100"
  >
    <div class="bg-white rounded-lg p-6 shadow-lg max-w-6xl m-auto w-full">
      <AddCarForm />
      <ul>
        <li v-for="item in cars" :key="item.id">
          {{ item.manufacturer }} {{ item.model }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import getCars from '~/apollo/queries/fetchCars.gql'

// Components
import AddCarForm from '../components/AddCar.form.vue'

export default {
  components: {
    AddCarForm,
  },
  apollo: {
    cars: {
      prefetch: true,
      query: getCars,
    },
  },
}
</script>
