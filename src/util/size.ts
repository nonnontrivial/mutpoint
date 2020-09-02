/**
 * @fileoverview Defines Size interface
 */
import * as React from "react";

export interface Size {
  height: number;
  width: number;
  margin: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
}

export const SizeContext = React.createContext<Size | null>(null);

export const defaultSize = { height: 300, width: 500, margin: { left: 0, right: 0, top: 0, bottom: 0 } };
