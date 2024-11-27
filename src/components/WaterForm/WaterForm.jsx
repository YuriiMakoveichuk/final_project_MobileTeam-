import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const WaterForm = ({ initialData, closeModal, isEditMode }) => {
  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .required("Amount is required")
      .min(1, "Minimum amount is 1ml"),
    time: Yup.string().required("Time is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || { amount: 50, time: "07:00" },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    // Логіка відправки даних на backend
    console.log(data);
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Amount of water:</label>
      <input type="number" {...register("amount")} />
      {errors.amount && <p>{errors.amount.message}</p>}

      <label>Recording time:</label>
      <input type="time" {...register("time")} />
      {errors.time && <p>{errors.time.message}</p>}

      <button type="submit">{isEditMode ? "Save Changes" : "Add Water"}</button>
    </form>
  );
};

export default WaterForm;
