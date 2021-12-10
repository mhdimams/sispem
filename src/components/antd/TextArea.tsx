import { memo, ChangeEvent } from 'react'
import { Input } from 'antd';

interface PropsTextArea {
  rows: number
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string
}

const TextArea = (props: PropsTextArea) => {
  return (
    <Input.TextArea {...props} />
  )
}

export default memo(TextArea)
