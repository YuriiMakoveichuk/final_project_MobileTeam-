import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm, useWatch } from "react-hook-form";
import * as yup from "yup";

import sprite from "../../img/sprite.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  apiWaterDay,
  apiWaterMonth,
  updateWaterRecord,
} from "../../redux/water/dailyInfoThunk.js";
import { selectCurrentSelectedFullDate } from "../../redux/date.js";
import { closeModal } from "../../redux/modal.js";

import styles from "./WaterForm.module.css";

const waterSchema = yup.object().shape({
  amount: yup.string().required("Amount is required"),
  time: yup
    .string()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)")
    .required("Time is required"),
});

const WaterForm = ({ infoEdit }) => {
  const dispatch = useDispatch();
  const fullDate = useSelector(selectCurrentSelectedFullDate);

  const { id, amount, date } = infoEdit;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: amount.toString(),
      time: `${new Date(date)
        .getHours()
        .toString()
        .padStart(2, "0")}:${new Date(date)
        .getMinutes()
        .toString()
        .padStart(2, "0")}`,
    },
    resolver: yupResolver(waterSchema),
  });

  const watchedAmount = useWatch({ control, name: "amount" });

  const onCloseModal = () => {
    dispatch(closeModal());
  };

  const onSubmit = async (data) => {
    try {
      await dispatch(updateWaterRecord({ id, fullDate, ...data }));
      await dispatch(apiWaterDay(fullDate));
      await dispatch(apiWaterMonth(fullDate));
      await onCloseModal();
    } catch (error) {
      console.log("Failed to add water record:", error.message);
    }
  };

  return (
    <form className={styles.waterForm} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h4 className={styles.addWaterTitle}>
          Edit the entered amount of water
        </h4>
        <p className={styles.subTitle}>Correct entered data:</p>
        <p className={styles.waterText}>Amount of water:</p>
        <div className={styles.waterCounterWrapper}>
          <button
            type="button"
            className={styles.waterCounterBtn}
            onClick={() => {
              const newValue = Math.max(parseInt(watchedAmount) - 50, 50);
              setValue("amount", newValue.toString(), { shouldValidate: true });
            }}
          >
            <svg className={styles.waterIcon} width={40} height={40}>
              <use href={`${sprite}#icon-minus`}></use>
            </svg>
          </button>
          <span className={styles.amountSpanWater}>{watchedAmount} ml</span>
          <button
            type="button"
            className={styles.waterCounterBtn}
            onClick={() => {
              const newValue = Math.min(parseInt(watchedAmount) + 50, 5000);
              setValue("amount", newValue.toString(), { shouldValidate: true });
            }}
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
              type="string"
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
