#!/usr/bin/env node

const chalk = require("chalk");
const args = process.argv.slice(2);

const commandDetails = require("../commands/command-details");

if (args[0] === "-h" || args[0] === "--help") {
  console.log(chalk.bold.yellow("Usage: cmdr [command] [options]"));
  console.log(chalk.bold.yellow("\nAvailable commands:"));

  for (const commandName in commandDetails) {
    const command = commandDetails[commandName];
    console.log(chalk.bold.cyan(`- ${commandName}:`), command.description);
    console.log(chalk.italic.yellow(`  Usage: ${command.usage}`));
  }

  console.log(chalk.cyan("\n-h or --help:"), "Show available commands");
  console.log(chalk.cyan("-v or --version:"), "Show version and details");
} else if (args[0] === "-v" || args[0] === "--version") {
  const packageJson = require("../package.json");

  console.log(chalk.yellow(`cmdr version ${packageJson.version}`));
  console.log(chalk.yellow(`Author: ${packageJson.author}`));
  console.log(chalk.yellow(`License: ${packageJson.license}`));
  console.log(chalk.blue(`Read more: ${packageJson.repository.url}`));
} else {
  switch (args[0]) {
    case "newdoc":
      require("../commands/newdoc")(args.slice(1));
      break;
    case "find":
      require("../commands/find")(args.slice(1));
      break;
    case "open":
      require("../commands/open")(args.slice(1));
      break;
    default:
      console.log(chalk.red(`Unknown command: ${args[0]}`));
      console.log(chalk.yellow(`Use -h or --help to see available commands.`));
      break;
  }
}
