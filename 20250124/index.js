const fs = require("fs");
const path = require("path");

function getFilesSortedByDate(directory) {
  const files = fs.readdirSync(directory);
  console.log("Файлы в директории:", files);
  const sortedFiles = files
    .map((file) => {
      const filePath = path.join(directory, file);
      console.log({ file, time: fs.statSync(filePath).mtime.getTime() });

      return { file, time: fs.statSync(filePath).mtime.getTime() };
    })
    .sort((a, b) => a.time - b.time);

  console.log("Сортированный список файлов:", sortedFiles);

  fs.writeFileSync(
    "sorted_files.json",
    JSON.stringify(
      sortedFiles.map((f) => f.file),
      null,
      2
    )
  );
  console.log(
    "Отсортированные файлы:",
    sortedFiles.map((f) => f.file)
  );
}

if (process.argv.length !== 3) {
  console.log("Используйте: node app.js sort <путь к директории>");
} else {
  getFilesSortedByDate(process.argv[2]);
}
