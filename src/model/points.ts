/**
 * @fileoverview Defines Data interface
 */
import { ScaleLinear } from "d3";
import * as React from "react";
import { Point } from "../components";

export interface Points {
  secondaryPoints?: Point[]
  points: Point[];
  xFn: ScaleLinear<number, number>,
  yFn: ScaleLinear<number, number>,
}

export const PointsContext = React.createContext<Points | null>(null);
