import { observer } from 'mobx-react-lite';
import { Select, SelectProps } from 'antd';

interface IProps extends SelectProps<string> {
  source: { id: string; label: string }[];
}

const CompSelect = (props: IProps) => {
  return (
    <Select
      {...props}
      filterOption={(input, option) =>
        option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {props.source.slice().map((x, i) => (
        <Select.Option key={`${x.id}-${i}`} value={x.id}>
          {x.label}
        </Select.Option>
      ))}
    </Select>
  );
};

export default observer(CompSelect);
