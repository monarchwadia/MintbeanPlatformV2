const CONVERTERS = {
  toNumber: val => +val
};

const getValue = key => process.env[key];

const hoc = (key, _opts = {}) => {
  // defaults
  const defaults = {
    required: true,
    defaultValue: undefined,
    convert: val => val,
    validator: null
  };

  // cache opts for this key
  const opts = Object.assign({}, defaults, _opts);

  // cache value for this key
  const val = opts.convert(getValue(key));

  // check if it was provided
  if (opts.required && !val) {
    throw new Error(
      `CRITICAL ERROR: Value for config variable [${key}] was not provided. Check env file.`
    );
  }

  // run the validator
  if (opts.validator && !opts.validator(val)) {
    throw new Error(
      `CRITICAL ERROR: Custom validation failed for config variable [${key}]. Check env file.`
    );
  }

  // return the getter
  return () => val || opts.defaultValue;
};

module.exports = {
  // cloudinaryCloudName = hoc('CLOUDINARY_CLOUD_NAME'),
  nodeEnv: () => hoc("NODE_ENV"),
  dbDatabase: hoc("DB_DATABASE"),
  dbUsername: hoc("DB_USERNAME"),
  dbPassword: hoc("DB_PASSWORD"),
  dbHost: hoc("DB_HOST"),
  dbPort: hoc("DB_PORT", { convert: CONVERTERS.toNumber }),
  dbTestLogSql: hoc("DB_TEST_LOG_SQL"),
  bcryptSaltRounds: hoc("BCRYPT_SALT_ROUNDS", { convert: CONVERTERS.toNumber }),
  appPort: hoc("APP_PORT", { convert: CONVERTERS.toNumber }),
  appSessionSecret: hoc("APP_SESSION_SECRET"),
  cloudinaryUrl: hoc("CLOUDINARY_URL"),
  sendgridKey: hoc("SENDGRID_KEY"),
  rootDomain: hoc("ROOT_DOMAIN", {
    // ensure https for everything, unless running localhost
    // validator: rootDomain => rootDomain.indexOf('localhost') === 0 || rootDomain.indexOf('https://') === 0

    // Claire: link functionality requires protocol
    validator: rootDomain =>
      rootDomain.indexOf("http://localhost") === 0 ||
      rootDomain.indexOf("https://") === 0
  })
};
