
function countEmpty(array: any[], from: number) {
  let empty = 0;
  let index = from;
  const loop = true;
  do {
    index += 1;
    if (index >= array.length) {
      break;
    }
    const item = array[index];
    if (!item) {
      empty += 1;
    } else {
      break;
    }
  } while (loop);
  return empty;
}

interface KeyMap {
  [index: string]: any;
}
const getLengthOfTheLongestArray = (arrays: any[]): number => {
  let len = 0;
  arrays.forEach((array) => {
    len = array.length > len ? array.length : len;
  });
  return len;
};

export const getMapFromHeaders = (arrays: any[], from?: number, to?: number): KeyMap => {
  const rows = arrays;
  if (!Array.isArray(rows)) {
    return rows;
  }

  const row = rows.length > 0 ? rows.splice(0, 1)[0] : rows[0];
  if (row.length) {
    const lastIndex = getLengthOfTheLongestArray(rows) - 1;
    row[lastIndex] = row[lastIndex] || '';
  }
  const start = from || 0;
  const end = to || row.length - 1;
  const obj: any = {};

  for (let i = start; i <= end; i += 1) {
    const key = row[i];
    if (key || key === 0) {
      if (row[i + 1] || i === end) {
        obj[row[i]] = i;
      } else {
        const size = countEmpty(row, i);

        if (arrays.length > 0) {
          obj[row[i]] = getMapFromHeaders(arrays.slice(), i, i + size);
        }
      }
    }
  }
  return obj;
};

class Parser {
  private map: KeyMap;

  public constructor(headers: any[]) {
    this.map = getMapFromHeaders(headers);
  }

  public parse(row: any[]) {
    const keyMap = this.map;
    const parsed: any = {};
    Object.keys(keyMap).forEach((key) => {
      const val = keyMap[key];
      if (typeof val !== 'number' && Object.keys(val).length) {
        const newParser = new Parser(val);
        parsed[key] = newParser.parse(row);
      } else {
        parsed[key] = row[val];
      }
    });
    return parsed;
  }
}

export default Parser;
