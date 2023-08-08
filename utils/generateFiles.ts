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

  await Bun.write(Bun.file(`${global.config.title}/.env`), content);
}

async function generateThenModifyPackageJsonFile() {
  // package.json
  await Bun.write(
    Bun.file(`${global.config.title}/package.json`),
    Bun.file(`${projectRootPath}/templates/html/package.json`)
  );

  const file = Bun.file(`${global.config.title}/package.json`);

  let contents = JSON.parse(await file.text());
  contents = { ...contents, name: global.config.title };

  await Bun.write(
    Bun.file(`${global.config.title}/package.json`),
    JSON.stringify(contents, null, 2)
  );
}

async function generateTemplateHTML() {
  // index.html
  await Bun.write(
    Bun.file(`${global.config.title}/index.html`),
    Bun.file(`${projectRootPath}/templates/html/index.html`)
  );

  // postcss.config.js
  await Bun.write(
    Bun.file(`${global.config.title}/postcss.config.js`),
    Bun.file(`${projectRootPath}/templates/html/postcss.config.js`)
  );

  // tsconfig.json
  await Bun.write(
    Bun.file(`${global.config.title}/tsconfig.json`),
    Bun.file(`${projectRootPath}/templates/html/tsconfig.json`)
  );

  generateThenModifyPackageJsonFile();

  removeThenMakeDirectory(`${global.config.title}/public`);

  // public/vite.svg
  await Bun.write(
    Bun.file(`${global.config.title}/public/vite.svg`),
    Bun.file(`${projectRootPath}/templates/html/public/vite.svg`)
  );

  removeThenMakeDirectory(`${global.config.title}/src`);

  // src/_vite-env.d.ts
  await Bun.write(
    Bun.file(`${global.config.title}/src/_vite-env.d.ts`),
    Bun.file(`${projectRootPath}/templates/html/src/_vite-env.d.ts`)
  );

  // src/_preflight.css
  await Bun.write(
    Bun.file(`${global.config.title}/src/_preflight.css`),
    Bun.file(`${projectRootPath}/templates/html/src/_preflight.css`)
  );

  // src/style.css
  await Bun.write(
    Bun.file(`${global.config.title}/src/style.css`),
    Bun.file(`${projectRootPath}/templates/html/src/style.css`)
  );

  // src/_authorModal.css
  await Bun.write(
    Bun.file(`${global.config.title}/src/_authorModal.css`),
    Bun.file(`${projectRootPath}/templates/html/src/_authorModal.css`)
  );

  // src/_authorModal.ts
  await Bun.write(
    Bun.file(`${global.config.title}/src/_authorModal.ts`),
    Bun.file(`${projectRootPath}/templates/html/src/_authorModal.ts`)
  );

  // src/main.ts
  await Bun.write(
    Bun.file(`${global.config.title}/src/main.ts`),
    Bun.file(`${projectRootPath}/templates/html/src/main.ts`)
  );
}

export default async function () {
  mkdir(global.config.title, (error) => {
    if (!error) return;

    throw error;
  });

  // .gitignore
  await Bun.write(
    Bun.file(`${global.config.title}/.gitignore`),
    Bun.file(`${projectRootPath}/.gitignore`)
  );

  // .env
  generateEnvFile();

  generateTemplateHTML().catch((error) => {
    throw error;
  });
}
