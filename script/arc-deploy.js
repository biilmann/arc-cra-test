const path = require("path");
const fs = require("fs");

function ensureDirectoryExists(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExists(dirname);
  fs.mkdirSync(dirname);
}

/* Returns string of path to aws file */
const getAWSCredentialsPath = () => {
  const { env } = process;
  const home =
    env.HOME ||
    env.USERPROFILE ||
    (env.HOMEPATH ? (env.HOMEDRIVE || "C:/") + env.HOMEPATH : null);
  if (!home) {
    throw new Error("Can't find home directory on your local file system.");
  }
  return path.join(home, ".aws", "credentials");
};

/* Returns string of contents of aws crendentials file */
const getAWSCredentialsFile = () => {
  const credentialsPath = getAWSCredentialsPath();
  try {
    return fs.readFileSync(credentialsPath).toString();
  } catch (err) {
    return false;
  }
};

const appendAWSCredentials = ({
  profile,
  awsAccessKeyId,
  awsSecretAccessKey
}) => {
  const credentialsPath = getAWSCredentialsPath();
  // ensure that .aws folder exists
  ensureDirectoryExists(credentialsPath);

  try {
    const content = [
      `[${profile}]\n`,
      `aws_access_key_id=${awsAccessKeyId}\n`,
      `aws_secret_access_key=${awsSecretAccessKey}\n\n`
    ].join("");
    fs.appendFileSync(credentialsPath, content);
    return getProfiles();
  } catch (err) {
    console.log(err);
    return {};
  }
};

appendAWSCredentials({
  profile: "default",
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
