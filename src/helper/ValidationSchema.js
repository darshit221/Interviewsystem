import moment from "moment-timezone";
import * as yup from "yup";

const passwordReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const emailReg =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const schema = yup.object().shape({
  role: yup.string().required("Please Select Role"),
  first_name: yup.string().required(" Please Enter  Firstname"),
  last_name: yup.string().required(" Please Enter  Lastname"),
  email: yup
    .string()
    .matches(emailReg, "Must be a valid email!")
    .required("Please Enter Email "),
  dateOfBirth: yup
    .string()
    .nullable()
    .test("dateOfBirth", "You must be 18 years or older", function (value) {
      return moment().diff(moment(value, "MM-DD-YYYY"), "years") >= 18;
    }),
  password: yup
    .string()
    .matches(
      passwordReg,
      "one lowercase, uppercase, number, special character required!"
    )
    .min(8, "Minimun 8 Character Required!")
    .required("Please Enter Password!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password must be same!")
    .required("Required Field!"),
  image: yup
    .mixed()
    .test(
      "Please upload image",
      "image is required",
      (value) => value.length > 0
    ),
});
export default schema;
