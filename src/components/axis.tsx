/**
 * @fileoverview Defines XAxis and YAxis components
 */
import * as React from "react";

interface XAxisProps {
    tickSizeInner?: number;
    tickSizeOuter?: number;
}

const XAxis = (props: XAxisProps): React.ReactElement => {
    return (
	<g></g>
    );
};

interface YAxisProps { }

const YAxis = (props: YAxisProps): React.ReactElement => {
    return (
	<g
	>
	</g>
    );
};

export {
    XAxis,
    YAxis,
};
