import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";

const REQUIRED = "Campo obrigatório";
const EMAIL_VALID = "Insira um email válido";

export function useFormUser() {
  const validationSchema = toTypedSchema(
    zod.object({
      name: zod
        .string({ message: REQUIRED })
        .min(1, { message: REQUIRED })
        .default(""),
      email: zod
        .string({ message: REQUIRED })
        .min(1, { message: REQUIRED })
        .email({ message: EMAIL_VALID })
        .default(""),
    })
  );

  const form = useForm({
    validationSchema,
  });

  const { value: name } = useField<string>("name");
  const { value: email } = useField<string>("email");

  return {
    name,
    email,
    ...form,
  };
}
