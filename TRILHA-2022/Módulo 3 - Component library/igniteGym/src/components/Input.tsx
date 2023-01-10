import {
  Input as NativeBaseInput,
  IInputProps,
  FormControl,
} from "native-base";

type Props = IInputProps & {
  errorMessage?: string | null;
};

export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid;
  return (
    <FormControl isInvalid={invalid} mb="2">
      <NativeBaseInput
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.400",
        }}
        bg="gray.700"
        h="12"
        px="4"
        borderWidth="0"
        fontSize="md"
        color="white"
        fontFamily="body"
        placeholderTextColor="gray.300"
        _focus={{ bg: "gray.700", borderWidth: 1, borderColor: "green.500" }}
        {...rest}
      />
      <FormControl.ErrorMessage _text={{ color: "red.400" }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
