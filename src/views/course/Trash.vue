<template>
  <div>

    <span style="display: inline-block" @click="deleteItems" class="delete_button">
            <box-icon color="#fff" name='trash'></box-icon>
        </span>
    <span title="بازیابی موارد انتخابی" style="display: inline-block;background-color:rgba(54,166,184,0.95);"
          @click="restoreItems" class="delete_button">
            <box-icon color="#fff" name='recycle'></box-icon>
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
import CourseService from "@/services/Course/CourseService";
import HelperClass from "@/services/HelperClass";


const VueInputUi = () => import('vue-input-ui');
export default {
  name: "List",
  created() {
    this.$store.state.loading = true;
    this.$store.state.pageTitle = 'زباله دان دوره ها';
    this.getTrashesCourses()
  },
  data() {
    return {
      show_pagination: true,
      current: 1,
      search_value: '',
      selected: [],
      columns: [
        {
          label: 'عنوان فارسی',
          field: 'fa_title',
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
      CourseService.paginateInTrashesCourses(value)
          .then(res => {
            this.rows = [];
            let result = res.data.data.data;

            result.forEach(item => {
              this.rows.push({
                fa_title: item.fa_title,
                id: item.id,
                delete: '<input type="checkbox"  value="' + item.id + '">',
              })
            })
            this.$store.state.loading = false;
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    }
  },
  methods: {
    restoreItems() {
      if (HelperClass.checkIsEmpty(this.selected)) {
        return
      }
      HelperClass.showSwalAsking().then(result => {

        if (result.value) {
          this.$store.state.loading = true
          let data = {
            ids: this.selected
          }
          CourseService.restoreCourses(data)
              .then(() => {
                this.selected = [];
                if (this.current > 1) {
                  this.current = this.current - 1;
                }

                this.getTrashesCourses();
                HelperClass.scrollTop();
                HelperClass.showSuccess(this.$noty)
              }).catch(error => {
            HelperClass.scrollTop();
            HelperClass.showErrors(error, this.$noty)
          });
        }
      })
    },
    getTrashesCourses() {
      this.rows = [];
      CourseService.getTrashesCourses()
          .then(res => {
            if (res.status === 204) {
              this.rows = [];
              this.last_page = 0;
              this.current = 1;
              this.$store.state.loading = false;
              return;
            }
            this.last_page = res.data.data.last_page;
            this.rows = [];
            res.data.data.data.forEach(item => {
              this.rows.push({
                fa_title: item.fa_title,
                id: item.id,
                delete: '<input type="checkbox"  value="' + item.id + '">',
              })
            })
            this.$store.state.loading = false;
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    searchInTable() {
      this.show_pagination = false
      if (this.search_value.trim() === '') {
        this.show_pagination = true;
        this.getTrashesCourses();
        return
      }
      this.$store.state.loading = true;
      CourseService.searchInTrashesCourses(this.search_value)
          .then((res) => {
            if (res.status === 204) {
              this.rows = [];
              this.$store.state.loading = false;
              return
            }
            this.rows = [];
            let result = res.data.data;
            result.forEach(item => {
              this.rows.push({
                fa_title: item.fa_title,
                id: item.id,
                delete: '<input type="checkbox"  value="' + item.id + '">',
              })
            })
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
          CourseService.forceDeleteCourses(data)
              .then(() => {
                this.selected = [];
                if (this.current > 1) {
                  this.current = this.current - 1;
                }

                this.getTrashesCourses();
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

            this.$router.push({name: 'course-edit', params: {id: row_object.id}, query: {from_de_active_list: true}})
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
  },
  computed: {}
}
</script>

<style scoped>

</style>