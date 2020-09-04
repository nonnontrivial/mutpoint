/**
 * @fileoverview Defines Line component and Point type
 */
import * as React from "react";
import * as d3 from "d3";
import { DataContext } from "../model/data";
import { SizeContext, defaultSize } from "../model/size";

export enum Curve {
  LINEAR = "curveLinear",
  BASIS = "curveBasis",
  NATURAL = "curveNatural",
  STEP = "curveStep",
}

interface Props {
  curve?: Curve;
  stroke?: string;
  strokeWidth?: number;
  strokeLinejoin?: "round";
  strokeLinecap?: "round";
  style?: {
    [key: string]: number | string;
  };
}

/**
 * Line renders a line
 * @param {Props} props Props passed to the component
*/
const Line = (props: Props): React.ReactElement => {
  const { points, xFn, yFn} = React.useContext(DataContext) ?? {};
  const { margin } = React.useContext(SizeContext) ?? defaultSize;
  // formattedPoints is a mapping of original data points into the two-tuple
  // format used in d3 APIs
  const formattedPoints = React.useMemo<Array<[number, number]>>(() => {
    return points?.map(point => [point.x, point.y]) as [];
  }, [points]);
  // lineFn is a function that maps the formatted points to the actual string
  // sent to the path element
  const lineFn = React.useMemo<d3.Line<[number, number]>>(() => {
    return d3.line()
      .x(point => xFn(point[0]))
      .y(point => yFn(point[1]));
  }, [points]);
  // curve creates the final string given as an attribute to the path element
  const curve = React.useMemo<string>(() => {
    lineFn.curve(d3[props.curve ?? Curve.LINEAR]);
    return lineFn(formattedPoints) as string;
  }, [lineFn]);
  const onMouseOver = React.useCallback((e: React.MouseEvent) => { }, []);
  const onMouseOut = React.useCallback((e: React.MouseEvent) => { }, []);
  const onClick = React.useCallback((e: React.MouseEvent) => { }, []);
  return (
    <path
      d={curve}
      fill={"none"}
      stroke={props.stroke ?? "#000"}
      strokeWidth={props.strokeWidth ?? 2}
      strokeLinejoin={props.strokeLinejoin ?? "round"}
      strokeLinecap={props.strokeLinecap ?? "round"}
      transform={`translate(${margin?.left ?? 0},${margin?.top ?? 0})`}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClick}
      style={{
        ...props.style
      }}
    />
  );
};

export {
  Line,
};
