export default async function () {
  let content = await Bun.file(".git/config").text();

  content += `[user]\n\tname = clakr\n\temail = clarktolosa@gmail.com`;

  Bun.write(".git/config", content);
}
