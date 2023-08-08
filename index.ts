import { Command } from "commander";
import modifyGitConfig from "./utils/modifyGitConfig";
import copyFiles from "./utils/copyFiles";

const program = new Command();

global.projectRootPath = "/Users/adsi2227/Desktop/projects/fm-app";

async function main() {
  let config = {
    title: "",
    template: "",
    css: "",
  };

  program
    .name("fm-app")
    .argument("<title>", "title of the project")
    .argument("[template]", "template/framework to be used", "html")
    .argument("[css]", "css template/framework to be used", "vanilla")
    .action((title, template, css) => {
      config = { title, template, css };
    })
    .parse();

  // modifyGitConfig();
  copyFiles();
}

main().catch((e) => {
  console.error(e);
});
