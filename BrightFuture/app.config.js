import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  extra: {
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
    // add other env variables here
  },
});
