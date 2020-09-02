/**
 * @fileoverview Exports all public components, defines Chart
 */
import * as React from "react";
import { renderInOrder } from "../util";
import { Size, SizeContext } from "../util/size";

export * from "./axis";
export * from "./line";

interface Props {
  children?: React.ReactNode;
  className?: string;
  width?: number;
  height?: number;
  margin?: {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
  };
  style?: {
    [key: string]: string | number;
  };
}

/**
 * Chart renders a chart
 * @param {Props} props Props passed to the component
 */
const Chart = (props: Props): React.ReactElement => {
  const orderedChildComponents = React.useMemo<React.ReactNodeArray>(() => {
    return renderInOrder(props.children);
  }, [props.children]);
  const size = React.useMemo<Size>(() => {
    return {
      height: props.height ?? 300,
      width: props.width ?? 500,
      margin: {
        left: props.margin?.left ?? 0,
        right: props.margin?.right ?? 0,
        top: props.margin?.top ?? 0,
        bottom: props.margin?.bottom ?? 0,
      }
    };
  }, [props.height, props.width, props.margin]);
  return (
    <svg
      className={props.className}
      width={`${props.width ?? 500}px`}
      height={`${props.height ?? 500}px`}
      style={props.style ?? {}}
      version="1.1"
    >
      <SizeContext.Provider value={size}>
        {orderedChildComponents}
      </SizeContext.Provider>
    </svg>
  );
};

export default Chart;
