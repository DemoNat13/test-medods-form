<template>
  <div class="form-group">
    <label
      :for="params.id"
      class="form__select"
      :class="{ 'form__select_error': isError }"
    >
      <div class="input-label">
        <span>
          {{ params.label }}
        </span>
        <span
          v-if="params.required"
          class="input-label__required"
        >
          {{params.required}}
        </span>
      </div>
      <select
        :id="params.id"
        :value="value"
        @change="handleSelectChange"
        @blur="isTouched = true"
      >
        <option v-for="item in params.items" :value="item" :key="item">
          {{ item }}
        </option>
      </select>
      <transition name="fade">
        <div
          v-if="isError"
          class="input-error"
        >
          {{ requiredErrorText }}
        </div>
      </transition>
    </label>
  </div>
</template>

<script>
export default {
  name: 'FormSelect',
  props: {
    params: Object,
    value: String,
    valueVuelidate: Object,
  },
  data: () => ({
    showError: false,
    isTouched: false,
    requiredErrorText: 'Поле обязательно для заполнения',
  }),
  computed: {
    isError() {
      if (this.valueVuelidate) {
        return (this.valueVuelidate.$dirty && this.valueVuelidate.$invalid)
        || (this.isTouched && this.valueVuelidate.$invalid);
      } return null;
    },
  },
  methods: {
    handleSelectChange(event) {
      this.$emit('input', event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
  select {
    appearance: none;
    background: url('../assets/icons/menu-down.svg') no-repeat right center;
    background-size: 40px 45px;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding-right: 20px;
  }
</style>
