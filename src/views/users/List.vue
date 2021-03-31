<template>
  <div>
           <span @click="deleteItems" class="delete_button">
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
import HelperClass from "@/services/HelperClass";
import UserService from "@/services/User/UserService";
const VueInputUi = () => import('vue-input-ui');
export default {
  name: "List",
  created() {
    this.$store.state.loading = true;
    this.$store.state.pageTitle = 'لیست مقالات';
    this.getList();
  },
  data() {
    return {
      show_pagination: true,
      current: 1,
      search_value: '',
      selected: [],
      columns: [
        {
          label: 'نام و نام خانوادگی',
          field: 'full_name',
        },

        {
          label: 'ایمیل',
          field: 'email',
        },
        {
          label:'شماره تلفن',
          field: 'cell'
        },
        {
          label: 'اطلاعات کاربری',
          field: 'information',
          html: true
        },
        {
          label: 'مشاهده سفارشات',
          field: 'orders',
          html: true
        },
        {
          label: 'ویرایش',
          field: 'edit',
          html: true
        },
        {
          label: 'انتخاب',
          field: 'delete',
          html: true
        }
      ],
      rows: [],
      ArticleCategoriesList: [],
      last_page: 0
    }
  },
  watch: {
    current(value) {
      this.$store.state.loading = true;
      UserService.paginateInUserList(value)
          .then(res => {
            let list = [];
            res.data.data.data.forEach(item => {
              list.push(
                  {
                    id: item.id,
                    full_name: item.name+' '+item.family,
                    email:item.email,
                    cell:item.cell,
                    orders: '<i  title="سفارشات" class="active_it"><box-icon type=\'solid\' color="green" name=\'shopping-bags\'></box-icon></i>',
                    information: '<i  title="اطلاعات کاربری" class="active_it"><box-icon type=\'solid\' color="green" name=\'bar-chart-alt-2\'></box-icon></i>',
                    edit: '<i  title="ویرایش" class="active_it"><box-icon color="green" type="solid" name="message-edit"></box-icon></i>',
                    description: item.description,
                    delete: '<input type="checkbox"  value="' + item.id + '">'
                  })
            })
            this.rows = list;
            this.$store.state.loading = false;
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    }
  },
  methods: {
    getList() {
      UserService.getUserList()
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
                    full_name: item.name+' '+item.family,
                    email:item.email,
                    cell:item.cell,
                    orders: '<i  title="سفارشات" class="active_it"><box-icon type=\'solid\' color="green" name=\'shopping-bags\'></box-icon></i>',
                    information: '<i  title="اطلاعات کاربری" class="active_it"><box-icon type=\'solid\' color="green" name=\'bar-chart-alt-2\'></box-icon></i>',
                    edit: '<i  title="ویرایش" class="active_it"><box-icon color="green" type="solid" name="message-edit"></box-icon></i>',
                    description: item.description,
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
        this.getList();
        return
      }
      this.$store.state.loading = true;
      UserService.searchInUserList(this.search_value)
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
                    full_name: item.name+' '+item.family,
                    email:item.email,
                    cell:item.cell,
                    orders: '<i  title="سفارشات" class="active_it"><box-icon type=\'solid\' color="green" name=\'shopping-bags\'></box-icon></i>',
                    information: '<i  title="اطلاعات کاربری" class="active_it"><box-icon type=\'solid\' color="green" name=\'bar-chart-alt-2\'></box-icon></i>',
                    edit: '<i  title="ویرایش" class="active_it"><box-icon color="green" type="solid" name="message-edit"></box-icon></i>',
                    description: item.description,
                    delete: '<input type="checkbox"  value="' + item.id + '">'
                  })
            })
            this.rows = list;
            this.$store.state.loading = false;
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty);
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
          UserService.deleteUser(data)
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
            this.$router.push({name: 'users-edit',params: {id: row_object.id},query:{from_list:true}})
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
  },
  components: {
    VueInputUi
  }
}
</script>

<style scoped>

</style>