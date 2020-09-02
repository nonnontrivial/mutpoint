# mutpoint

> components for visualizing mutating point data

> **Note:** Project is **unstable**

## Purpose

`mutpoint` is designed for charting _fluctuating source data_.

## Example Application: [Spectrum Analyzer](https://en.wikipedia.org/wiki/Spectrum_analyzer)

In this example, we will build a tool that benefits from `mutpoint`: a spectrum analyzer.

### Installation & First Steps

First, install the package in an existing React application directory.

```shell
npm i mutpoint
```

Then, include the following in a rendered file, `index.tsx`.

Here we are rendering a `Chart` from `mutpoint`.

It doesn't do much yet, but soon it will be responsible for rendering a line chart that corresponds to audio input frequency distribution.

```typescript
// index.tsx
import * as React from "react";
import { Chart, Line, Point } from "mutpoint";
import { createAnalyserNode } from "./audio";

interface Props {}

export default (props: Props): React.ReactNode => {
  const [node, setNode] = React.useState<unknown>();
  React.useEffect(() => {
    setNode(createAnalyserNode())
    return () => {}
  }, [])
  return (
    <>
      <Chart
        height={300}
        width={500}
      >
      </Chart>
    </>
  )
}

```

Now, in another file `audio.ts` include the following.

Here we are constructing a [analyser node](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode).

```typescript
// audio.ts
export function createAnalyserNode() {
  const context = new window.AudioContext();
  const analyser = context.createAnalyser();
  return {
    ...analyser,
    fftSize: 2048,
  }
}
```
