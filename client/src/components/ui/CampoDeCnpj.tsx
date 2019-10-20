import * as React from 'react';
import { TextField } from 'formik-material-ui';
const InputMask = require("react-input-mask");

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}

function TextMaskCustom(props: TextMaskCustomProps) {
  return (
    <InputMask
      {...props}
      mask={"99.999.999/9999-99"}
    />
  );
}

export default function (props: any) {
  return (
    <TextField
      {...props}
      InputProps={{
        inputComponent: TextMaskCustom
      }}
    />
  )
}