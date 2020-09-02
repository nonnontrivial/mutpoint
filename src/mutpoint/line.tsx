/**
 * @fileoverview Defines Line component and Point interface
 */
import * as React from "react";
import * as d3 from "d3";
import { SizeContext } from "../util/size";

enum Curve {
  LINEAR = "curveLinear",
  BASIS = "curveBasis",
  NATURAL = "curveNatural",
  STEP = "curveStep",
}

enum KeyNames {
  X = "x",
  Y = "y",
}

export type Point = { [K in KeyNames]: number };

interface Props {
  points: Point[];
  curve?: Curve;
  stroke?: string;
  fill?: string;
  style?: {
    [key: string]: number | string;
  };
}

/**
 * isDefined determines if a point has a valid x and y
 * @param {Point} point Point passed from line call
 */
function isDefined(point: [number, number]) {
  return !isNaN(point[0]) && !isNaN(point[1]);
}

/**
 * Line renders a line
 * @param {Props} props Props passed to the component
*/
export const Line = (props: Props): React.ReactElement => {
  const { height, width, margin } = React.useContext(SizeContext) ?? { height: 300, width: 500, margin: { left: 0, right: 0, top: 0, bottom: 0 } };
  // formattedPoints is a mapping of original data points into the two-tuple
  // format used in d3 APIs
  const formattedPoints = React.useMemo<Array<[number, number]>>(() => {
    return props.points.map(point => [point.x, point.y]);
  }, [props.points]);

  const yFn = React.useMemo((): (y: number) => any => {
    return d3.scaleLinear()
      .domain([0, d3.max(props.points, d => d.y) as number]).nice()
      .range([height - margin.bottom, margin.top]);
  }, [props.points]);
  const xFn = React.useMemo((): (x: number) => any => {
    return d3.scaleLinear()
      .domain([0, d3.max(props.points, d => d.x) as number]).nice()
      .range([margin.left, width - margin.right]);
  }, [props.points]);
  // lineFn is a function that maps the formatted points to the actual string
  // sent to the path element
  const lineFn = React.useMemo<d3.Line<[number, number]>>(() => {
    return d3.line()
      .x(point => xFn(point[0]))
      .y(point => yFn(point[1]));
  }, [props.points]);

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
      fill={props.fill ?? undefined}
      stroke={props.stroke ?? "#000"}
      // transform={`translate(${props.margin?.left ?? 0},${props.margin?.top ?? 0})`}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClick}
      style={{
        ...props.style
      }}
    />
  );
};
