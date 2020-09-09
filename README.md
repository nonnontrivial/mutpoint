# mutpoint

![Node.js CI](https://github.com/nonnontrivial/mutpoint/workflows/Node.js%20CI/badge.svg)

> components for visualizing mutating point data

> **Note:** Project is **unstable** and extremely **early phase**

## Purpose

`mutpoint` is designed for charting _fluctuating source data_.

## Installation

```shell
npm install mutpoint
```

## API Overview

### Basic Rendering

The following example shows how to use `Chart` and `Line` to render some points.

```tsx
import * as React from "react";
import { Chart, Line, Point } from "mutpoint";

interface Props { }

export default (props: Props) => {
    const [points, setPoints] = React.useState<Point[]>(
	// generate sine data from an array of size 10
	new Array(10).fill(null).map((_, i) => {
	    const x = (i + 1) / Math.PI * 2;
	    return {
		x,
		y: Math.sin(x),
	    }
	})
    );
    return (
	<>
	    <Chart
		height={300}
		width={500}
		points={points}
	    >
		<Line />
	    </Chart>
	</>
    );
}

```

## Prior Art

- [Difference Chart](https://observablehq.com/@d3/difference-chart)
