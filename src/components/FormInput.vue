<template>
  <div class="form-group">
    <label
      :for="params.id"
      class="form__input"
      :class="{ 'form__input_error': isErrorRequired || isErrorLength}"
    >
      <span class="input-label">
        {{ params.label }}
      </span>
      <input
        v-if="params.type == 'tel'"
        :id="params.id"
        :type="params.type"
        :placeholder="params.placeholder"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @blur="isTouched = true"
      >
      <input
        v-else
        :id="params.id"
        :type="params.type"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @blur="isTouched = true"
      >
      <transition name="fade">
        <div
          v-if="isErrorRequired"
          class="input-error"
        >
          {{ isErrorRequired }}
        </div>
      </transition>
    </label>
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  data: () => ({
    requiredErrorText: 'Поле обязательно для заполнения',
    showError: false,
    isTouched: false,
  }),
  props: {
    params: Object,
    value: String,
    valueVuelidate: Object,
  },
  computed: {
    isErrorRequired() {
      if (this.valueVuelidate) {
        if ((this.valueVuelidate.$dirty || this.isTouched) && !this.valueVuelidate.required) {
          return 'Поле обязательно для заполнения';
        }
        if ((this.valueVuelidate.$dirty || this.isTouched) && !this.valueVuelidate?.minLength) {
          return `Поле должно содержать минимум ${this.valueVuelidate.$params.minLength.min} символов`;
        }

      //   return (this.valueVuelidate.$dirty && this.valueVuelidate.$invalid)
      //   || (this.isTouched && this.valueVuelidate.$invalid);
      // } return null;
      } return false;
    },
    isErrorLength() {
      // if (this.valueVuelidate.$dirty && !(this.valueVuelidate.maxLength)) {
      //   return `Поле содержит не более ${this.valueVuelidate.$params.maxLength.max} символов`;
      // } if (this.valueVuelidate.$dirty && !(this.valueVuelidate.minLength)) {
      //   return `Поле должно содержать минимум ${this.valueVuelidate.$params.minLength.min} символов`;
      // } return false;
      return false;
    },
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
  .form__input {
    display: flex;
    flex-direction: column;
    font-weight: 700;
    // margin-bottom: 10px;
    input {
      // margin-bottom: 10px;
      padding: 12px;
      border: 2px solid #22b2ea;
      border-radius: 5px;
      background-color: transparent;
      transition: border-color 0.3s;
    }
    input:hover {
      border: 2px solid #01709c;
    }
    input:focus {
      border: 2px solid #01709c;
    }
  }

  .form__input_error {
    color: rgb(242, 97, 97);
    transition: color 0.3s ease;
    input {
      border: 2px solid rgb(242, 97, 97);
    }
    &:hover,
    &:focus {
      color: red;
      input {
        border: 2px solid red;
      }
    }
  }

  /* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

input[type="date"]::-webkit-calendar-picker-indicator {
    opacity: 1;
    display: block;
    background: 'mdi mdi-24px mdi-clock-outline' no-repeat;
    width: 15px;
    height: 15px;
}

</style>
