export const defaultUserOptions: any = {
  strategies: [],
  forms: {
    validation: {
      password: {
        required: true,
        minLength: 4,
        maxLength: 20,
      },
      name: {
        required: true,
      },
      email: {
        required: true,
      },
      displayName: {
        required: false,
        minLength: 4,
        maxLength: 20,
      },
    },
  },
};