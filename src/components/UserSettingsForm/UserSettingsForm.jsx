import { ErrorMessage, Field, Form, Formik } from "formik";
import sprite from "../../img/sprite.svg";
import css from "./UserSettingsForm.module.css";
import clsx from "clsx";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors.js";
import { patchUser } from "../../redux/auth/operations.js";

const UserSettingsValidationSchema = Yup.object().shape({
  photo: Yup.mixed(),
  userGender: Yup.string(),
  userName: Yup.string().min(2).max(50),
  userEmail: Yup.string().email(),
  userWeight: Yup.number().positive(),
  userActiveTime: Yup.number().positive(),
  dailyWaterIntake: Yup.number().positive(),
});

const UserSettingsForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const newUser = user.data.user || user.data;

  const INITIAL_STATE = {
    photo: newUser.photo || "",
    userGender: newUser.gender || "woman",
    userName: newUser.name || "",
    userEmail: newUser.email || "",
    userWeight: newUser.weight || "",
    userActiveTime: newUser.sportHours || "",
    dailyWaterIntake: newUser.waterNorm / 1000 || "",
  };

  const handleSubmit = (values, actions) => {
    const file = values.photo;

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("gender", values.userGender || newUser.gender);
    formData.append("name", values.userName || newUser.name);
    formData.append("email", values.userEmail || newUser.email);
    formData.append("weight", values.userWeight || newUser.weight);
    formData.append("sportHours", values.userActiveTime || newUser.sportHours);
    formData.append(
      "waterNorm",
      values.dailyWaterIntake * 1000 || newUser.waterNorm
    );

    dispatch(patchUser(formData));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={INITIAL_STATE}
      validationSchema={UserSettingsValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className={css.form}>
          <div className={css.boxAvatar}>
            <div className={css.avatar}>
              <img src={newUser.photo} alt={newUser.name} />
            </div>
            <label htmlFor="photo" className={css.labelAvatar}>
              <svg className={css.svg} width={20} height={20}>
                <use href={`${sprite}#icon-upload`}></use>
              </svg>
              <p className={css.textAvatar}>Upload a photo</p>
              <input
                id="photo"
                name="photo"
                type="file"
                style={{ display: "none" }}
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  setFieldValue("photo", file);
                }}
              />
            </label>
          </div>

          <div className={css.boxScroll}>
            <div className={css.box}>
              <h3 className={css.title}>Your gender identity</h3>
              <div className={css.boxRadio}>
                <label className={css.labelRadio}>
                  <Field
                    className={css.field}
                    type="radio"
                    name="userGender"
                    value="woman"
                  />
                  Woman
                </label>
                <label className={css.labelRadio}>
                  <Field type="radio" name="userGender" value="man" />
                  Man
                </label>
                <ErrorMessage
                  className={css.errorText}
                  name="userGender"
                  component="span"
                />
              </div>

              <label className={css.label}>
                <h3 className={css.title}>Your name</h3>
                <Field type="text" name="userName" placeholder={newUser.name} />
                <ErrorMessage
                  className={css.errorText}
                  name="userName"
                  component="span"
                />
              </label>

              <label className={css.label}>
                <h3 className={css.title}>Email</h3>
                <Field
                  type="text"
                  name="userEmail"
                  placeholder={newUser.email}
                />
                <ErrorMessage
                  className={css.errorText}
                  name="userEmail"
                  component="span"
                />
              </label>

              <div className={css.boxFormula}>
                <h3 className={clsx(css.title, css.titleFormula)}>
                  My daily norma
                </h3>
                <div className={css.boxTextFormula}>
                  <div>
                    <p className={css.textFormula}>For woman:</p>
                    <p className={css.formula}>V=(M*0,03) + (T*0,4)</p>
                  </div>
                  <div>
                    <p className={css.textFormula}>For man:</p>
                    <p className={css.formula}>V=(M*0,04) + (T*0,6)</p>
                  </div>
                </div>
                <div className={css.boxClarification}>
                  <p>
                    <span>*</span> V is the volume of the water norm in liters
                    per day, M is your body weight, T is the time of active
                    sports, or another type of activity commensurate in terms of
                    loads (in the absence of these, you must set 0)
                  </p>
                </div>
                <div className={css.boxWarning}>
                  <svg className={css.svgWarning} width={18} height={18}>
                    <use href={`${sprite}#icon-emojione`}></use>
                  </svg>
                  <p>Active time in hours</p>
                </div>
              </div>
            </div>

            <div className={clsx(css.boxData, css.box)}>
              <label className={css.label}>
                <p>Your weight in kilograms:</p>
                <Field
                  type="text"
                  name="userWeight"
                  placeholder={newUser.weight}
                />
                <ErrorMessage
                  className={css.errorText}
                  name="userWeight"
                  component="span"
                />
              </label>

              <label className={clsx(css.label, css.labelSize)}>
                <p>The time of active participation in sports:</p>
                <Field
                  type="text"
                  name="userActiveTime"
                  placeholder={newUser.sportHours}
                />
                <ErrorMessage
                  className={css.errorText}
                  name="userActiveTime"
                  component="span"
                />
              </label>

              <div className={css.boxNorm}>
                <p>The required amount of water in liters per day:</p>
                <span>1.8 L</span>
              </div>

              <label className={clsx(css.label, css.labelDrink)}>
                <h3 className={css.title}>
                  Write down how much water you will drink:
                </h3>
                <Field
                  type="text"
                  name="dailyWaterIntake"
                  placeholder={newUser.waterNorm / 1000}
                />
                <ErrorMessage
                  className={css.errorText}
                  name="dailyWaterIntake"
                  component="span"
                />
              </label>
            </div>
            <button className={css.btn} type="submit">
              Save
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserSettingsForm;
