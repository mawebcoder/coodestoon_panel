<template>
  <div>
    <div class="centerx">
      <vs-popup
          style="color:rgb(255,255,255)"
          background-color="rgba(255,255,255,.6)"
          dir="rtl"
          :background-color-popup="colorx" title="محتوای کامنت" :active.sync="popupActivo5">
        <p v-html="comment_content">

        </p>
        <span @click="popupActivo5=false" style="margin-top: 10px;margin-right: 10px" class="submit_button">
          بستن
        </span>
      </vs-popup>
    </div>
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
import CommentService from "@/services/Comments/CommentService";

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
      popupActivo4:false,
      colorx: "#4a5153",
      popupActivo5: false,
      comment_content: '',
      columns: [
        {
          label: 'ایمیل کاربر',
          field: 'user_email',
          html: true
        },
        {
          label: 'نام مقاله',
          field: 'article_title',
          html: true
        },
        {
          label: 'مشاهده محتوا',
          field: 'see_text',
          html: true,
        },
        {
          label: 'تغییر وضعیت',
          field: 'switch_condition',
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
      CommentService.paginateInActiveArticleComments(value)
          .then(res => {
            let list = [];
            res.data.data.data.forEach(item => {
              list.push(
                  {
                    id: item.id,
                    user_email: item.user ? item.user.email : '<span>کاربر حذف شده است</span>',
                    article_title: item.article ? item.article.fa_title : '<span class="deactive_button">مقاله حذف شده است</span>',
                    see_text: '<span class="active_button">مشاهده </span>',
                    switch_condition: item.active ? "<i class='active_it' title='غیر فعال کن'> <box-icon color='red' name='x'></box-icon></i>" : "<i title='فعال کن' class='active_it'><box-icon color='green' name='check'></box-icon></i>",
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
      CommentService.getActiveArticleComments()
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
                    text: item.text,
                    user_email: item.user ? item.user.email : '<span>کاربر حذف شده است</span>',
                    article_title: item.article ? item.article.fa_title : '<span class="deactive_button">مقاله حذف شده است</span>',
                    see_text: '<span class="active_button">مشاهده </span>',
                    switch_condition: item.active ? "<i class='active_it' title='غیر فعال کن'> <box-icon color='red' name='x'></box-icon></i>" : "<i title='فعال کن' class='active_it'><box-icon color='green' name='check'></box-icon></i>",
                    delete: '<input type="checkbox"  value="' + item.id + '">'
                  })
            })
            this.rows = list;
            this.$store.state.loading = false;
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      });
    },
    switchCondition(row) {
      this.$store.state.loading = true;

      CommentService.switchCommentStatus(row.id)
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
          CommentService.deleteComments(data)
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
            this.$router.push({name: 'article-edit', params: {article: row_object.id}, query: {from_list: true}})
          } else if (column_name === 'switch_condition') {
            this.switchCondition(row_object)
          }
          break
        case ('INPUT'):
          this.selectItems(params.event.target)
          break
        case ('SPAN'):
          if (column_name === 'see_text') {
            this.popupActivo5 = true;
            this.comment_content = row_object.text;
          }
          break;
        default:
          break
      }
    },
  },
}
</script>

<style scoped>

</style>