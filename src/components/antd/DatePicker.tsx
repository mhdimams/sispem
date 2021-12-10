import { FunctionComponent } from 'react'
import { observer } from "mobx-react-lite";
import { DatePicker as AntdDatePicker, DatePickerProps } from "antd";

const CompDatePicker: FunctionComponent<DatePickerProps> = (props) => {
  return (
    <AntdDatePicker {...props} />
  )
}

export default observer(CompDatePicker)
