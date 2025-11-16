import css from "./AppointmentForm.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

const schema = yup.object({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  phone: yup.string().required("Phone is required"),
  time: yup.string().required("Time is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  comment: yup.string().max(500, "Comment is too long"),
});

const availableTimes = ["09:00", "09:30", "10:00", "10:30"];

export default function AppointmentForm({ psychologist, onSuccess }) {
  const [timeOpen, setTimeOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      time: "",
      email: "",
      comment: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      // тут потім приліпиш відправку на бек
      console.log("Appointment:", {
        ...data,
        psychologistId: psychologist.id,
      });

      toast.success("Your appointment request has been sent");
      reset();
      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const handleTimeSelect = (t) => {
    setValue("time", t, { shouldValidate: true, shouldDirty: true });
    setTimeOpen(false);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={css.field}>
        <input
          className={css.input}
          type="text"
          placeholder="Name"
          {...register("name")}
        />
        {errors.name && <p className={css.error}>{errors.name.message}</p>}
      </div>

      <div className={css.row}>
        <div className={css.field}>
          <input
            className={css.input}
            type="tel"
            placeholder="+380"
            {...register("phone")}
          />
          {errors.phone && <p className={css.error}>{errors.phone.message}</p>}
        </div>

        <div className={`${css.field} ${css.timeWrapper}`}>
          <input
            className={css.input}
            type="text"
            placeholder="00:00"
            readOnly
            {...register("time")}
            onClick={() => setTimeOpen((prev) => !prev)}
          />
          <span className={css.clockIcon}>🕒</span>
          {errors.time && <p className={css.error}>{errors.time.message}</p>}

          {timeOpen && (
            <div className={css.dropdown}>
              <p className={css.dropdownTitle}>Meeting time</p>
              {availableTimes.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={css.dropdownItem}
                  onClick={() => handleTimeSelect(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={css.field}>
        <input
          className={css.input}
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && <p className={css.error}>{errors.email.message}</p>}
      </div>

      <div className={css.field}>
        <textarea
          className={css.textarea}
          placeholder="Comment"
          {...register("comment")}
        />
        {errors.comment && (
          <p className={css.error}>{errors.comment.message}</p>
        )}
      </div>

      <button className={css.submitBtn} type="submit" disabled={isSubmitting}>
        Send
      </button>
    </form>
  );
}
