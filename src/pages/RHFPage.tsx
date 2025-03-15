import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

// type RegisterFormSchema = {
//   username: string;
//   password: string;
// };

const registerFormSchema = z.object({
  username: z.string().min(3, { message: "Minimal 3 karakter" }).max(15),
  password: z.string().min(8),
  //contoh menggunakan angka, defaultnya pada RHF tipe data adalah string, tetapi jika ingin menggunakan tipe data angka maka perlu dilakukan pharsing. RHF sendiri menyediakan pharsing tersebut dengan "coerce"
  age: z.coerce.number().min(18),
});

type RegisterFormSchema = z.infer<typeof registerFormSchema>;

const RHFPage = () => {
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleRegisterUser = (values: RegisterFormSchema) => {
    alert("Form Submitted!");
  };

  return (
    <>
      <h1>React Hook Form</h1>

      <form
        onSubmit={form.handleSubmit(handleRegisterUser)}
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
      >
        <label>Username:</label>
        <input type="text" {...form.register("username")} />
        <span style={{ color: "red" }}>
          {form.formState.errors.username?.message}
        </span>

        <label>Password:</label>
        <input
          type={showPassword ? "text" : "password"}
          {...form.register("password")}
        />
        <span style={{ color: "red" }}>
          {form.formState.errors.password?.message}
        </span>
        <label>
          <input
            type="checkbox"
            onChange={(e) => setShowPassword(e.target.checked)}
          />
        </label>

        <label>Age:</label>
        <input type="text" {...form.register("age")} />
        <span style={{ color: "red" }}>
          {form.formState.errors.age?.message}
        </span>
        <button style={{ width: "fit-content" }}>Register User</button>
      </form>
    </>
  );
};

export default RHFPage;
