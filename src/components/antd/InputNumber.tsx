import { observer } from "mobx-react-lite";
import { InputNumber, InputNumberProps } from 'antd';

interface IProps extends InputNumberProps { }

const CompInputNumber = (props: IProps) => {
  return (
    <InputNumber {...props} />
  )
}

export default observer(CompInputNumber)
