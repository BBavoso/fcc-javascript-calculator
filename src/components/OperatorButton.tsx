import { operator } from "../types/Operator";
import { getOperatorIcon } from "../types/Operator";

export default function OperatorButton({
  operator,
  handleOperator,
}: {
  operator: operator;
  handleOperator: (operatorPressed: operator) => void;
}) {
  const operatorIcon = getOperatorIcon(operator);

  return (
    <td id={operator} onClick={() => handleOperator(operator)}>
      {operatorIcon}
    </td>
  );
}
