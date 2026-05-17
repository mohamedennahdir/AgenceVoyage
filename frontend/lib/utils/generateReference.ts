export function generateBookingReference(sequenceNumber: number): string {
  const year = new Date().getFullYear();
  const padded = String(sequenceNumber).padStart(5, '0');
  return `BK-${year}-${padded}`;
}
