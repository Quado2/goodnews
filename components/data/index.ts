export const registerInputs = [
  {
    inputType: "text",
    prompt: "Enter your first name",
    name: "firstName",
    initialValue: "boy",
    rules: {
      maxLength: {
        expectedValue: 20,
        errorMessage: "Should not be more than 20 characters",
      },
      minLength: {
        expectedValue: 2,
        errorMessage: "Should not be less than 2 characters",
      },
    },
  },

  {
    inputType: "text",
    prompt: "Enter your sure name",
    name: "sureName",
    rules: {
      maxLength: {
        expectedValue: 20,
        errorMessage: "Should not be more than 20 characters",
      },
      minLength: {
        expectedValue: 2,
        errorMessage: "Should not be less than 2 characters",
      },
    },
  },
  {
    inputType: "selectInput",
    prompt: "What is your gender",
    name: "gender",
    list: "Choose, Male, Female",
    rules: {
      minLength: {
        expectedValue: 1,
        errorMessage: "You need to select at least one",
      },
    },
  },

  {
    inputType: "email",
    prompt: "Enter your email address",
    name: "email",
    rules: {
      isEmail: {
        expectedValue: true,
        errorMessage: "Not a valid email address",
      },
    },
  },

  {
    inputType: "text",
    prompt: "What is your phone number",
    name: "phone",
    rules: {
      maxLength: {
        expectedValue: 20,
        errorMessage: "Phone number should not be more than 15 characters",
      },
      minLength: {
        expectedValue: 8,
        errorMessage: "Phone number should not be less than 8 characters",
      },
    },
  },
  {
    inputType: "password",
    prompt: "Choose a password",
    name: "password",
    rules: {
      minLength: {
        expectedValue: 6,
        errorMessage: "Password should be atleast 6 characters",
      },
    },
  },
  {
    inputType: "password",
    prompt: "Repeat your password",
    name: "passwordRepeat",
    rules: {
      compareWithExisting: {
        expectedValue: "password",
        errorMessage: "Password doesn't match",
      },
    },
  },
];

export const loginInputs = [
  {
    inputType: "email",
    prompt: "What is your email or phone number",
    name: "email",
  },
  {
    inputType: "password",
    prompt: "What is your password",
    name: "password",
  },
];

export const prayerRequestInputs = [
  {
    inputType: "text",
    prompt: "Title of your prayer request",
    name: "title",
  },
  {
    inputType: "textarea",
    prompt: "Give details of what you want God to do for you",
    name: "details",
  },
];

export const testimonyRequestInputs = [
  {
    inputType: "text",
    prompt: "Title of your testimony",
    name: "title",
  },
  {
    inputType: "textarea",
    prompt: "Give details of what God did for you",
    name: "details",
  },
];

export const titheRequestInputs = [
  {
    inputType: "number",
    prompt: "Enter tithe amount",
    name: "amount",
  },
  {
    inputType: "date",
    prompt: "select the date of the tithe",
    name: "date",
  },
];
