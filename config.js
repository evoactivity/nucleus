const path = require('path');
require('dotenv').config();

module.exports = {
  /**
   * The port to run Nucleus Server on, if the port is in use the server will not start
   */
  port: 8080,

  /**
   * The fully qualified domain + path that Nucleus is being hosted at
   */
  baseURL: 'http://liampotter.co.uk:8080',

  /**
   * The data store to use when persisting plugins and versions.  Current possible values
   * are "sequelize", ensure you also supply valid connection details for your
   * chosen strategy below.
   *
   * PR's welcome to add another data store.
   */
  dbStrategy: 'sequelize',

  /**
   * Sequelize connection information, please note all options are required
   *
   * database: The name of the database to connect to
   * dialect: The type of SQL database this is, check sequelize docs for more info
   * username: Username to use when connecting
   * password; Password to use when connecting
   * host: Hostname of database
   * port: Port to use when connecting
   * storage: Path to sqlite file, only used for sqlite dialect
   */
  sequelize: {
    dialect: 'sqlite',
    storage: path.resolve(__dirname, 'db.sqlite')
  },

  /**
   * The file store to use when persisting update files and metadata.  Current possible
   * values are "s3" and "local" ensure you also supply valid connection details if
   * required for your chosen strategy below.
   *
   * PR's welcome to add another file store.
   */
  fileStrategy: 's3',

  /**
   * Local file configuration
   *
   * root: Path on disk to the root of the static file store
   * staticUrl: The HTTP url to use to access the static file store remotely
   */
  local: {
    root: path.resolve(__dirname, '.files'),
    staticUrl: 'http://liampotter.co.uk:9999'
  },

  /**
   * There is actually no authentication config for s3, all config must be done through the standard AWS
   * environment variables or through EC2 IAM roles.
   *
   * See http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
   *
   * Bucket / Region / CloudFront config goes here though
   */
  s3: {
    init: {
      endpoint: process.env.DO_SPACES_ENDPOINT,
      accessKeyId: process.env.DO_ACCESS_KEY_ID,
      secretAccessKey: process.env.DO_SECRET_KEY_ID,
      s3ForcePathStyle: true // Always use path style URLs
    },

    bucketName: 'iptv-releases', // The name for your S3 Bucket

    cloudfront: null
  },

  /**
   * The authentication strategy to use when logging users in.  Current possible values are "local",
   * "openid" and "github".  Make you also supply the required authentication details
   */
  authStrategy: 'local',

  /**
   * Local authentication details
   *
   * The `adminIdentifiers` array should be a list of usernames
   *
   * DISCLAIMER: This strategy should ONLY be used for local development and NEVER
   * used in production.  Unicorns cry every time this setting is used in production.
   * Don't make the unicorns cry.
   *
   * displayName: The user friendly name of this user
   * username: A unique identifier to use when this user signs in, please note uniqueness is
   *           not enforced
   * password: Well, uhhh, their password
   * photo: A URL for their profile, entirely optional, just makes things look nicer ;)
   */
  localAuth: [
    {
      displayName: 'Liam Potter',
      username: 'lpotter',
      password: 'sdaf34255',
      photo:
        'https://pbs.twimg.com/profile_images/1219364727/charlie-support_400x400.png'
    }
  ],

  /**
   * OpenID authentication details
   *
   * The `adminIdentifiers` array should be a list of email
   * addresses for users to consider admins
   *
   * realm: The domain that the server is hosted on
   * stateless: Stateless mode for openID
   * profile: Whether to fetch profile information, should normally be true
   * providerURL: Your openID provider URL
   * domain: Domain to restrict email addresses to
   */
  // openid: {
  //   realm: 'http://localhost:8888',
  //   stateless: true,
  //   profile: true,
  //   providerURL: 'https://auth.myservice.com/openid/v2/op',
  //   domain: 'myservice.com'
  // },

  /**
   * GitHub authentication details
   *
   * The `adminIdentifiers` array should be a list of GitHub usernames
   * to consider admins
   *
   * clientID: GitHub API client ID
   * clientSecret: GitHub API clientSecret
   * realm: The domain the server is hosted on
   */
  // github: {
  //   clientID: '',
  //   clientSecret: ''
  // },

  /**
   * See the documentation for your authentication strategy for what this array does
   */
  adminIdentifiers: ['radioactivity@gmail.com'],

  /**
   * Session options, in development just leave this as default.
   *
   * IN PRODUCTION PLEASE USE REDIS!
   *
   * type: Can be either "redis" or null
   *
   * redis:
   *   host: The host URL for the redis instance
   *   port: The port for the redis instance
   */
  sessionConfig: {
    type: null,
    secret: 'ThisIsNotSecret',

    redis: {
      host: '',
      port: ''
    }
  },

  organization: 'My Company Here',

  /**
   * GPG key to use when signing APT and YUM releases
   *
   * Requires to be unlocked (no password) and have both the private and
   * public key.
   */
  gpgSigningKey: `-----BEGIN PGP PUBLIC KEY BLOCK-----

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
=P4RR

-----END PGP PUBLIC KEY BLOCK-----
-----BEGIN PGP PRIVATE KEY BLOCK-----

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
=nC2l

-----END PGP PRIVATE KEY BLOCK-----
`,

  /**
   * The default percentage rollout for new releases.  The first release for
   * any channel will always be 100% but all future releases will have a
   * default rollout value of this setting
   */
  defaultRollout: 0
};
