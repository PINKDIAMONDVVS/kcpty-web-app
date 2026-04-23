export default function OpenCart({ quantity }: { quantity?: number }) {
  return (
    <span
      className="nav__link"
      style={{ borderLeft: '1px solid var(--line)', paddingLeft: 14, cursor: 'pointer' }}
    >
      Cart{' '}
      <span style={{ color: 'var(--cinnabar)' }}>
        [{quantity ?? 0}]
      </span>
    </span>
  );
}
