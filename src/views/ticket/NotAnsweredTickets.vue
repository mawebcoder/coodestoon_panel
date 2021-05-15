<template>
  <div>
           <span @click="deleteItems" class="delete_button">
            <box-icon color="#fff" name='trash'></box-icon>
        </span>

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
import TicketService from "@/services/Ticket/TicketService";

export default {
  name: "List",
  created() {
    this.$store.state.loading = true;
    this.$store.state.pageTitle = 'لیست تیکت های پاسخ داه نشده';
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
          label: 'نام و نام خانوادگی ',
          field: 'full_name',
        },
        {
          label: 'وضعیت پاسخ',
          field: 'answer_condition',
          html: true
        },
        {
          label: 'اولویت',
          field: 'priority',
        },
        {
          label: 'شماره تیکت',
          field: 'ticket_code',
        },
        {
          label: 'عنوان',
          field: 'title',
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
          label: 'مشاهده',
          field: 'see',
          html: true
        },
        {
          label: 'دپارتمان',
          field: 'department',
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
      TicketService.paginateInUnAnsweredTickets(value)
          .then(res => {
            let list = [];
            let result = res.data.data.not_answered_tickets;
            result.forEach(item => {
              list.push(
                  {
                    id: item.id,
                    priority: item.priority,
                    full_name: item.full_name,
                    ticket_code: item.ticket_code,
                    condition: item.condition,
                    answer_condition: item.is_answered ? '<span class="active_button">پاسخ داده شده</span>' : '<span class="deactive_button">بدون پاسخ</span>',
                    title: item.title,
                    status: !item.is_closed ? '<span class="active_button">باز</span>' : '<span class="deactive_button">بسته</span>',
                    father: item.father ? item.father.fa_title : '<span class="deactive_button">ندارد</span>',
                    see: '<i  title="مشاهده و پاسخ" class="active_it"><box-icon color="green" type="solid" name="message-edit"></box-icon></i>',
                    department: item.department.fa_name,
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
      TicketService.getNotAnsweredTickets()
          .then(res => {
            let list = [];
            if (res.status === 204) {
              this.rows = list;
              this.$store.state.loading = false;
              this.last_page = 0;
              return;
            }
            this.last_page = res.data.data.last_page;
            let result = res.data.data.not_answered_tickets;
            result.forEach(item => {
              list.push(
                  {
                    id: item.id,
                    priority: item.priority,
                    full_name: item.full_name,
                    ticket_code: item.ticket_code,
                    condition: item.condition,
                    answer_condition: item.is_answered ? '<span class="active_button">پاسخ داده شده</span>' : '<span class="deactive_button">بدون پاسخ</span>',
                    title: item.title,
                    status: !item.is_closed ? '<span class="active_button">باز</span>' : '<span class="deactive_button">بسته</span>',
                    father: item.father ? item.father.fa_title : '<span class="deactive_button">ندارد</span>',
                    see: '<i  title="مشاهده و پاسخ" class="active_it"><box-icon color="green" type="solid" name="message-edit"></box-icon></i>',
                    department: item.department.fa_name,
                    delete: '<input type="checkbox"  value="' + item.id + '">'
                  })
            })
            this.rows = list;
            this.$store.state.loading = false;
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      });
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
          TicketService.softDeleteTickets(data)
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

          if (column_name === 'see') {
            this.$router.push({name: 'ticket-page', params: {ticket_id: row_object.id}, query: {from_list: true}})
          }
          break
        case ('INPUT'):
          this.selectItems(params.event.target)
          break
        default:
          break
      }
    },
  }
}
</script>

<style scoped>

</style>