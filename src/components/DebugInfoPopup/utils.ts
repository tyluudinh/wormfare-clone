/* eslint-disable @typescript-eslint/no-explicit-any */
export function sanitizeAndDeduplicateObject(
  obj: any,
  restrictedKeys: string[],
): any {
  const seenKeys = new WeakSet<any>();

  const sanitize = (value: any, keys: string[]): any => {
    if (!value || typeof value !== 'object') {
      return value;
    }

    if (Array.isArray(value)) {
      return value.map((item) => sanitize(item, keys));
    }

    return Object.keys(value).reduce((acc, key) => {
      const isRestricted = keys.includes(key);
      const isDuplicate = seenKeys.has(value[key]);

      if (!isRestricted && !isDuplicate) {
        if (typeof value[key] === 'object' && value[key]) {
          seenKeys.add(value[key]);
        }

        acc[key] = sanitize(value[key], keys);
      }

      return acc;
    }, {} as any);
  };

  return sanitize(obj, restrictedKeys);
}
