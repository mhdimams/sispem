import { CSSProperties } from "react";
import { observer } from "mobx-react-lite";
import * as moment from "moment";
import { RangeValue } from "rc-picker/lib/interface"
import { DatePicker } from "antd";

interface PropsInput {
  // name?: string;
  // disabled?: boolean;
  onChange?: (dates: RangeValue<moment.Moment>, dateStrings: [string, string]) => void;
  // onClick?: () => void;
  style?: CSSProperties;
}

const CompRangePicker = (props: PropsInput) => {
  return <DatePicker.RangePicker picker="date" {...props} />;
};

/* observer automatically applies memo, so observer components
never need to be wrapped in memo */
export default observer(CompRangePicker);
