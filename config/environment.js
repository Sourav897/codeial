const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: logDirectory,
});

const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "blahsomething",
  db: "codeial_development",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "spkz897@gmail.com",
      pass: "lqqmdsnhkguigvhl",
    },
  },
  google_client_id:
    "270365601265-k005qqh6fouqlqv4kqs0pp25ikdutons.apps.googleusercontent.com",
  google_client_Secret: "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",
  google_call_back_URL: "http://localhost:8000/users/auth/google/callback",
  jwt_secret: "codiel",
  morgan: {
    mode: "dev",
    options: { stream: accessLogStream },
  },
};

const production = {
  name: "production",
  asset_path: process.env.CODEIAL_ASSET_PATH,
  session_cookie_key: process.env.CODEIALSESSION_COOKIE_KEY,
  db: process.env.CODEIAL_DB,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.CODEIAL_GMAIL_USERNAME,
      pass: process.env.CODEIAL_GMAIL_PASSWORD,
    },
  },
  google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
  google_client_Secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
  google_call_back_URL: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
  jwt_secret: process.env.CODEIAL_JWT_SECRET,
  morgan: {
    mode: "combined",
    options: { stream: accessLogStream },
  },
};

module.exports =
  eval(process.env.CODEIAL_ENVIRONMENT) == undefined
    ? development
    : eval(process.env.CODEIAL_ENVIRONMENT);
