export default async function () {
  // .gitignore
  await Bun.write(
    Bun.file(".gitignore"),
    Bun.file(`${projectRootPath}/.gitignore`)
  );
}
