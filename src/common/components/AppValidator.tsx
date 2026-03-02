import { ErrorDetailDto } from "../../dtos/validation/dtos";
import { memo, useMemo } from "react";

interface AppValidatorProps {
  validator?: ErrorDetailDto[];
  propName?: string;
}

const AppValidator: React.FC<AppValidatorProps> = ({ validator, propName }) => {
  const filteredErrors = useMemo(
    () => validator?.filter((error) => !propName || error.key === propName) ?? [],
    [validator, propName]
  );

  if (filteredErrors.length === 0) {
    return null;
  }

  return (
    <div>
      {filteredErrors.map((error, index) => (
        <p key={`${error.key}-${index}`} className="text-red-500 text-sm mt-1">
          {error.message}
        </p>
      ))}
    </div>
  );
};

export default memo(AppValidator);