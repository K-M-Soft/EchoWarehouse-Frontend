import { ErrorDetailDto } from "../../dtos/validation/dtos";
import { memo } from "react";

interface AppValidatorProps {
  validator?: ErrorDetailDto[];
  propName?: string;
}

const AppValidator: React.FC<AppValidatorProps> = ({ validator, propName }) => {
  const filteredErrors = validator?.filter(
    (error) => !propName || error.key === propName,
  );

  if (!filteredErrors || filteredErrors.length === 0) {
    return null;
  }
  return (
    <div>
      {filteredErrors.map((error) => (
        <p key={error.key} className="text-red-500 text-sm mt-1">
          {error.message}
        </p>
      ))}
    </div>
  );
};

const areEqual = (
  prev: AppValidatorProps,
  next: AppValidatorProps
): boolean => {
  // If propName changed, re-render
  if (prev.propName !== next.propName) return false;

  // Compare validator arrays by content
  const prevLen = prev.validator?.length ?? 0;
  const nextLen = next.validator?.length ?? 0;

  if (prevLen !== nextLen) return false;

  // Check each error's content
  for (let i = 0; i < prevLen; i++) {
    const prevErr = prev.validator![i];
    const nextErr = next.validator![i];
    if (prevErr.key !== nextErr.key || prevErr.message !== nextErr.message) {
      return false;
    }
  }

  return true;
};

export default memo(AppValidator, areEqual);
