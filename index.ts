import { Command } from "commander";
import modifyGitConfig from "./utils/modifyGitConfig";
import generateFiles from "./utils/generateFiles";

const program = new Command();

global.projectRootPath = "/Users/adsi2227/Desktop/projects/fm-app";

async function main() {
  program
    .name("fm-app")
    .argument("<title>", "title of the project")
    .argument("<link>", "frontendmentor link of the project")
    .argument("[template]", "template/framework to be used", "html")
    .argument("[css]", "css template/framework to be used", "vanilla")
    .action((title, link, template, css) => {
      global.config = { title, link, template, css };
    })
    .parse();

  // modifyGitConfig();
  generateFiles();
}

main().catch((error) => {
  console.error(error);
});
