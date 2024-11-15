/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Image from "next/image";
import { Control } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "./ui/form";
  import { Input } from "./ui/input";

  export enum FormFieldType {
    INPUT = "input",
    TEXTAREA = "textarea",
  }

  interface CustomProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
    name: string;
    label?: string;
    placeholder?: string;
    iconSrc?: string;
    iconAlt?: string;
    children?: React.ReactNode;
    fieldType: FormFieldType;
  }

  const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
    switch (props.fieldType) {
      case FormFieldType.INPUT:
        return (
          <div className="flex rounded-md ">
            {props.iconSrc && (
              <Image
                src={props.iconSrc}
                alt={props.iconAlt || ""}
                width={24}
                height={24}
                className="ml-2"
              />
            )}
            <FormControl>
              <Input 
                placeholder={props.placeholder || ""}
                {...field}
                className="shad-input"
              />
            </FormControl>
          </div>
        )
    }
  }

const CustomInput = (props: CustomProps) => {
  const { control, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field}) => (
        <FormItem >
          <div className="shad-form-item">
            <FormLabel className="shad-form-label">{label}</FormLabel>
            <RenderField field={field} props={props} />
          </div>
          <FormMessage className="shad-form-message" />
        </FormItem>
      )}
    />
  )
}

export default CustomInput
