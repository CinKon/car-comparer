<template>
  <div class="max-w-2xl">
    <h1>Form</h1>
    <el-form 
      ref="carForm" 
      :model="form"
      :rules="rules" 
      class="mt-12"
    >
      <el-form-item required class="row">
        <label for="">Hersteller</label>
        <el-select v-model="form.manufacturer" placeholder="Hersteller auswählen" required>
          <el-option
            v-for="item in manufacturers"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item required class="row">
        <label for="">Modell</label>
        <el-input v-model="form.model" type="text" required />
      </el-form-item>
      <el-form-item class="row">
        <label for="">Antrieb</label>
        <el-select v-model="form.energy" placeholder="Antriebsart auswählen">
          <el-option
            v-for="item in energy"
            :key="item.key"
            :label="item.title"
            :value="item.key" 
          />
        </el-select>
      </el-form-item>
      <el-form-item class="row">
        <label for="">Bauart</label>
        <el-select v-model="form.buildType" placeholder="Baurt auswählen">
          <el-option
            v-for="item in buildType"
            :key="item.key"
            :label="item.title"
            :value="item.key" 
          />
        </el-select>
      </el-form-item>
      <el-form-item class="row">
        <label for="">Preis (gesamt)</label>
        <el-input v-model="form.priceTotal" type="number" />
      </el-form-item>
      <el-form-item class="row">
        <label for="">Preis/Monat</label>
        <el-input v-model="form.priceMonthly" type="number" />
      </el-form-item>
      <el-form-item class="row">
        <label for="">Laufzeit (Jahre)</label>
        <el-input v-model="form.runtime" type="number" />
      </el-form-item>

      <el-form-item class="row">
        <label for="">Grundausstattung enthält:</label>
        <el-select
          v-model="form.basicOptions"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="Grundausstattung">
          <el-option
            v-for="item in basicOptionsOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <div class="mt-8 text-right">
        <el-button
          :loading="submitLoading"
          type="submit"
          @click="submitForm('carForm')"
        >
          Speichern
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AddCarMutation from '~/apollo/queries/saveCar.gql';
import { manufacturers, energy, buildType } from '~/consts/carOptions.consts';

@Component
export default class AddCarForm extends Vue {
  // ===================================================
  // DATA
  // ===================================================
  public form: object = {
    manufacturer: '',
    model: '',
    priceTotal: '',
    priceMonthly: '',
    runtime: '',
    buildType: '',
    energy: '',
    basicOptions: [],
  };

  public rules = {
    manufacturer: [
      {
        required: true,
        message: 'Bitte Hersteller auswählen',
        trigger: 'blur',
      },
    ],
    model: [
      { required: true, message: 'Bitte Model angeben', trigger: 'blur' },
    ],
    priceTotal: [{ type: 'number' }],
  };

  public manufacturers: string[] = manufacturers;

  public energy: object[] = energy;

  public buildType: object[] = buildType;

  public submitLoading: boolean = false;

  public basicOptionsOptions: object[] = [];

  // ===================================================
  // METHODS
  // ===================================================

  public submitForm(formName) {
    // @ts-ignore
    this.$refs[formName].validate((valid) => {
      console.log(valid);
      if (valid) {
        this.saveForm(formName);
      } else {
        // eslint-disable-next-line
        console.log('error submit!!');
        return false;
      }
    });
  }

  private resetForm(formName) {
    // @ts-ignore
    this.$refs[formName].resetFields();
  }

  public async saveForm(formName) {
    this.submitLoading = true;

    try {
      const variables = this.getVariables(this.form);
      // eslint-disable-next-line
      console.log(variables);

      const response = await this.$apollo.mutate({
        mutation: AddCarMutation,
        variables: {
          input: variables,
        },
      });

      // eslint-disable-next-line
      console.log(response);
      this.resetForm(formName);
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    } finally {
      this.submitLoading = false;
    }
  }

  private getVariables(formData: object): object {
    const output = {};

    Object.keys(formData).forEach((val, index) => {
      output[val] = formData[val];
    });

    return output;
  }
}
</script>

<style scoped>
/deep/ .el-form-item__content {
  @apply flex flex-row items-center;
}

label {
  @apply w-1/3 block;
}

input,
.el-input {
  @apply h-8 w-2/3;
  box-shadow: none;
}

/deep/ .el-select {
  @apply w-2/3;
}
</style>
