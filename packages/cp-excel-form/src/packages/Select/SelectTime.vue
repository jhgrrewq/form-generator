<script>
  import { DatePicker } from '@cci/cui'

  export default {
    name: "CSelectTime",
    mixins: [DatePicker],
    props: {
      dataType: {
        type: String,
        default: 'date' // 对应 element 组件 type 属性，日期 date 日期时间 datetime 日期范围 daterange 日期时间范围 datetimerange
      },
      value: {
        type: [String, Date, Array],
        default: ''
      },
      format: {
        type: String,
        default() {
          if (this.dataType === 'date' || this.dataType === 'daterange') {
            return 'yyyy-MM-dd'
          } else {
            return 'yyyy-MM-dd HH:mm:ss'
          }
        }
      },
      valueFormat: {
        type: String,
        default() {
          if (this.dataType === 'date' || this.dataType === 'daterange') {
            return 'yyyy-MM-dd'
          } else {
            return 'yyyy-MM-dd HH:mm:ss'
          }
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      editable: {
        type: Boolean,
        default: true
      },
      placeholder: {
        type: String,
        default() {
          if (this.dataType === 'date') {
            return '选择日期'
          } else {
            return '选择日期时间'
          }
        }
      },
      startPlaceholder: {
        type: String,
        default: '开始时间'
      },
      endPlaceholder: {
        type: String,
        default: '结束时间'
      },
      rangeSeparator: {
        type: String,
        default: '-'
      },
      defaultTime: {
        type: [Date, Array]
      }
    }
  }
</script>
