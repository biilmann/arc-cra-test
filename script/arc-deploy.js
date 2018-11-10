const path = require("path");
const fs = require("fs");

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
