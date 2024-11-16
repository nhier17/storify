import React from 'react'
import Image from "next/image";
import { Control, FieldPath } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "./ui/form";
  import { z } from 'zod';
  import { Input } from "./ui/input";
  import { authFormSchema } from '@/lib/utils';

  const formSchema = authFormSchema('sign-up')


  interface CustomProps {
    control: Control<z.infer<typeof formSchema>>;
    name: FieldPath<z.infer<typeof formSchema>>;
    label?: string;
    placeholder?: string;
    iconSrc?: string;
    iconAlt?: string;
    children?: React.ReactNode;
  }

  const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {

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
