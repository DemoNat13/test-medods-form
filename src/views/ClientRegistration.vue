<template>
  <div class="main">
    <div class="form__text">Новый клиент</div>
    <form class="form">
      <div class="form__block block__personal">
        <h3 class="form__subheader">
          Личные данные
        </h3>
        <div class="form__row">
          <form-input
            v-model="$v.form.name.$model"
            class="form__input"
            :value-vuelidate="$v.form.name"
            :params="paramsForFields.name"
          />
          <form-input
            v-model="$v.form.surname.$model"
            class="form__input"
            :params="paramsForFields.surname"
            :value-vuelidate="$v.form.surname"
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
            :value-vuelidate="$v.form.surname"
            class="form__input form__input_birth"
          />
        </div>
         <div class="form__row">
          <form-input
            v-model="$v.form.phone.$model"
            :params="paramsForFields.phone"
            :value-vuelidate="$v.form.phone"
            class="form__input form__input_phone"
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
              <div class="input-label">
                <span>
                  {{ paramsForFields.clientGroups.label }}
                </span>
                <span
                  v-if="paramsForFields.clientGroups.required"
                  class="input-label__required"
                >
                  {{ paramsForFields.clientGroups.required }}
                </span>
              </div>
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

              <div
                v-if="isError"
                class="select-error"
              >
                {{ isError }}
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
          label: 'Имя',
          id: 'name',
          required: '*',
        },
        surname: {
          type: 'text',
          label: 'Фамилия',
          required: '*',
          id: 'surname',
        },
        patronymic: {
          type: 'text',
          label: 'Отчество',
          id: 'patronymic',
        },
        birthDate: {
          type: 'date',
          label: 'Дата рождения',
          required: '*',
          id: 'birth-date',
        },
        clientSex: {
          label: 'Пол',
          id: 'sex',
          items: this.clientSex,
        },
        phone: {
          type: 'tel',
          label: 'Номер телефона',
          id: 'phone',
          required: '*',
          placeholder: '7-XXX-XXX-XX-XX',
        },
        doctor: {
          label: 'Лечащий врач',
          id: 'doctor',
          required: '*',
          items: this.doctorName,
        },
        clientGroups: {
          label: 'Группа клиентов',
          id: 'clientGroup',
          required: '*',
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
          label: 'Город',
          required: '*',
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
          label: 'Тип документа',
          required: '*',
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
          label: 'Дата выдачи',
          required: '*',
          id: 'issueDate',
        },
      };
    },
    isError() {
      if (this.valueVuelidate) {
        return (this.valueVuelidate.$dirty && this.valueVuelidate.$invalid)
        || (this.isTouched && this.valueVuelidate.$invalid);
      } return null;
    },
  },
  methods: {
    showRequiredError(val) {
      return val ? 'Поле обязательно для заполнения' : null;
    },
    handleSelectChange(event) {
      this.$emit('input', event.target.value);
      console.log('event.target.value', event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
  .main {
    position: relative;
    flex-grow: 1;
    padding: 10%;
    background: linear-gradient(to top,#01709c, #01709c92,#22b1ea98, white);
    z-index: 1;
  }

  .form {
    display: flex;
    flex-direction: column;
    background-color: transparent;
  }

  .form__block {
    padding: 20px;
    margin-bottom: 50px;
    background-color: white;
    border-radius: 5px;
    box-shadow: -2px -2px 10px rgba(0, 0, 0, 0.5);
  }

  .form__text {
    display: block;
    box-sizing: border-box;
    position: absolute;
    margin-left: -40px;
    margin-top: -60px;
    width: 40%;
    height: 80%;
    padding: 20px 40px;
    color: white;
    background-color: #17799f;
    border-radius: 5px;
    box-shadow: -2px 2px 5px 2px rgba(0, 0, 0, 0.5);
    font-size: 20px;
    font-weight: 500;
    z-index: -1;
  }

  .form__subheader {
    margin: 0;
    padding-bottom: 10px;
    margin-bottom: 20px;
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

</style>
