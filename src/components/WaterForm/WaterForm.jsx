import styles from "./WaterForm.module.css";
import sprite from "../../img/sprite.svg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addWater } from "../../redux/water/dailyInfoSlice";

const waterSchema = yup.object().shape({
  amount: yup
    .number()
    .min(50, "Minimum 50 ml")
    .max(5000, "Maximum 5000 ml")
    .required("Amount is required"),
  time: yup
    .string()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)")
    .required("Time is required"),
});
const WaterForm = ({ onCloseModal }) => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: 50,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    },
    resolver: yupResolver(waterSchema),
  });

  const onSubmit = async (data) => {
    try {
      dispatch(addWater(data));
      onCloseModal();
    } catch (error) {
      console.log("Failed to add water record:", error.message);
      alert("Failed to add water record. Please try again.");
    }
  };

  return (
    <form className={styles.waterForm} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h4 className={styles.addWaterTitle}>Add water</h4>
        <p className={styles.subTitle}>Choose a value:</p>
        <p className={styles.waterText}>Amount of water:</p>
        <div className={styles.waterCounterWrapper}>
          <button
            type="button"
            className={styles.waterCounterBtn}
            onClick={() =>
              setValue("amount", (prev) => Math.max(prev - 50, 50))
            }
          >
            <svg className={styles.waterIcon} width={40} height={40}>
              <use href={`${sprite}#icon-minus`}></use>
            </svg>
          </button>
          <span className={styles.amountSpanWater}>{control.amount} ml</span>
          <button
            type="button"
            className={styles.waterCounterBtn}
            onClick={() =>
              setValue("amount", (prev) => Math.min(prev + 50, 5000))
            }
          >
            <svg className={styles.waterIcon} width={40} height={40}>
              <use href={`${sprite}#icon-plus`}></use>
            </svg>
          </button>
        </div>

        <label htmlFor="time" className={styles.waterTimeLabel}>
          Recording time
        </label>
        <Controller
          name="time"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="time"
              className={styles.waterInput}
              placeholder="HH:MM"
            />
          )}
        />
        {errors.time && (
          <p className={styles.waterAmountError}>{errors.time.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="amount" className={styles.waterTextLabel}>
          Enter the value of the water used:
        </label>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="amount"
              className={styles.waterInput}
              type="number"
              placeholder="50"
            />
          )}
        />
        {errors.amount && (
          <p className={styles.waterAmountError}>{errors.amount.message}</p>
        )}
      </div>

      <button type="submit" className={styles.waterSaveBtn}>
        Save
      </button>
    </form>
  );
};

export default WaterForm;
