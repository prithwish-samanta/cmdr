const fs = require("fs");
const path = require("path");
const yargs = require("yargs");
const chalk = require("chalk");

const commandDetails = require("./command-details");

module.exports = async (args) => {
  const options = yargs
    .usage(commandDetails.find.description)
    .usage(`Usage: ${commandDetails.find.usage}`)
    .option("i", {
      alias: "insensitive",
      describe: "Make the search case-insensitive",
      type: "boolean",
      default: false,
    })
    .alias("h", "help")
    .alias("v", "version").argv;

  const query = args[0];
  const currentDirectory = process.cwd();

  const results = find(currentDirectory, query, options.insensitive);
  if (results.length === 0) {
    console.log(chalk.red(`No file or directory matching '${query}' found.`));
  } else {
    console.log(chalk.yellow(results.join("\n")));
  }
};

function find(filePath, query, isCaseInsensitive) {
  let results = [];
  const files = fs.readdirSync(filePath);
  files.forEach((file) => {
    const currentFilePath = path.join(filePath, file);
    const stats = fs.statSync(currentFilePath);
    if (stats.isDirectory()) {
      results = results.concat(find(currentFilePath, query, isCaseInsensitive));
      const directoryName = isCaseInsensitive ? file.toLowerCase() : file;
      const queryName = isCaseInsensitive ? query.toLowerCase() : query;
      if (directoryName.includes(queryName)) {
        results.push(currentFilePath);
      }
    } else {
      const fileName = isCaseInsensitive ? file.toLowerCase() : file;
      const queryName = isCaseInsensitive ? query.toLowerCase() : query;
      if (fileName.includes(queryName)) {
        results.push(currentFilePath);
      }
    }
  });
  return results;
}
