import { observer } from "mobx-react-lite";
import { Checkbox, CheckboxProps } from "antd";

interface PropsInput extends CheckboxProps {
  text?: string;
}

const CompRangePicker = (props: PropsInput) => {
  return <Checkbox {...props}>{props.text}</Checkbox>;
};

export default observer(CompRangePicker);
