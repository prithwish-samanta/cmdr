const { spawn } = require("child_process");
const path = require("path");
const yargs = require("yargs");
const chalk = require("chalk");

const commandDetails = require("./command-details");

module.exports = async (args) => {
  const options = yargs
    .usage(commandDetails.open.description)
    .usage(`Usage: ${commandDetails.open.usage}`)
    .alias("h", "help")
    .alias("v", "version").argv;

  const filePath = path.resolve(args[0]);

  let command;
  if (process.platform === "win32") {
    // Use the 'start' command on Windows
    command = "start";
  } else if (process.platform === "darwin") {
    // Use the 'open' command on macOS
    command = "open";
  } else {
    // Use the 'xdg-open' command on Linux
    command = "xdg-open";
  }

  const childProcess = spawn(command, [filePath], { shell: true });
  childProcess.on("error", (err) => {
    console.error(
      chalk.red(`Failed to open file/directory '${filePath}'`, err)
    );
  });
};
