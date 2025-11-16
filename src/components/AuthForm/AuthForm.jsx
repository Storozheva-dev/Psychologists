import { useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./AuthForm.module.css";
import { loginWithEmail, registerWithEmail } from "../../firebase/authService";
import toast from "react-hot-toast";

export default function AuthForm({ mode = "login", onSuccess }) {
  const schema = useMemo(() => {
    if (mode === "login") {
      return yup.object({
        email: yup
          .string()
          .email("Invalid email format")
          .required("Email is required"),
        password: yup
          .string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });
    }
    return yup.object({
      name: yup
        .string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
      password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    });
  }, [mode]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues:
      mode === "login"
        ? { email: "", password: "" }
        : { name: "", email: "", password: "" },
  });

  const onSubmit = async (data) => {
    try {
      let user;

      if (mode === "login") {
        user = await loginWithEmail(data.email, data.password);
        const name = user.displayName || data.email;
        toast.success(`Welcome, ${name}`);
      } else {
        user = await registerWithEmail(data.name, data.email, data.password);
        toast.success(`Welcome, ${user.displayName || data.name}`);
      }

      reset();
      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {mode === "register" && (
        <div>
          <h2 className={css.title}>Registration</h2>
          <p className={css.description}>
            Thank you for your interest in our platform! Please provide your
            name, email and password.
          </p>
          <div className={css.inputGroup}>
            <div className={css.inputWrap}>
              <input
                className={css.input}
                {...register("name")}
                type="text"
                placeholder="Name"
              />
              {errors.name && (
                <p className={css.error}>{errors.name.message}</p>
              )}
            </div>
            <div className={css.inputWrap}>
              <input
                className={css.input}
                {...register("email")}
                type="email"
                placeholder="Email"
              />
              {errors.email && (
                <p className={css.error}>{errors.email.message}</p>
              )}
            </div>
            <div className={css.inputWrap}>
              <input
                className={css.input}
                {...register("password")}
                type="password"
                placeholder="Password"
              />
              {errors.password && (
                <p className={css.error}>{errors.password.message}</p>
              )}
            </div>
          </div>
          <button
            className={css.submitBtn}
            type="submit"
            disabled={isSubmitting}
          >
            {mode === "login" ? "Log In" : "Sign Up"}
          </button>
        </div>
      )}

      {mode === "login" && (
        <div>
          <h2 className={css.title}>Log In</h2>
          <p className={css.description}>
            Welcome back! Please enter your credentials to access your account
            and continue your search for a psychologist.
          </p>
          <div className={css.inputGroup}>
            <div className={css.inputWrap}>
              <input
                className={css.input}
                {...register("email")}
                type="email"
                placeholder="Email"
              />
              {errors.email && (
                <p className={css.error}>{errors.email.message}</p>
              )}
            </div>
            <div className={css.inputWrap}>
              <input
                className={css.input}
                {...register("password")}
                type="password"
                placeholder="Password"
              />
              {errors.password && (
                <p className={css.error}>{errors.password.message}</p>
              )}
            </div>
          </div>
          <button
            className={css.submitBtn}
            type="submit"
            disabled={isSubmitting}
          >
            {mode === "login" ? "Log In" : "Register"}
          </button>
        </div>
      )}
    </form>
  );
}
