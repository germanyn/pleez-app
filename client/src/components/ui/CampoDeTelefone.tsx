import * as React from 'react';
import { TextField } from 'formik-material-ui';
const InputMask = require("react-input-mask");

function TextMaskCustom(props: any) {
  return (
    <InputMask
      {...props}
      mask={
        props.value.slice(4,5) >= 6
          ? "(99)99999-9999"
          : "(99)9999-9999"
      }
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