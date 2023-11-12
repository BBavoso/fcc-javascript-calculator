export type operator = "add" | "subtract" | "multiply" | "divide";

export const getOperatorIcon = (operator: operator): string => {
  switch (operator) {
    case "add":
      return "+";
    case "subtract":
      return "-";
    case "multiply":
      return "x";
    case "divide":
      return "/";
  }
};
