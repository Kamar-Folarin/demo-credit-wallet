export const appConstant = {
    REDIS: {
      MODE: {
        EX: 'EX',
        REDIS_DURATION: 86400,
      },
    },
    REDIS_CONNECTION_FAILED: 'Redis connection failed',
    TOKENS: {
      REFRESH: {
        REDIS_DURATION: 7776000, // in seconds
        JWT_DURATION: '90d',
      },
    },
    REGEX: {
      PASSWORD:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!"#$%&'()+,-.:;<=>?@[\]^_`{|}~*])(?=.{8,})/,
      VERIFY_MESSAGE:
        'it should contain atleast one lowercase, uppercase, number, special character, and minimum 8 character length',
    },
  };
  