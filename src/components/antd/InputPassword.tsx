import { observer } from 'mobx-react-lite';
import { Input, InputProps } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
interface IProps extends InputProps {}

const CompInput = (props: IProps) => {
  return (
    <Input.Password
      {...props}
      iconRender={(visible) =>
        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
      }
    />
  );
};

export default observer(CompInput);
