const fs = require("fs");
const path = require("path");
const yargs = require("yargs");
const chalk = require("chalk");

const commandDetails = require("./command-details");

module.exports = (args) => {
  const options = yargs
    .usage(commandDetails.newdoc.description)
    .usage(`Usage: ${commandDetails.newdoc.usage}`)
    .option("dir", {
      alias: "d",
      describe: "A directory to create the document in",
      type: "string",
      default: process.cwd(),
    })
    .alias("h", "help")
    .alias("v", "version").argv;

  const fileName = args[0];
  const directory = options.dir;

  const filePath = path.join(directory, fileName);

  if (fs.existsSync(filePath)) {
    console.log(
      chalk.yellow(
        `File '${fileName}' already exists in directory '${directory}'.`
      )
    );
    return;
  }

  fs.writeFileSync(filePath, "");

  console.log(
    chalk.green(
      `Created new document '${fileName}' in directory '${directory}'.`
    )
  );
};
