export const uniqify = (array: any, key: any) => array.reduce((prev: any, curr: any) => prev.find((a: any) => a[key] === curr[key]) ? prev : prev.push(curr) && prev, []);
