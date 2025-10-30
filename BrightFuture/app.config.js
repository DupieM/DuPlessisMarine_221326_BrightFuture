import 'dotenv/config';

export default {
  expo: {
    name: "BrightFuture",
    slug: "BrightFuture",
    extra: {
      facebookAppId: process.env.FACEBOOK_APP_ID,
      googleClientId: process.env.GOOGLE_CLIENT_ID,
    },
  },
};