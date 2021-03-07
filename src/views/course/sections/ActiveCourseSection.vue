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
import CourseSectionService from "@/services/Course/CourseSectionService";


const VueInputUi = () => import('vue-input-ui');
export default {
  name: "List",
  data() {
    return {
      show_pagination: true,
      columns: [
        {
          label: 'عنوان فارسی',
          field: 'fa_title',
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
        }, {
          label: 'تغییر وضعیت',
          field: 'switch_condition',
          html: true
        },
        {
          label: 'ویرایش',
          field: 'edit',
          html: true
        },
        {
          label: 'عنوان دوره',
          field: 'course',
          html: true
        },
        {
          label: 'انتخاب',
          field: 'delete',
          html: true
        }
      ],
      rows: [],
      selected: [],
      fa_title: '',
      en_title: '',
      status: '',
      id: '',
      current: 1,
      search_value: '',
      last_page: 0,
    }
  },
  watch: {
    current(value) {
      this.$store.state.loading = true;
      CourseSectionService.paginateActiveCourseSectionList(value)
          .then(res => {
            let list = [];
            res.data.data.data.forEach(item => {
              list.push(
                  {
                    id: item.id,
                    fa_title: item.fa_title,
                    condition: item.status,
                    course_id: item.course.id,
                    meta: item.meta,
                    status: item.status ? '<span class="active_button">فعال</span>' : '<span class="deactive_button">غیر فعال</span>',
                    switch_condition: item.status ? "<i class='active_it' title='غیر فعال کن'> <box-icon color='red' name='x'></box-icon></i>" : "<i title='فعال کن' class='active_it'><box-icon color='green' name='check'></box-icon></i>",
                    edit: '<i  title="ویرایش" class="active_it"><box-icon color="green" type=\'solid\' name=\'message-edit\'></box-icon></i>',
                    course: HelperClass.spliceTeacherName(item.course.fa_title) ,
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
  created() {
    this.$store.state.pageTitle = 'لیست فصول  فعال';
    this.getList();
  },
  methods: {
    searchInTable() {
      if (this.search_value.trim() === '') {
        this.getList();
        this.show_pagination=true;
        return
      }
      this.$store.state.loading = true;
      CourseSectionService.searchInActiveCourseSection(this.search_value)
          .then((res) => {
            let list = [];
            if (res.status === 204) {
              this.rows = [];
              this.show_pagination=false;
              this.$store.state.loading = false;
              return
            }
            this.show_pagination=false;
            res.data.data.forEach(item => {

              list.push(
                  {
                    id: item.id,
                    fa_title: item.fa_title,
                    condition: item.status,
                    course_id: item.course.id,
                    meta: item.meta,
                    status: item.status ? '<span class="active_button">فعال</span>' : '<span class="deactive_button">غیر فعال</span>',
                    switch_condition: item.status ? "<i class='active_it' title='غیر فعال کن'> <box-icon color='red' name='x'></box-icon></i>" : "<i title='فعال کن' class='active_it'><box-icon color='green' name='check'></box-icon></i>",
                    edit: '<i  title="ویرایش" class="active_it"><box-icon color="green" type=\'solid\' name=\'message-edit\'></box-icon></i>',
                    course: HelperClass.spliceTeacherName(item.course.fa_title) ,
                    delete: '<input type="checkbox"  value="' + item.id + '">'
                  })
            })
            this.rows = list;
            this.$store.state.loading = false;
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty);
      })
    },
    getList() {
      this.$store.state.loading = true;
      CourseSectionService.getActiveCourseSections(this.current)
          .then(res => {
            let list = [];
            if (res.status === 204) {
              this.rows = list;
              this.$store.state.loading = false;
              this.last_page = 0;
              return
            }
            this.last_page = res.data.data.last_page;

            res.data.data.data.forEach(item => {

              list.push(
                  {
                    id: item.id,
                    fa_title: item.fa_title,
                    condition: item.status,
                    course_id: item.course.id,
                    meta: item.meta,
                    status: item.status ? '<span class="active_button">فعال</span>' : '<span class="deactive_button">غیر فعال</span>',
                    switch_condition: item.status ? "<i class='active_it' title='غیر فعال کن'> <box-icon color='red' name='x'></box-icon></i>" : "<i title='فعال کن' class='active_it'><box-icon color='green' name='check'></box-icon></i>",
                    edit: '<i  title="ویرایش" class="active_it"><box-icon color="green" type=\'solid\' name=\'message-edit\'></box-icon></i>',
                    course: HelperClass.spliceTeacherName(item.course.fa_title) ,
                    delete: '<input type="checkbox"  value="' + item.id + '">'
                  })
            })
            this.rows = list;
            this.$store.state.loading = false;
          }).catch(error => {
        if (error.response) {
          HelperClass.showErrors(error, this.$noty)
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
            this.$router.push({name:'course-section-edit',params:{id:row_object.id},query:{where:'list'}})
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
    switchCondition(row) {
      this.$store.state.loading = true;
      let data = {
        fa_title: row.fa_title,
        en_title: row.en_title,
        status: row.condition ? 0 : 1,
        course_id: row.course_id,
        meta: row.meta
      }
      CourseSectionService.updateCourseSection(row.id, data)
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
          CourseSectionService.deleteCourses(data)
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

    }
  },
  components: {
    VueInputUi,
  }
}
</script>

<style scoped lang="scss">

</style>