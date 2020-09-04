/**
 * @fileoverview Exports all public components, defines Chart
 */
import * as React from "react";
// import * as d3 from "d3";
import { renderInOrder } from "../model";
import { Size, SizeContext } from "../model/size";
// import { Data, DataContext } from "../util/data";

export * from "./axis";
export * from "./grid";
export * from "./line";

enum Key {
  X = "x",
  Y = "y",
}

type Constraint = string | number | symbol;

export type Point<E extends Constraint = Key> = {
  [X in E]: any;
};

interface Props<E extends Constraint> {
  points: Point<E>[];
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
const Chart = <E extends Constraint>(props: Props<E>): React.ReactElement => {
  // orderedChildComponents is a subset of the provided children suitable for rendering
  const orderedChildComponents = React.useMemo<React.ReactNodeArray>(() => {
    return renderInOrder(props.children);
  }, [props.children]);
  // size stores svg size information across renders
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
