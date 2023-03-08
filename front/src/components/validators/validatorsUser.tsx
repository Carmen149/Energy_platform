import { Values } from "../login/signupForm";
import { axiosInstance } from "../../utils/axios";
import { ValidField } from "../admin/pages/user/user";
import { User } from "../../model/models";
const regexName = /^([A-Z][a-z]{2,}[ '-]?([a-z][ -])?)*$/;
const regexUsername = /^[a-zA-Z0-9\\\\._\\\\-]{3,}$/;
export const NameValidation = (name: string): string => {
  var error: string = "";
  if (!name) {
    error = "Name is required.";
  } else {
    if (name.length < 3) {
      error = "Name is to short. Name should contain at least 3 characters.";
    } else if (name.match(regexName) == null) {
      error = "Name should start with a capital letter.";
    }
  }
  return error;
};

export const UsernameValidation = (username: string, users: User[]): string => {
  var error: string = "";
  if (!username) {
    error = "Username is required.";
  } else {
    if (username.length < 3) {
      error =
        "Username is to short. Username should contain at least 3 characters.";
    } else {
      if (username.match(regexUsername) == null) {
        error =
          "Username should contain letters, cifres, points, dashes or underscores";
      } else {
        for (var i = 0; i < users.length; i++) {
          if (username == users[i].username) {
            error = "Username is already used!";
            break;
          }
        }
      }
    }
  }
  return error;
};
export const PasswordValidation = (password: string): string => {
  var error: string = "";
  if (!password) {
    error = "Password is required.";
  } else {
    if (password.length < 8 || password.length > 20) {
      error =
        "Password should contains at least 8 characters and at most 20 characters.";
    } else {
      if (password.match(/[0-9]+/) == null) {
        error = "Password should contains at least 1 digit";
      } else {
        if (password.match(/[A-Z]+/) == null) {
          error = "Password should contains at least upper case alphabet";
        } else {
          if (password.match(/[a-z]+/) == null) {
            error = "Password should contains at least lower case alphabet";
          } else if (password.match(/[!@#$%&*()-+=^]+/) == null) {
            error =
              "Password should contains  least one special character which includes !@#$%&*()-+=^";
          }
        }
      }
    }
  }
  return error;
};
export const Validation = (values: Values): { [id: string]: string } => {
  let errors: { [id: string]: string } = {};
  var error = NameValidation(values.name);
  if (error != "") {
    errors["name"] = NameValidation(values.name);
  } else {
    error = UsernameValidation(values.username, values.users);
    if (error != "") {
      errors["username"] = UsernameValidation(values.username, values.users);
    } else {
      error = PasswordValidation(values.password);
      if (error != "") {
        errors["password"] = PasswordValidation(values.password);
      }
    }
  }

  return errors;
};
export const FieldValid = ({
  name,
  value,
  users,
  setNameE,
  setPasswordE,
  setUsernameE,
  setRoleE,
}: ValidField): { [id: string]: string } => {
  const regexName = /^([A-Z][a-z]{2,}[ '-]?([a-z][ -])?)*$/;
  const regexUsername = /^[a-zA-Z0-9\\\\._\\\\-]{3,}$/;
  let errors: { [id: string]: string } = {};
  let error: string;
  if (name == "name") {
    error = NameValidation(value);
    if (error != "") {
      errors["name"] = error;
    } else {
      setNameE(true);
    }
  }

  if (name == "username") {
    error = UsernameValidation(value, users);
    if (error != "") {
      errors["username"] = error;
    } else {
      setUsernameE(true);
    }
  }
  if (name == "password") {
    error = PasswordValidation(value);
    if (error != "") {
      errors["password"] = error;
    } else {
      setPasswordE(true);
    }
  }
  if (name == "role" && setRoleE) {
    console.log(value);
    if (!(value.toUpperCase() == "USER" || value.toUpperCase() == "ADMIN")) {
      errors["role"] = "Role must be USER or ADMIN";
    } else {
      setRoleE(true);
    }
  }

  return errors;
};
