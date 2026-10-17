/** Fixed ambient aurora + faded grid behind all content. */
export function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div className="aurora absolute inset-0" />
      <div className="grid-backdrop absolute inset-0 opacity-60" />
    </div>
  );
}
