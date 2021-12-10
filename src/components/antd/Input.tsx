import { observer } from "mobx-react-lite";
import { Input, InputProps } from 'antd';

interface IProps extends InputProps { }

const CompInput = (props: IProps) => {
  return (
    <Input {...props} />
  )
}

export default observer(CompInput)
