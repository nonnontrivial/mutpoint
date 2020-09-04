/**
 * @fileoverview Defines Data interface
 */
import * as React from "react";
import { Point } from "../components";

export interface Data {
  points: Point[];
  xFn: any,
  yFn: any,
}

export const DataContext = React.createContext<Data | null>(null);
