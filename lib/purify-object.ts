export function purifyObject(
  obj: Record<string, unknown>,
  config?: {
    removeEmptyString?: boolean;
    removeNull?: boolean;
    removeUndefined?: boolean;
    removeEmptyArray?: boolean;
  }
): Record<string, unknown> | undefined {
  if (!obj || typeof obj !== 'object') return undefined;

  const defaultConfig = {
    removeEmptyString: true,
    removeNull: true,
    removeUndefined: true,
    removeEmptyArray: true,
  };
  const finalConfig = { ...defaultConfig, ...config };

  const result: Record<string, unknown> = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (finalConfig.removeEmptyString && value === '') return;
    if (finalConfig.removeNull && value === null) return;
    if (finalConfig.removeUndefined && (value === 'undefined' || value === undefined)) return;
    if (finalConfig.removeEmptyArray && Array.isArray(value) && value.length === 0) return;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const purifiedNestedObject = purifyObject(value as Record<string, unknown>, config);
      if (purifiedNestedObject && Object.keys(purifiedNestedObject).length > 0) {
        result[key] = purifiedNestedObject;
      }
      return;
    }

    result[key] = value;
  });

  return Object.keys(result).length > 0 ? result : undefined;
}
