/**
 * Generate JSX code from component props for the Code tab
 */
export const generateLiveCode = (
  componentName: string,
  props: Record<string, unknown>,
): string => {
  const { children, ...otherProps } = props;

  const propsArray = Object.entries(otherProps)
    .filter(
      ([, value]) => value !== "" && value !== false && value !== undefined,
    )
    .map(([key, value]) => {
      if (value === true) {
        return key;
      }
      if (typeof value === "string") {
        return `${key}="${value}"`;
      }
      if (key.includes("Icon") && typeof value === "string") {
        return `${key}={${value}Icon}`;
      }
      return `${key}={${JSON.stringify(value)}}`;
    });

  const propsString = propsArray.length > 0 ? ` ${propsArray.join(" ")}` : "";

  if (children && children !== "") {
    return `<${componentName}${propsString}>\n  ${children}\n</${componentName}>`;
  }
  else {
    return `<${componentName}${propsString} />`;
  }
};
