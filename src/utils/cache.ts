class LocalCache {
  // 方法重载
  setCache(key: string, val: unknown): void;

  setCache(cache: { key: string; val: unknown }): void;

  setCache(caches: { key: string; val: unknown }[]): void;

  setCache(
    target: string | { key: string; val: unknown } | { key: string; val: unknown }[],
    targetVal?: unknown,
  ) {
    const values = [];

    if (typeof target === 'string') {
      values.push({ key: target, val: targetVal });
    } else if (target instanceof Array) {
      values.push(...target);
    } else if ('val' in target) {
      values.push(target);
    }

    values.forEach((item) => {
      window.localStorage.setItem(item.key, JSON.stringify(item.val));
    });
  }

  getCache<T = any>(key: string): T | undefined {
    const val = window.localStorage.getItem(key);

    if (val) {
      try {
        const parseRes = JSON.parse(val);
        return parseRes;
      } catch (error) {
        this.deleteCache(key);
        console.error(error);
      }
    }

    return undefined;
  }

  deleteCache(key: string) {
    window.localStorage.removeItem(key);
  }

  deleteCacheAll() {
    window.localStorage.clear();
  }
}

export default new LocalCache();
