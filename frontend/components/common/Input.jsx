// Input.tsx
import React from "react";
import {
  TextInput,
  Textarea,
  Select,
  PasswordInput,
  NumberInput,
  Checkbox,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";


const Input = ({ type = "text", ...props }) => {
  switch (type) {
    case "textarea":
      return <Textarea {...props} />;
    case "select":
      return <Select {...props} />;
    case "number":
      return <NumberInput {...props} />;
    case "password":
      return <PasswordInput {...props} />;
    case "checkbox":
      return <Checkbox {...props} />;
    case "calendar": // Handle calendar type
      return <DatePicker {...props} />;
    case "text":
    default:
      return <TextInput {...props} />;
  }
};

export default Input;
