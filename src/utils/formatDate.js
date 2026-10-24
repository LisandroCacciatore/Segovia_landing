export function formatDate(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
