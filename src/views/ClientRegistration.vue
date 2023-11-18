<template>
  <div class="main">
    <h2 class="form__text">Новый клиент</h2>
    <form class="form">
      <div class="form__block block__personal">
        <h3 class="form__subheader">
          Личные данные
        </h3>
        <p>* - обязательные поля</p>
        <div class="form__row">
          <form-input
            v-model="$v.form.name.$model"
            class="form__input"
            :value-vuelidate="$v.form.name"
            :params="paramsForFields.name"
            hasMinLength
          />
          <form-input
            v-model="$v.form.surname.$model"
            class="form__input"
            :params="paramsForFields.surname"
            :value-vuelidate="$v.form.surname"
            hasMinLength
          />
          <form-input
            v-model="form.patronymic"
            class="form__input"
            :params="paramsForFields.patronymic"
          />
        </div>
        <div class="form__row">
          <form-select
            :params="paramsForFields.clientSex"
            v-model="form.sex"
            class="form__input form__input_sex"
          />
          <form-input
            v-model="$v.form.birthDate.$model"
            :params="paramsForFields.birthDate"
            :value-vuelidate="$v.form.birthDate"
            class="form__input form__input_birth"
          />
        </div>
         <div class="form__row">
          <form-input
            v-model="$v.form.phone.$model"
            :params="paramsForFields.phone"
            :value-vuelidate="$v.form.phone"
            class="form__input form__input_phone"
            hasMinLength
            hasMaxLength
          />
          <form-select
            v-model="$v.form.doctor.$model"
            :params="paramsForFields.doctor"
            :value-vuelidate="$v.form.doctor"
            class="form__input"
          />
        </div>
        <div class="form__row">
          <div class="form-group">
            <label
              for="paramsForFields.clientGroups.id"
              class="form__select select_multiple"
              :class="{ 'form__select_error': isError }"
            >
              <span class="input-label">
                {{ paramsForFields.clientGroups.label }}
              </span>
              <select
                id="paramsForFields.clientGroups.id"
                v-model=" $v.form.clientGroup.$model"
                @change="handleSelectChange"
                @blur="isTouched = true"
                multiple
              >
                <option selected disabled>Выберите категорию</option>
                <option> Проблемные </option>
                <option> VIP </option>
                <option> OMC </option>
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
        </div>
        <div class="form__row">
          <div class="form-group">
            <label
              for="no-sms"
              class="form__checkbox"
            >
              <input
                id="no-sms"
                v-model="form.notSendSMS"
                type="checkbox"
                checked
                @click="form.notSendSMS = !form.notSendSMS"
              >
              <span class="checkbox__text">Не присылать SMS</span>
            </label>
          </div>
        </div>
      </div>
      <div class="form__block block__address">
        <h3 class="form__subheader">
          Адрес
        </h3>
        <p>* - обязательные поля</p>
        <div class="form__row">
          <form-input
              v-model="form.index"
              class="form__input"
              :params="paramsForFields.index"
            />
          <form-input
            v-model="form.country"
            class="form__input"
            :params="paramsForFields.country"
          />
        </div>
        <div class="form__row">
          <form-input
              v-model="form.region"
              class="form__input"
              :params="paramsForFields.region"
            />
          <form-input
            v-model="$v.form.city.$model"
            class="form__input"
            :params="paramsForFields.city"
            :value-vuelidate="$v.form.city"
          />
        </div>
        <div class="form__row">
          <form-input
              v-model="form.street"
              class="form__input"
              :params="paramsForFields.street"
            />
          <form-input
            v-model="form.house"
            class="form__input"
            :params="paramsForFields.house"
          />
        </div>
      </div>
      <div class="form__block block__address">
        <h3 class="form__subheader">
          Документ, удостоверяющий личность
        </h3>
        <p>* - обязательные поля</p>
        <div class="form__row">
          <form-select
            :params="paramsForFields.docType"
            v-model="$v.form.docType.$model"
            class="form__input"
            :value-vuelidate="$v.form.docType"
          />
          <form-input
            v-model="form.docSeries"
            class="form__input"
            :params="paramsForFields.docSeries"
          />
          <form-input
            v-model="form.docNumber"
            class="form__input"
            :params="paramsForFields.docNumber"
          />
        </div>
        <div class="form__row">
          <form-input
            v-model="form.docIssuedBy"
            class="form__input"
            :params="paramsForFields.docIssuedBy"
          />
          <form-input
            v-model="$v.form.docIssueDate.$model"
            class="form__input"
            :params="paramsForFields.docIssueDate"
            :value-vuelidate="$v.form.docIssueDate"
          />
        </div>
      </div>
    </form>
    <div class="form__success">
      <transition name="fade">
        <div
          v-if="!$v.$invalid"
          class="form__success-block"
        >
          <div class="form__success-icon"></div>
          <p class="form__success-text">
            Клиент успешно создан
          </p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import FormInput from '../components/FormInput.vue';
import FormSelect from '../components/FormSelect.vue';

export default {
  components: {
    FormInput,
    FormSelect,
  },
  data: () => ({
    testName: 'hello',
    showError: false,
    isTouched: false,
    form: {
      name: '',
      surname: '',
      birthDate: '',
      sex: '',
      phone: '',
      clientGroup: [],
      notSendSMS: true,
      doctor: '',
      index: '',
      country: '',
      region: '',
      city: '',
      street: '',
      house: '',
      docType: '',
      docSeries: '',
      docNumber: '',
      docIssuedBy: '',
      docIssueDate: '',
    },
    clientSex: {
      man: 'Мужской',
      woman: 'Женский',
    },
    doctorName: [
      'Иванов',
      'Захаров',
      'Чернышева',
    ],
    clientGroups: [
      'VIP',
      'Проблемные',
      'ОМС',
    ],
    clientDocs: {
      passport: 'Паспорт',
      birthCertif: 'Свидетельство о рождении',
      drivLicence: 'Вод. удостоверение',
    },
  }),
  validations() {
    return {
      testName: { required },
      form: {
        name: {
          required,
          minLength: minLength(3),
        },
        surname: {
          required,
          minLength: minLength(3),
        },
        birthDate: {
          required,
        },
        phone: {
          required,
          minLength: minLength(11),
          maxLength: maxLength(11),
        },
        clientGroup: {
          required,
        },
        doctor: {
          required,
        },
        city: {
          required,
        },
        docType: {
          required,
        },
        docIssueDate: {
          required,
        },
      },
    };
  },
  computed: {
    paramsForFields() {
      return {
        name: {
          type: 'text',
          label: 'Имя *',
          id: 'name',
        },
        surname: {
          type: 'text',
          label: 'Фамилия *',
          id: 'surname',
        },
        patronymic: {
          type: 'text',
          label: 'Отчество',
          id: 'patronymic',
        },
        birthDate: {
          type: 'date',
          label: 'Дата рождения *',
          id: 'birthDate',
        },
        clientSex: {
          label: 'Пол',
          id: 'sex',
          items: this.clientSex,
        },
        phone: {
          type: 'tel',
          label: 'Номер телефона *',
          id: 'phone',
          placeholder: '7XXXXXXXXXX',
        },
        doctor: {
          label: 'Лечащий врач *',
          id: 'doctor',
          items: this.doctorName,
        },
        clientGroups: {
          label: 'Группа клиентов *',
          id: 'clientGroup',
          items: this.clientGroups,
        },
        index: {
          type: 'number',
          label: 'Индекс',
          id: 'index',
        },
        country: {
          type: 'text',
          label: 'Страна',
          id: 'country',
        },
        region: {
          type: 'text',
          label: 'Область',
          id: 'region',
        },
        city: {
          type: 'text',
          label: 'Город *',
          id: 'city',
        },
        street: {
          type: 'text',
          label: 'Улица',
          id: 'street',
        },
        house: {
          type: 'number',
          label: 'Дом',
          id: 'house',
        },
        docType: {
          items: this.clientDocs,
          label: 'Тип документа *',
          id: 'docType',
        },
        docSeries: {
          type: 'number',
          label: 'Серия',
          id: 'docSeries',
        },
        docNumber: {
          type: 'number',
          label: 'Номер документа',
          id: 'docNumber',
        },
        docIssuedBy: {
          type: 'text',
          label: 'Кем выдан',
          id: 'issuedBy',
        },
        docIssueDate: {
          type: 'date',
          label: 'Дата выдачи *',
          id: 'issueDate',
        },
      };
    },
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
  .main {
    flex-grow: 1;
    padding: 1% 10%;
    background-color: rgb(239 251 255 / 50%);
  }

  .form {
    display: flex;
    flex-direction: column;
    background-color: transparent;
  }

  .form__text {
    font-size: 1.9em;
  }

  .form__block {
    padding: 20px;
    margin-bottom: 50px;
    background-color: white;
    border-radius: 5px;
    box-shadow: -2px -2px 10px rgba(0, 0, 0, 0.5);
  }

  .form__row {
    display: flex;
    flex-direction: row;
    column-gap: 2%;
    flex-wrap: wrap;
  }

  .form__input {
    flex-grow: 1;
  }

  .form__input_sex,
  .form__input_birth,
  .form__input_phone {
    flex: 1 2 auto;
  }

.form__checkbox input {
  position: absolute;
  z-index: -1;
  opacity: 0;
  margin: 10px 0 0 20px;
}

.checkbox__text {
  position: relative;
  padding: 0 0 0 60px;
  font-weight: 600;
  cursor: pointer;
}

.checkbox__text:before {
  content: '';
  position: absolute;
  top: -4px;
  left: 0;
  width: 50px;
  height: 26px;
  border-radius: 13px;
  background: #CDD1DA;
  box-shadow: inset 0 2px 3px rgba(0,0,0,.2), 0 0 0 2px #22b2ea;
  transition: .2s;
}

.checkbox__text:after {
  content: '';
  position: absolute;
  top: -2px;
  left: 2px;
  width: 22px;
  height: 22px;
  border-radius: 10px;
  background: #FFF;
  box-shadow: 0 2px 5px rgba(0,0,0,.3);
  transition: .2s;
}

.form__checkbox input:checked + .checkbox__text:before {
  background: #22b2ea;
}

.form__checkbox input:checked + .checkbox__text:after {
  left: 26px;
}

.form__checkbox input:focus + .checkbox__text:before {
  box-shadow: inset 0 2px 3px rgba(0,0,0,.2), 0 0 0 2px #01709c;
}

.form__checkbox input:hover + .checkbox__text:before {
  box-shadow: inset 0 2px 3px rgba(0,0,0,.2), 0 0 0 2px #01709c;
}
.form__success {
  position: fixed;
  z-index: 1;
  top: 20px;
  right: 20px;
}

.form__success-block {
  display: flex;
  column-gap: 10px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #22b1ea1d;
  border: 2px solid #22b2ea;
  border-radius: 5px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.form__success-text {
  width: fit-content;
  box-sizing: border-box;
  margin: 0;
  font-size: 18px;
}

.form__success-icon {
  width: 30px;
  height: 30px;
  background: url('../assets/icons/check-all.svg')no-repeat;
}

</style>
