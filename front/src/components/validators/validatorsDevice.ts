import { DeviceGet } from "../../model/models";
import { ValidDeviceCreate } from "../admin/pages/device";

export const ValidateName = (name: string, devices: DeviceGet[]): string => {
  const regex = /^[a-zA-Z0-9\\\\._\\\\-]{3,}$/;
  var message: string = null;

  if (!name) {
    message = "Name is required";
  } else {
    if (name.length < 3) {
      message = "Name is to short. should contains at least 3 characters. ";
    } else {
      if (name.match(regex) == null) {
        message =
          "Name should contain letters, cifres, points, dashes or underscores";
      } else {
        for (var i = 0; i < devices.length; i++) {
          if (devices[i].name == name) {
            message = "Name already exist. Name should be unique";
          }
        }
      }
    }

    return message;
  }
};

export const ValidateDescription = (description: string): string => {
  var message: string = null;
  if (!description) {
    message = "Description is required";
  }
  return message;
};
export const ValidateAddress = (address: string): string => {
  var message: string = "";
  if (!address) {
    message = "Address is required";
  }
  return message;
};
export const ValidateMaxEnergy = (maxEnergy: number): string => {
  console.log(maxEnergy);
  var message: string = null;
  if (!maxEnergy) {
    message = "Max energy is required";
  } else {
    if (!(maxEnergy > 0)) {
      message = "Energy should be a positive number greater than 0";
    }
  }
  return message;
};
export const ValidateUserId = (id: number): string => {
  var message: string = null;
  if (!id) {
    message = "User id is required";
  } else {
    if (!(id > 1)) {
      message = "User id should be a postive number greater than 1";
    }
  }
  return message;
};

export const ValidateCreate = ({
  name,
  value,
  devices,
  setNameE,
  setDescriptionE,
  setUserIdE,
  setAddressE,
  setMaxEnergyE,
}: ValidDeviceCreate): string => {
  //   let errors: { [id: string]: string } = {};
  var error: string = null;
  if (name == "name") {
    error = ValidateName(value as string, devices);
    if (error) {
    } else {
      setNameE(true);
    }
  }
  if (name == "description") {
    error = ValidateDescription(value as string);
    if (error) {
    } else {
      setDescriptionE(true);
    }
  }
  if (name == "address") {
    error = ValidateAddress(value as string);
    if (error) {
    } else {
      setAddressE(true);
    }
  }

  if (name == "maxEnergy") {
    error = ValidateMaxEnergy(value as number);
    if (error) {
    } else {
      setMaxEnergyE(true);
    }
  }
  if (name == "userId") {
    error = ValidateUserId(value as number);
    if (error) {
      console.log(error);
      console.log("here");
    } else {
      setUserIdE(true);
    }
  }

  return error;
};
