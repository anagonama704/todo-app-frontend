import { TextInput as TextInputs } from "@mantine/core";

const TextInput = ({
  icon,
  label,
  type,
  placeholder,
  withAsterisk,
}: {
  icon: any;
  label: string;
  type: string;
  placeholder: string;
  withAsterisk: boolean;
}) => {
  return (
    <TextInputs
      mt="md"
      rightSectionPointerEvents="none"
      rightSection={icon}
      label={label}
      placeholder={placeholder}
      type={type}
      withAsterisk={withAsterisk}
    />
  );
};
export default TextInput;
