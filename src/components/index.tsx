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
  /**
   * Rendering details for a diff that has a larger current y than previous y
   */
  positive?: {
    component: React.ReactElement;
  };
  /**
   * Rendering details for a diff that has a smaller current y than previous y
   */
  negative?: {
    component: React.ReactElement;
  };
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
  const [numPointsUpdates, setNumPointsUpdates] = React.useState<number>(0);
  // Keep track of the updates in order to render diff components correctly
  React.useEffect(() => {
    if (!props.diff) {
      return;
    }
    return () => { };
  }, [props.points, props.diff]);
  // orderedDiffComponents is the collection of diff components suitable for rendering
  const orderedDiffComponents = React.useMemo<React.ReactNode>(() => {
    if (!props.diff) {
      return;
    }
    return null;
  }, [secondaryPoints]);
  // orderedChildComponents is the subset of the provided children suitable for rendering
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
      {orderedDiffComponents}
    </svg>
  );
};

export default Chart;
