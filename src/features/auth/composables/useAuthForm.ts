import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";

const REQUIRED = "Campo obrigatório";
const EMAIL_VALID = "Insira um email válido";

export function useAuthForm() {
  const validationSchema = toTypedSchema(
    zod.object({
      email: zod
        .string({ message: REQUIRED })
        .min(1, { message: REQUIRED })
        .email({ message: EMAIL_VALID })
        .default("eve.holt@reqres.in"),
      password: zod
        .string({ message: REQUIRED })
        .min(1, { message: REQUIRED })
        .default("cityslicka"),
    })
  );

  const form = useForm({
    validationSchema,
  });

  const { value: email } = useField<string>("email");
  const { value: password } = useField<string>("password");

  return {
    email,
    password,
    ...form,
  };
}
