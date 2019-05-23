<template>
  <table class="w-full mt-16">
    <thead>
      <tr>
        <th class="text-left">Marke</th>
        <th class="text-left">Modell</th>
        <th class="text-left">Bauart</th>
        <th class="text-left">Antrieb</th>
        <th class="text-left">Grundausstattung</th>
        <th class="text-right">Preis (gesamt)</th>
        <th class="text-right">Preis (pro Monat)</th>
        <th class="text-right">Laufzeit</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in cars" :key="item._id">
        <td>{{ item.manufacturer }}</td>
        <td>{{ item.model }}</td>
        <td>{{ item.buildType }}</td>
        <td>{{ item.energy }}</td>
        <td>
          <ul v-if="item.basicOptions && item.basicOptions.length > 0">
            <li 
              v-for="(option, key) in item.basicOptions"
              :key="key"
            >
              {{ option }}
            </li>
          </ul>
        </td>
        <td>{{ item.priceTotal | toCurrency }}</td>
        <td>{{ item.priceMonthly | toCurrency }}</td>
        <td>{{ item.runtime }} Jahre</td>
        <td>
          <el-button type="danger" icon="el-icon-delete" circle @click="onDeleteItem(item._id)" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

@Component
export default class CarTable extends Vue {
  // ===================================================
  // PROPS
  // ===================================================
  @Prop({ required: true, type: Array }) public cars: object[];

  // ===================================================
  // EMMITED METHODS
  // ===================================================
  @Emit('delete-item')
  onDeleteItem(carId) {
    return carId;
  }
}
</script>

<style lang="scss" scoped>
table {
  border-spacing: 1;
  border-collapse: collapse;
  background: white;
  border-radius: 6px;
  overflow: hidden;
  width: 100%;
  position: relative;

  * {
    @apply relative;
  }

  td,
  th {
    @apply px-4;
  }

  thead {
    tr {
      @apply h-16 bg-gray-200;
    }
  }

  tbody {
    tr {
      @apply h-12 border-0 border-b border-solid border-gray-300;

      &:last-child {
        @apply border-b-0;
      }
    }
  }
}
</style>
