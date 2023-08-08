function slugToTitle(slug: string) {
  return slug
    .replace(/-/g, " ")
    .replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
    );
}

async function generateEnvFile() {
  const projectName = `VITE_PROJECT_NAME="${slugToTitle(global.config.title)}"`;
  const projectLink = `VITE_PROJECT_LINK="${global.config.link}"`;
  const projectRepository = `VITE_PROJECT_REPOSITORY="https://github.com/clakr/${global.config.title}"`;

  const content = `${projectName}\n${projectLink}\n${projectRepository}`;

  await Bun.write(Bun.file(".env"), content);
}

export default async function () {
  // .gitignore
  await Bun.write(
    Bun.file(".gitignore"),
    Bun.file(`${projectRootPath}/.gitignore`)
  );

  // .env
  generateEnvFile();
}
