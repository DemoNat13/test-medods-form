<template>
  <div class="form-group">
    <label
      :for="params.id"
      class="form__input"
      :class="{ 'form__input_error': isError}"
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
    isError() {
      if (this.valueVuelidate) {
        return (this.valueVuelidate.$dirty && this.valueVuelidate.$invalid)
        || (this.isTouched && this.valueVuelidate.$invalid);
      } return null;
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

// input[type="date"]::-webkit-calendar-picker-indicator {
//     //display: none;
//     //-webkit-appearance: none;
//     width: 15px;
//     padding: 0px;
//     margin: 0px;
//     color: red !important;
//     // margin-top: 10px;
// }

// .custom-inpt { // style class to adjust the Date Input control default padding value
//     background-color: #01709c !important;
// }
input[type="date"]::-webkit-calendar-picker-indicator {
    opacity: 1;
    display: block;
    background: 'mdi mdi-24px mdi-clock-outline' no-repeat;
    width: 15px;
    height: 15px;
}

</style>
