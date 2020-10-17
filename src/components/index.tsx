/**
 * @fileoverview Exports all public components, defines Chart
 */
import * as React from "react";
import * as d3 from "d3";
import { renderInOrder } from "../model";
import { Points, PointsContext } from "../model/points";

export * from "./axis";
export * from "./diff";
export * from "./grid";
export * from "./line";

export enum Key {
  X = "x",
  Y = "y",
}

export type Point = {
  [K in Key]: number;
};

export interface Diff {
  threshold?: number;
  positive: React.ReactNode;
  negative: React.ReactNode;
}

interface Props {
  points: Point[];
  diff?: Diff;
  children?: React.ReactNode;
  className?: string;
  secondaryPoints?: Point[];
  width: number;
  height: number;
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
 * Chart renders a chart for mutating point data.
 *
 * This component can render child components who interpret the points data
 * passed to the props.
 *
 * It conditionally renders secondary points in a diff component.
 *
 * @param {Props} props Props passed to the component
 * @returns React node
 */
const Chart: React.FC<Props> = (props: Props): React.ReactElement => {
  // TODO: implement orderedSecondaryComponents
  const [secondaryPoints, setSecondaryPoints] = React.useState<Point[]>(
    props.secondaryPoints ?? []
  );
  React.useEffect(() => {
    if (typeof props.diff === "undefined") {
      return;
    }
    for (const point of props.points) {
      const threshold = props.diff?.threshold ?? 0;
      if (point.y > threshold || point.y < threshold * -1) {
        setSecondaryPoints(props.points);
        break;
      }
    }
    return () => {};
  }, [props.points]);
  const orderedChildComponents = React.useMemo<React.ReactNodeArray>(() => {
    return renderInOrder(props.children);
  }, [props.children]);
  const points = React.useMemo<Points>(() => {
    const xMax = d3.max(props.points, (d) => d.x) as number;
    const xFn = d3
      .scaleLinear()
      .domain([0, xMax])
      .nice()
      .range([
        props.margin?.left ?? 0,
        props.width - (props.margin?.right ?? 0),
      ]);
    const yMin = d3.min(props.points, (d) => d.y) as number;
    const yMax = d3.max(props.points, (d) => d.y) as number;
    const yFn = d3
      .scaleLinear()
      .domain([yMin, yMax])
      .nice()
      .range([
        props.height - (props.margin?.bottom ?? 0),
        props.margin?.top ?? 0,
      ]);
    return {
      // secondaryPoints,
      points: props.points,
      xFn,
      yFn,
    };
  }, [props.points, props.width, props.height, props.margin]);
  return (
    <svg
      className={props.className}
      width={`${props.width}px`}
      height={`${props.height}px`}
      style={props.style ?? {}}
      version="1.1"
    >
      <PointsContext.Provider value={points}>
        {orderedChildComponents}
      </PointsContext.Provider>
    </svg>
  );
};

export default Chart;

export { Chart };
