export const defaultAuthOptions: any = {
  strategies: [],
  forms: {
    validation: {
      password: {
        required: true,
        minLength: 4,
        maxLength: 20,
      },
      userId: {
        required: true,
      },
      fullName: {
        required: false,
        minLength: 4,
        maxLength: 20,
      },
    },
  },
};