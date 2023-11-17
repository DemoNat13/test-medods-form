<template>
  <div class="form-group">
    <label
      :for="params.id"
      class="form__input"
      :class="{ 'form__input_error': isError}"
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
    hasMinLength: {
      type: Boolean,
      default: false,
    },
    hasMaxLength: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isError() {
      if (this.valueVuelidate) {
        if ((this.valueVuelidate.$dirty || this.isTouched) && !this.valueVuelidate.required) {
          return 'Поле обязательно для заполнения';
        }
        if (this.hasMinLength && (this.valueVuelidate.$dirty || this.isTouched) && !this.valueVuelidate?.minLength) {
          return `Поле должно содержать минимум ${this.valueVuelidate.$params.minLength.min} символов`;
        }
        if (this.hasMaxLength && (this.valueVuelidate.$dirty || this.isTouched) && !this.valueVuelidate?.maxLength) {
          return `Поле должно содержать минимум ${this.valueVuelidate.$params.maxLength.max} символов`;
        }
      } return false;
    },
  },
};
</script>

<style lang="scss" scoped>
  .form__input {
    display: flex;
    flex-direction: column;
    font-weight: 700;
    input {
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
    &:hover {
      color: red;
    }
    input:hover,
    input:focus {
        border: 2px solid red;
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

  input[type="date"] {
    padding: 9.5px 12px;
  }

  input[type="date"]::-webkit-calendar-picker-indicator {
    opacity: 1;
    background: url('../assets/icons/calendar-month-outline.svg') no-repeat;
    width: 24px;
    height: 24px;
    margin: 0;
    padding: 0;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }

</style>
