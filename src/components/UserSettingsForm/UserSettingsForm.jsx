import { ErrorMessage, Field, Form, Formik } from "formik";
import sprite from "../../img/sprite.svg";
import css from "./UserSettingsForm.module.css";
import clsx from "clsx";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors.js";

const INITIAL_VALUES = {
  photo: "",
  userGender: "woman",
  userName: "",
  userEmail: "",
  userWeight: "",
  userActiveTime: "",
  dailyWaterIntake: "",
};

const UserSettingsUserSettingsValidationSchema = Yup.object().shape({
  photo: Yup.mixed(),
  userGender: Yup.string(),
  userName: Yup.string().min(2).max(50),
  userEmail: Yup.string().email(),
  userWeight: Yup.number().positive(),
  userActiveTime: Yup.number().positive(),
  dailyWaterIntake: Yup.number().positive(),
});

const UserSettingsForm = ({ onUserChange }) => {
  const user = useSelector(selectUser);
  console.log(user.data);

  const handleSubmit = (values, actions) => {
    const userObject = {
      photo: "",
      gender: values.userGender,
      name: values.userName,
      email: values.userEmail,
      weight: values.userWeight,
      sportHours: values.userActiveTime,
      waterNorma: values.dailyWaterIntake,
    };

    onUserChange(userObject);

    actions.resetForm();
  };
  return (
    <>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={UserSettingsUserSettingsValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <div className={css.boxAvatar}>
            <div className={css.avatar}>
              <img src={user.data.photo} alt={user.data.name} />
            </div>
            <label htmlFor="avatar" className={css.labelAvatar}>
              <svg className={css.svg} width={20} height={20}>
                <use href={`${sprite}#icon-upload`}></use>
              </svg>
              <p className={css.textAvatar}>Upload a photo</p>
              <input id="avatar" type="file" style={{ display: "none" }} />
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
                <Field
                  type="text"
                  name="userName"
                  placeholder={user.data.name}
                />
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
                  placeholder={user.data.email}
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
                  type="tex3"
                  name="userWeight"
                  placeholder={user.data.weight}
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
                  placeholder={user.data.sportHours}
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
                  placeholder={user.data.waterNorma / 1000}
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
      </Formik>
    </>
  );
};

export default UserSettingsForm;
