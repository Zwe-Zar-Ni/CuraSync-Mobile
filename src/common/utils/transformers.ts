export const toNullable = (value: string | null) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
};

export const toFee = (value: string | null) => {
  const trimmed = value?.trim();
  return trimmed ? Number(trimmed) : null;
};
