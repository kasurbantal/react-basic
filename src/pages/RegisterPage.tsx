import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

const registerSchema = z
  .object({
    username: z.string().min(3),
    password: z.string().min(8),
    age: z.coerce.number().min(18),
    repeatPassword: z.string(),
    gender: z.enum(["male", "female"]),
    isPregnant: z.boolean().optional(),
  })
  .superRefine((arg, ctx) => {
    if (arg.password !== arg.repeatPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["repeatPassword"],
        message: "Password tidak sama!",
      });
    }
  });

type RegisterSchema = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const [submittedData, setSubmittedData] = useState<RegisterSchema | null>(
    null
  );

  const [showPassword, setShowPassword] = useState(false);

  const handleRegisterSubmit = (data: RegisterSchema) => {
    setSubmittedData(data);
    alert("Form Submitted!");
    form.reset();
  };

  return (
    <>
      <form
        onSubmit={form.handleSubmit(handleRegisterSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
      >
        <label>Username</label>
        <input type="text" {...form.register("username")} />
        <span>{form.formState.errors.username?.message}</span>

        <label>Password</label>
        <input
          type={showPassword ? "text" : "password"}
          {...form.register("password")}
        />
        <span>{form.formState.errors.password?.message}</span>

        <label>Repeat Password</label>
        <input
          type={showPassword ? "text" : "password"}
          {...form.register("repeatPassword")}
        />
        <span>{form.formState.errors.repeatPassword?.message}</span>

        <label>
          {" "}
          <input
            type="checkbox"
            onChange={(e) => setShowPassword(e.target.checked)}
          />{" "}
        </label>

        <label>Age</label>
        <input type="text" {...form.register("age")} />
        <span>{form.formState.errors.age?.message}</span>

        <label>Gender</label>
        <select {...form.register("gender")}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        {form.watch("gender") === "female" && (
          <label>
            Pregnant ?{" "}
            <input type="checkbox" {...form.register("isPregnant")} />{" "}
          </label>
        )}

        <button>Submit</button>
      </form>

      {submittedData && (
        <div
          style={{
            marginTop: "20px",
            padding: "16px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h3>Submitted Data</h3>
          <p>Username: {submittedData?.username}</p>
          <p>Age: {submittedData?.age}</p>
          <p>Gender: {submittedData?.gender}</p>
          {submittedData.gender === "female" && (
            <p>Pregnant Status: {submittedData?.isPregnant ? "Yes" : "No"}</p>
          )}
        </div>
      )}
    </>
  );
};

export default RegisterPage;
