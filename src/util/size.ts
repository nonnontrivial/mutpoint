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
