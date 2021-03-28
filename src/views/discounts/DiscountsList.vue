<template>
  <div>
    <!--    update modal-->
    <vs-popup
        style="color:rgb(255,255,255)"
        dir="rtl"
        background-color="rgba(255,255,255,.6)"
        :background-color-popup="colorx" title="ویرایش کد تخفیف" :active.sync="popupActivo5">
      <label style="color: #fff;margin:4px 0">
        تعداد مجاز استفاده :
      </label>
      <div class="form-group">
        <VueInputUi @keydown="validateNumber($event)" type="number" label="تعداد..." v-model="count_of_useable"/>
      </div>
      <label style="color: #fff;margin:4px 0">
        تاریخ انقضا :
      </label>
      <div class="form-group">
        <vue-persian-datetime-picker @change="changeDate" :min="min_date" v-model="date"></vue-persian-datetime-picker>
      </div>
      <label style="color: #fff;margin:4px 0">
       درصد تخفیف :
      </label>
      <div class="form-group">
        <VueInputUi @keyup="checkDiscountValidationKeyUp($event)" @keydown="checkNumber($event)" type="number" label="درصد..." v-model="discount_value"/>

      </div>
      <label style="color: #fff;margin:4px 0">
        تاریخ به شمسی :
      </label>
      <div class="form-group">
        <VueInputUi disabled="true" type="text" label="تاریخ به شمسی..." v-model="jalali_date"/>
      </div>
      <div class="form-group d-flex">
        <div @click="update" class="submit_button">
          ثبت
        </div>
      </div>
    </vs-popup>


    <span style="display: inline-block" @click="deleteItems" class="delete_button">
            <box-icon color="#fff" name='trash'></box-icon>
        </span>
    <div class="form-group">
      <VueInputUi @keyup="searchInTable" type="array" label="جستجو..." v-model="search_value"/>
    </div>
    <vue-good-table mode="remote"
                    :line-numbers="true"
                    :rtl="true"
                    :columns="columns"
                    :rows="rows"
                    @on-cell-click="onCellClick"
    />
    <template v-if="show_pagination">
      <div dir="ltr" style="margin-top: 20px;margin-bottom: 100px">
        <vs-pagination :total="last_page" v-model="current"></vs-pagination>
      </div>
    </template>
  </div>
</template>

<script>
import DiscountService from "@/services/DiscountServices/DiscountService";
import HelperClass from "@/services/HelperClass";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";

let moment = require('moment-jalaali')
moment.loadPersian([
  {dialect: 'persian-modern', usePersianDigits: true}
])
const VueInputUi = () => import('vue-input-ui');
export default {
  name: "ArticleCategoryList",
  created() {
    this.$store.state.loading = true;
    this.$store.state.pageTitle = 'سطل زباله دسته بندی های مقالات';
    this.getList();
  },
  data() {
    return {
      colorx: "#4a5153",
      popupActivo5: false,
      show_pagination: true,
      current: 1,
      discount_value:'',
      discount_id: '',
      search_value: '',
      min_date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      selected: [],
      count_of_useable: '',
      date: '',
      jalali_date: '',
      columns: [
        {
          label: 'کد',
          field: 'code',
        },
        {
          label: 'تاریخ انقضا',
          field: 'expire_date',
          html: true
        },
        {
          label: 'دفعات مجاز استفاده',
          field: 'count_of_useable',
          html: true
        },
        {
          label: 'دفعات استفاده شده',
          html: true,
          field: 'used'
        },
        {
          label: 'condition',
          field: 'condition',
          hidden: true
        },
        {
          label: 'وضعیت',
          field: 'status',
          html: true,
        },
        {
          label: 'درصد تخفیف',
          field: 'percent',
          html: true,
        },
        {
          label: 'discount',
          field: 'discount',
          hidden: true
        },
        {
          label: 'ویرایش',
          field: 'edit',
          html: true
        },
        {
          label: 'number',
          field: 'number',
          hidden: true
        },
        {
          label: 'تاریخ',
          field: 'date',
          hidden: true
        },
        {
          label: 'تغییر وضعیت',
          field: 'switch_condition',
          html: true,
        },
        {
          label:'لیست کاربران',
          field: 'users',
          html: true
        },
        {
          label: 'انتخاب',
          field: 'delete',
          html: true
        }
      ],
      rows: [],
      last_page: 0
    }
  },
  watch: {
    current(value) {
      this.$store.state.loading = true;
      DiscountService.paginate(value)
          .then(res => {
            let list = [];
            res.data.data.data.forEach(item => {
              list.push(
                  {
                    id: item.id,
                    code: item.code,
                    number:item.count_of_useable,
                    date: item.expire_date,
                    discount:parseFloat(item.percent),
                    users:'<span class="active_button"><box-icon color=\'#fff\' name=\'show-alt\'></box-icon></span>',
                    expire_date: moment(item.expire_date).format('jYYYY-jM-jD'),
                    condition: item.status,
                    edit: '<i  title="ویرایش" class="active_it"><box-icon color="green" type=\'solid\' name=\'message-edit\'></box-icon></i>',
                    count_of_useable: '<span class="deactive_button">' + HelperClass.numberFormat(item.count_of_useable) + '</span>',
                    used: '<span class="active_button">' + item.used + '</span>',
                    percent: '<span class="active_button">' + parseFloat(item.percent) + '</span>',
                    status: item.status ? '<span class="active_button">فعال</span>' : '<span class="deactive_button">غیر فعال</span>',
                    switch_condition: item.status ? "<i class='active_it' title='غیر فعال کن'> <box-icon color='red' name='x'></box-icon></i>" : "<i title='فعال کن' class='active_it'><box-icon color='green' name='check'></box-icon></i>",
                    delete: '<input type="checkbox"  value="' + item.id + '">'
                  })
            })
            this.rows = list;
            this.$store.state.loading = false;
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
  },
  methods: {
    checkNumber(e){
      HelperClass.checkNumberValidation(e)
    },
    checkDiscountValidationKeyUp(event){
      if (event.target.value > 100) {
        event.target.value = 100
        this.percent = 100;
      }
    },
    validateNumber(e) {
      HelperClass.checkNumberValidation(e)
    },
    changeDate() {
      this.jalali_date = moment(this.date).format('jYYYY-jM-jD')
    },
    getList(page_number=null) {
      if (page_number===null){
        DiscountService.getListOfTheDiscounts()
            .then(res => {
              let list = [];
              if (res.status === 204) {
                this.rows = list;
                this.$store.state.loading = false;
                this.last_page = 0;
                return;
              }
              this.last_page = res.data.data.last_page;
              let result = res.data.data.data;
              result.forEach(item => {
                list.push(
                    {
                      id: item.id,
                      code: item.code,
                      date: item.expire_date,
                      expire_date: moment(item.expire_date).format('jYYYY-jM-jD'),
                      condition: item.status,
                      discount:parseFloat(item.percent),
                      number:item.count_of_useable,
                      users:'<span class="active_button"><box-icon color=\'#fff\' name=\'show-alt\'></box-icon></span>',
                      edit: '<i  title="ویرایش" class="active_it"><box-icon color="green" type=\'solid\' name=\'message-edit\'></box-icon></i>',
                      count_of_useable: '<span class="deactive_button">' + HelperClass.numberFormat(item.count_of_useable) + '</span>',
                      used: '<span class="active_button">' + item.used + '</span>',
                      percent: '<span class="active_button">' + parseFloat(item.percent) + '</span>',
                      status: item.status ? '<span class="active_button">فعال</span>' : '<span class="deactive_button">غیر فعال</span>',
                      switch_condition: item.status ? "<i class='active_it' title='غیر فعال کن'> <box-icon color='red' name='x'></box-icon></i>" : "<i title='فعال کن' class='active_it'><box-icon color='green' name='check'></box-icon></i>",
                      delete: '<input type="checkbox"  value="' + item.id + '">'
                    })
              })
              this.rows = list;
              this.$store.state.loading = false;
            }).catch(error => {
          HelperClass.showErrors(error, this.$noty)
        });
        return
      }
      DiscountService.paginate(this.current)
          .then(res => {
            let list = [];
            if (res.status === 204) {
              this.rows = list;
              this.$store.state.loading = false;
              this.last_page = 0;
              return;
            }
            this.last_page = res.data.data.last_page;
            let result = res.data.data.data;
            result.forEach(item => {
              list.push(
                  {
                    id: item.id,
                    code: item.code,
                    date: item.expire_date,
                    expire_date: moment(item.expire_date).format('jYYYY-jM-jD'),
                    condition: item.status,
                    discount:parseFloat(item.percent),
                    edit: '<i  title="ویرایش" class="active_it"><box-icon color="green" type=\'solid\' name=\'message-edit\'></box-icon></i>',
                    count_of_useable: '<span class="deactive_button">' + HelperClass.numberFormat(item.count_of_useable) + '</span>',
                    used: '<span class="active_button">' + item.used + '</span>',
                    number:item.count_of_useable,
                    users:'<span class="active_button"><box-icon color=\'#fff\' name=\'show-alt\'></box-icon></span>',
                    percent: '<span class="active_button">' + parseFloat(item.percent) + '</span>',
                    status: item.status ? '<span class="active_button">فعال</span>' : '<span class="deactive_button">غیر فعال</span>',
                    switch_condition: item.status ? "<i class='active_it' title='غیر فعال کن'> <box-icon color='red' name='x'></box-icon></i>" : "<i title='فعال کن' class='active_it'><box-icon color='green' name='check'></box-icon></i>",
                    delete: '<input type="checkbox"  value="' + item.id + '">'
                  })
            })
            this.rows = list;
            this.$store.state.loading = false;
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      });

    },
    searchInTable() {
      this.show_pagination = false
      if (this.search_value.trim() === '') {
        this.show_pagination = true;
        this.getList(this.current);
        return
      }
      this.$store.state.loading = true;
      DiscountService.SearchInCodes(this.search_value)
          .then((res) => {
            let list = [];
            if (res.status === 204) {
              this.rows = [];
              this.$store.state.loading = false;
              return
            }
            let result = res.data.data;
            result.forEach(item => {
              list.push(
                  {
                    id: item.id,
                    code: item.code,
                    date: item.expire_date,
                    expire_date: moment(item.expire_date).format('jYYYY-jM-jD'),
                    condition: item.status,
                    discount:parseFloat(item.percent),
                    edit: '<i  title="ویرایش" class="active_it"><box-icon color="green" type=\'solid\' name=\'message-edit\'></box-icon></i>',
                    count_of_useable: '<span class="deactive_button">' + HelperClass.numberFormat(item.count_of_useable) + '</span>',
                    used: '<span class="active_button">' + item.used + '</span>',
                    number:item.count_of_useable,
                    users:'<span class="active_button"><box-icon color=\'#fff\' name=\'show-alt\'></box-icon></span>',
                    percent: '<span class="active_button">' + parseFloat(item.percent) + '</span>',
                    status: item.status ? '<span class="active_button">فعال</span>' : '<span class="deactive_button">غیر فعال</span>',
                    switch_condition: item.status ? "<i class='active_it' title='غیر فعال کن'> <box-icon color='red' name='x'></box-icon></i>" : "<i title='فعال کن' class='active_it'><box-icon color='green' name='check'></box-icon></i>",
                    delete: '<input type="checkbox"  value="' + item.id + '">'
                  })
            })
            this.rows = list;
            this.$store.state.loading = false;
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty);
      })
    },
    switchCondition(row) {
      this.$store.state.loading = true;

      DiscountService.switchCondition(row.id)
          .then(() => {
            this.getList();
            HelperClass.showSuccess(this.$noty)
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    selectItems(inputElement) {
      let value = inputElement.value;
      if (inputElement.checked) {
        this.selected.push(parseInt(value))
      } else {
        const index = this.selected.indexOf(value);
        this.selected.splice(index, 1);
      }

    },
    deleteItems() {
      if (HelperClass.checkIsEmpty(this.selected)) {
        return
      }
      HelperClass.showSwalAsking().then(result => {

        if (result.value) {
          this.$store.state.loading = true
          let data = {
            ids: this.selected
          }
          DiscountService.deleteDiscounts(data)
              .then(() => {
                this.selected = [];
                if (this.current > 1) {
                  this.current = this.current - 1;
                }
                this.getList();
                HelperClass.scrollTop();
                HelperClass.showSuccess(this.$noty)
              }).catch(error => {
            HelperClass.scrollTop();
            HelperClass.showErrors(error, this.$noty)
          });
        }
      })

    },
    onCellClick(params) {
      let tagName = params.event.target.tagName;
      let column_name = params.column.field;
      let row_object = params.row
      switch (tagName) {
        case ("BOX-ICON"):

          if (column_name === 'edit') {
            this.showEditModal(row_object)

          } else if (column_name === 'switch_condition') {
            this.switchCondition(row_object)
          }
          break
        case ('INPUT'):
          this.selectItems(params.event.target)
          break
        default:
          break
      }
    },
    showEditModal(row) {
      this.discount_id = row.id;
      this.date = row.date;
      this.discount_value=row.discount;
      this.count_of_useable=row.number
      this.jalali_date = row.expire_date
      this.popupActivo5 = true;
      document.querySelector('i.vs-icon').innerHTML = '&times;'
      this.id = row.id;
    },
    update() {
      let data = {
        expire_date: this.date,
        count_of_useable: this.count_of_useable,
        percent:this.discount_value
      }
      DiscountService.updateDiscount(this.discount_id, data)
          .then(() => {
            HelperClass.showSuccess(this.$noty)
           this.getList(this.current)
            this.popupActivo5=false
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })

    }
  },
  components: {
    VueInputUi,
    VuePersianDatetimePicker
  }
}
</script>

<style>
.vpd-day-text {
  color: black;
}

.vpd-selected .vpd-day-text {
  color: #fff !important;
}
</style>