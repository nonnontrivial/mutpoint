/**
 * @fileoverview Exports utility functions
 */
import * as React from "react";

/**
 * renderInOrder forms a new array of react children suitable for rendering
 * @param children React children
 */
export function renderInOrder(children: React.ReactNode): React.ReactNode[] {
  // const allowedFunctionNames = new Set([])
  const elements: React.ReactNode[] = [];
  React.Children.forEach(children, child => {
    elements.push(child);
  });
  return elements;
};
