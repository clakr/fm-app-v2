import { mkdir, rm } from "node:fs";

function slugToTitle(slug: string) {
  return slug
    .replace(/-/g, " ")
    .replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
    );
}

function removeThenMakeDirectory(path: string) {
  rm(path, { recursive: true, force: true }, (error) => {
    if (!error) return;

    throw error;
  });
  mkdir(path, (error) => {
    if (!error) return;

    throw error;
  });
}

async function generateEnvFile() {
  const projectName = `VITE_PROJECT_NAME="${slugToTitle(global.config.title)}"`;
  const projectLink = `VITE_PROJECT_LINK="${global.config.link}"`;
  const projectRepository = `VITE_PROJECT_REPOSITORY="https://github.com/clakr/${global.config.title}"`;

  const content = `${projectName}\n${projectLink}\n${projectRepository}`;

  await Bun.write(Bun.file(".env"), content);
}

async function generateThenModifyPackageJsonFile() {
  // package.json
  await Bun.write(
    Bun.file("package.json"),
    Bun.file(`${projectRootPath}/templates/html/package.json`)
  );

  const file = Bun.file("package.json");

  let contents = JSON.parse(await file.text());
  contents = { ...contents, name: global.config.title };

  await Bun.write(Bun.file("package.json"), JSON.stringify(contents, null, 2));
}

async function generateTemplateHTML() {
  // index.html
  await Bun.write(
    Bun.file("index.html"),
    Bun.file(`${projectRootPath}/templates/html/index.html`)
  );

  // postcss.config.js
  await Bun.write(
    Bun.file("postcss.config.js"),
    Bun.file(`${projectRootPath}/templates/html/postcss.config.js`)
  );

  // tsconfig.json
  await Bun.write(
    Bun.file("tsconfig.json"),
    Bun.file(`${projectRootPath}/templates/html/tsconfig.json`)
  );

  generateThenModifyPackageJsonFile();

  removeThenMakeDirectory("public");

  // public/vite.svg
  await Bun.write(
    Bun.file("public/vite.svg"),
    Bun.file(`${projectRootPath}/templates/html/public/vite.svg`)
  );

  removeThenMakeDirectory("src");

  // src/_vite-env.d.ts
  await Bun.write(
    Bun.file("src/_vite-env.d.ts"),
    Bun.file(`${projectRootPath}/templates/html/src/_vite-env.d.ts`)
  );

  // src/_preflight.css
  await Bun.write(
    Bun.file("src/_preflight.css"),
    Bun.file(`${projectRootPath}/templates/html/src/_preflight.css`)
  );

  // src/style.css
  await Bun.write(
    Bun.file("src/style.css"),
    Bun.file(`${projectRootPath}/templates/html/src/style.css`)
  );

  // src/_authorModal.css
  await Bun.write(
    Bun.file("src/_authorModal.css"),
    Bun.file(`${projectRootPath}/templates/html/src/_authorModal.css`)
  );

  // src/_authorModal.ts
  await Bun.write(
    Bun.file("src/_authorModal.ts"),
    Bun.file(`${projectRootPath}/templates/html/src/_authorModal.ts`)
  );

  // src/main.ts
  await Bun.write(
    Bun.file("src/main.ts"),
    Bun.file(`${projectRootPath}/templates/html/src/main.ts`)
  );
}

export default async function () {
  // .gitignore
  await Bun.write(
    Bun.file(".gitignore"),
    Bun.file(`${projectRootPath}/.gitignore`)
  );

  // .env
  generateEnvFile();

  generateTemplateHTML().catch((error) => {
    throw error;
  });
}
