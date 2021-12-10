import React from "react";
import { observer } from "mobx-react-lite";
import { Select, SelectProps } from "antd";

interface IProps extends SelectProps<string> {
  source: { id: string; label: string }[];
  prefix?: React.ReactNode
}

const CompSelect = (props: IProps) => {
  return (
    <Select {...props}>
      {props.source.slice().map((x, i) => (
        <Select.Option
          key={`${x.id}-${i}`}
          value={x.id}
          label={
            <>
              {props.prefix}
              <span>{x.label}</span>
            </>
          }
        >
          {x.label}
        </Select.Option>
      ))}
    </Select>
  );
};

export default observer(CompSelect);
