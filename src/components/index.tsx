/**
 * @fileoverview Exports all public components, defines Chart
 */
import * as React from "react";
import * as d3 from "d3";
import { renderInOrder } from "../model";
import { Points, PointsContext } from "../model/points";

export * from "./axis";
export * from "./grid";
export * from "./line";

export enum Key {
  X = "x",
  Y = "y",
}

export type Point = {
  [K in Key]: number;
};

// export interface Anim<P extends Point> { }

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
 * Chart renders a chart
 * @param {Props} props Props passed to the component
 */
const Chart = (props: Props): React.ReactElement => {
  const [secondaryPoints, setSecondaryPoints] = React.useState<Point[]>([]);
  // Keep track of the secondary points to render
  // TODO: implement..
  React.useEffect(() => {
	  if (typeof props.diff === "undefined") {
		  return;
	  }
	  for (const point of props.points) {
		  if (point.y > (props?.diff?.threshold ?? 0)) {
			 setSecondaryPoints(props.points); 
		  }
	  }
    return () => { };
  }, [props.points]);
  // orderedChildComponents is a subset of the provided children suitable for rendering
  const orderedChildComponents = React.useMemo<React.ReactNodeArray>(() => {
    return renderInOrder(props.children);
  }, [props.children]);
  // points is point-specific data and scaling functions
  const points = React.useMemo<Points>(() => {
    const xFn = d3.scaleLinear()
      .domain([0, d3.max(props.points, d => d.x) as number]).nice()
      .range([props.margin?.left ?? 0, props.width - (props.margin?.right ?? 0)]);
    const yFn = d3.scaleLinear()
      .domain([0, d3.max(props.points, d => d.y) as number]).nice()
      .range([props.height - (props.margin?.bottom ?? 0), props.margin?.top ?? 0]);
    return {
      secondaryPoints,
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

