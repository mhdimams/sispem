import { memo } from 'react'
import BlockUi from "react-block-ui";

interface IPropsCompBlockUi {
  children: React.ReactNode
  isLoading: boolean
}

const CompBlockUi = (props: IPropsCompBlockUi) => {
  return (
    <BlockUi
      tag="div"
      blocking={props.isLoading}
      style={{ height: "100%" }}
      message={
        <span>
          <div id="preloader">
            <div id="loader"></div>
          </div>
        </span>
      }
    >
      {props.children}
    </BlockUi>
  )
}

export default memo(CompBlockUi)