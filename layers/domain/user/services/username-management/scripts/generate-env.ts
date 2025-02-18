import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";
import chalk from "chalk";
import { writeFileSync } from "fs";
import { join } from "path";
import ora from "ora";

console.clear();

const ssmClient = new SSMClient({ region: process.env.AWS_REGION || "eu-central-1" });

// generates required enviroment variables for testing.
// exports values to a .env in ../

/** POJO of envioment variables and their respective SSM parameter paths. */

const VARIABLES = Object.freeze({
  REST_API_URL: "/moult/dev/infrastructure/io/central/api/url",
  CENTRAL_EVENT_BUS_NAME: "/moult/dev/infrastructure/io/event-bus/central/name",
  USER_DYNAMODB_TABLE_NAME: "/moult/dev/domain/authentication/service/user/infrastructure/storage/table/user/arn"
});

(async () => {

  const entries = Object.entries(VARIABLES);
  let envString = "";

  for (let x = 0; x < entries.length; x++) {

    const [variable, name] = entries[x];

    const spinner = ora(`Retrieving ${chalk.bold(variable)} value from SSM path ${chalk.blueBright.bold(name)}`);
    spinner.start();

    try {

      const getParameterCommand = new GetParameterCommand({
        Name: name,
        WithDecryption: true
      });

      const value = await ssmClient.send(getParameterCommand);

      envString += `${variable}=${value.Parameter?.Value}${x !== entries.length - 1 ? "\n" : ""}`;

      spinner.succeed(`Retrieved ${chalk.bold(variable)} value from SSM path ${chalk.blueBright.bold(name)}`);

    } catch (error) {

      spinner.fail(`Failed to retrieve ${chalk.bold(variable)} value from SSM path ${chalk.blueBright.bold(name)}`);

    }

  }

  writeFileSync(join(__dirname, "../.env"), envString, { encoding: "utf-8" }); // export .env to ../
  console.log(chalk.bold("\n The .env file has been exported to the root folder of the service\n"));

})();