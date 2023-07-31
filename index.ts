import { Command } from "commander";
import modifyGitConfig from "./utils/modifyGitConfig";

const program = new Command();

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

  modifyGitConfig();
}

main().catch((e) => {
  console.error(e);
});
