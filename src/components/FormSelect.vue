<template>
  <div class="form-group">
    <label
      :for="params.id"
      class="form__select"
      :class="{ 'form__input_error': isError }"
    >
      <span class="input-label">
        {{ params.label }}
      </span>
      <select
        :id="params.id"
        :value="value"
        @change="handleSelectChange"
        @blur="isTouched = true"
      >
        <option
          v-for="item in params.items"
          :value="item"
          :key="item"
        >
          {{ item }}
        </option>
      </select>
      <div class="input-error__wrapper">
        <transition name="fade">
          <div
            v-if="isError"
            class="input-error"
          >
            {{ isError }}
          </div>
        </transition>
      </div>
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
  }),
  computed: {
    isError() {
      if (this.valueVuelidate) {
        if ((this.valueVuelidate.$dirty || this.isTouched) && !this.valueVuelidate.required) {
          return 'Поле обязательно для заполнения';
        }
      } return false;
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
  background: url('../assets/icons/chevron-down.svg') no-repeat 98% center;
  background-size: 30px 30px;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 24px !important;
}
</style>
