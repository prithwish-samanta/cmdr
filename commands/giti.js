const fs = require("fs");
const path = require("path");
const yargs = require("yargs");
const prompts = require("prompts");
const chalk = require("chalk");

const commandDetails = require("./command-details");

module.exports = async () => {
  const options = yargs
    .usage(commandDetails.giti.description)
    .usage(`Usage: ${commandDetails.giti.usage}`)
    .alias("h", "help")
    .alias("v", "version").argv;

  const projectType = await getProjectType();
  const gitignorePath = path.join(
    __dirname,
    "..",
    "resources",
    "gitignore-files",
    `${projectType.value}.gitignore`
  );
  const targetPath = path.join(process.cwd(), ".gitignore");

  // if .gitignore file is already present in the current working directory
  if (fs.existsSync(targetPath)) {
    const overwrite = await confirmOverwrite();
    if (!overwrite.value) {
      console.log(chalk.red(`Aborted. No changes made.`));
      return;
    }
  }

  fs.copyFileSync(gitignorePath, targetPath);
  console.log(
    chalk.green(
      `Successfully generated a .gitignore file for type "${projectType.value}"`
    )
  );
};

// Function to get the selected project type
const getProjectType = async () => {
  const response = await prompts({
    type: "select",
    name: "value",
    message: "Select the project type",
    choices: [
      {
        title: "C",
        description:
          "Procedural programming language for system and application software",
        value: "c",
      },
      {
        title: "C++",
        description: "Object-oriented extension of C language",
        value: "cpp",
      },
      {
        title: "GO",
        description: "Efficient language for scalable software",
        value: "go",
      },
      {
        title: "JAVA",
        description: "Class-based object-oriented language",
        value: "java",
      },
      {
        title: "KOTLIN",
        description: "Modern cross-platform language",
        value: "kotlin",
      },
      {
        title: "NODE",
        description: "JavaScript runtime environment.",
        value: "node",
      },
      {
        title: "PHP",
        description: "Server-side scripting language",
        value: "php",
      },
      {
        title: "PYTHON",
        description: "Multi-purpose scripting language for automation",
        value: "python",
      },
      {
        title: "SWIFT",
        description: "Apple's language for iOS and macOS development",
        value: "swift",
      },
    ],
  });

  return response;
};

// Function to confirm overwrite of .gitignore file
const confirmOverwrite = async () => {
  const response = await prompts({
    type: "confirm",
    name: "value",
    message:
      "A .gitignore file already exists in this directory. Overwrite it?",
    initial: true,
  });

  return response;
};
