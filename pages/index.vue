<template>
  <div
    class="flex flex-column min-h-screen justify-center items-center py-12"
  >
    <div class="bg-white rounded-lg p-6 lg:px-12 lg:py-8 shadow-lg max-w-6xl m-auto w-full">
      <AddCarForm />
      <CarTable 
        :cars="cars" 
        @delete-item="deleteCar"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import getCars from '~/apollo/queries/fetchCars.gql';
import deleteCarMutation from '~/apollo/queries/deleteCar.gql';

// Components
import AddCarForm from '../components/AddCarForm/AddCarForm.vue';
import CarTable from '../components/CarTable/CarTable.vue';

export default Vue.extend({
  components: {
    AddCarForm,
    CarTable,
  },

  data: () => ({
    cars: [],
  }),

  // @ts-ignore
  apollo: {
    cars: {
      prefetch: true,
      query: getCars,
    },
  },

  methods: {
    async deleteCar(carId) {
      try {
        await this.$apollo.mutate({
          mutation: deleteCarMutation,
          variables: {
            id: carId,
          },
          update: (store, { data: { createVote } }) => {
            console.log(store, createVote);
          },
        });

        // const newData = await this.$apollo.query({ query: getCars });
        // this.cars = newData.data.cars;
      } catch (error) {
        // eslint-disable-next-line
        console.error(error);
      }
    },
  },
});
</script>
