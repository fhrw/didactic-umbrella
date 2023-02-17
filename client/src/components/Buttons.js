export function ButtonRight(label, f) {}

export function Button(props, { children }) {
  const { label, f } = props;
  return <button>{children}</button>;
}
