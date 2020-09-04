/**
 * @fileoverview Defines XAxis and YAxis components
 */
import * as React from "react";
import { defaultSize, SizeContext } from "../model/size";

interface XAxisProps { }

const XAxis = (props: XAxisProps): React.ReactElement => {
  const { height, margin } = React.useContext(SizeContext) ?? defaultSize;
  return (
    <g
      transform={`translate(0, ${height - margin.bottom})`}
    >
    </g>
  );
};

interface YAxisProps { }

const YAxis = (props: YAxisProps): React.ReactElement => {
  const { margin } = React.useContext(SizeContext) ?? defaultSize;
  return (
    <g
      transform={`translate(0, ${margin.left}, 0)`}
    >
    </g>
  );
};

export {
  XAxis,
  YAxis,
};
