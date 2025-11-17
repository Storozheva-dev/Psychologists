import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./AuthForm.module.css";
import { loginWithEmail, registerWithEmail } from "../../firebase/authService";
import toast from "react-hot-toast";
import { ClosedEyeIcon, OpenEyeIcon } from "../../icons";

function AuthForm({ mode = "login", onSuccess }) {
  const [showPassword, setShowPassword] = useState(false);

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
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-busy={isSubmitting}>
      {mode === "register" && (
        <div>
          <h2 className={css.title} id="auth-register-title">
            Registration
          </h2>
          <p className={css.description} id="auth-register-description">
            Thank you for your interest in our platform! Please provide your
            name, email and password.
          </p>

          <div className={css.inputGroup}>
            {/* Name */}
            <div className={css.inputWrap}>
              <input
                className={css.input}
                {...register("name")}
                id="auth-register-name"
                type="text"
                placeholder="Name"
                aria-label="Name"
                aria-invalid={!!errors.name}
                aria-describedby={
                  errors.name ? "auth-register-name-error" : undefined
                }
                autoComplete="name"
              />
              {errors.name && (
                <p
                  className={css.error}
                  id="auth-register-name-error"
                  role="alert"
                >
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className={css.inputWrap}>
              <input
                className={css.input}
                {...register("email")}
                id="auth-register-email"
                type="email"
                placeholder="Email"
                aria-label="Email"
                aria-invalid={!!errors.email}
                aria-describedby={
                  errors.email ? "auth-register-email-error" : undefined
                }
                autoComplete="email"
              />
              {errors.email && (
                <p
                  className={css.error}
                  id="auth-register-email-error"
                  role="alert"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className={css.inputWrap}>
              <input
                className={css.input}
                {...register("password")}
                id="auth-register-password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                aria-label="Password"
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "auth-register-password-error" : undefined
                }
                autoComplete="new-password"
              />
              <button
                type="button"
                className={css.eyeBtn}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? (
                  <OpenEyeIcon aria-hidden="true" />
                ) : (
                  <ClosedEyeIcon aria-hidden="true" />
                )}
              </button>
              {errors.password && (
                <p
                  className={css.error}
                  id="auth-register-password-error"
                  role="alert"
                >
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <button
            className={css.submitBtn}
            type="submit"
            disabled={isSubmitting}
            aria-describedby="auth-register-title auth-register-description"
          >
            {mode === "login" ? "Log In" : "Sign Up"}
          </button>
        </div>
      )}

      {mode === "login" && (
        <div>
          <h2 className={css.title} id="auth-login-title">
            Log In
          </h2>
          <p className={css.description} id="auth-login-description">
            Welcome back! Please enter your credentials to access your account
            and continue your search for a psychologist.
          </p>

          <div className={css.inputGroup}>
            {/* Email */}
            <div className={css.inputWrap}>
              <input
                className={css.input}
                {...register("email")}
                id="auth-login-email"
                type="email"
                placeholder="Email"
                aria-label="Email"
                aria-invalid={!!errors.email}
                aria-describedby={
                  errors.email ? "auth-login-email-error" : undefined
                }
                autoComplete="email"
              />
              {errors.email && (
                <p
                  className={css.error}
                  id="auth-login-email-error"
                  role="alert"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className={css.inputWrap}>
              <input
                className={css.input}
                {...register("password")}
                id="auth-login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                aria-label="Password"
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "auth-login-password-error" : undefined
                }
                autoComplete="current-password"
              />
              <button
                type="button"
                className={css.eyeBtn}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? (
                  <OpenEyeIcon aria-hidden="true" />
                ) : (
                  <ClosedEyeIcon aria-hidden="true" />
                )}
              </button>
              {errors.password && (
                <p
                  className={css.error}
                  id="auth-login-password-error"
                  role="alert"
                >
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <button
            className={css.submitBtn}
            type="submit"
            disabled={isSubmitting}
            aria-describedby="auth-login-title auth-login-description"
          >
            {mode === "login" ? "Log In" : "Register"}
          </button>
        </div>
      )}
    </form>
  );
}

export default AuthForm;
