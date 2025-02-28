const fs = require("fs");
const path = require("path");

const cacheFile = path.join(__dirname, "cache.json");
const CACHE_TTL = 60 * 1000; // 1 минута

// Функция для обновления кэша
async function updateCache() {
  const data = await fetch("https://btw-wh.up.railway.app/api/arts").then(
    (res) => res.json()
  );
  const cacheData = { data, timestamp: Date.now() };
  fs.writeFileSync(cacheFile, JSON.stringify(cacheData));
  return data;
}

// Функция для получения данных из кэша
async function fetchData() {
  if (fs.existsSync(cacheFile)) {
    const cache = JSON.parse(fs.readFileSync(cacheFile, "utf8"));
    const isCacheValid = Date.now() - cache.timestamp < CACHE_TTL;

    if (isCacheValid) {
      console.log("Данные из кэша:", cache.data);
      return cache.data;
    }
  }
  console.log("Обновление кэша...");
  return await updateCache();
}

// Проверка кэша
fetchData();
// fetchData().then(data => console.log('Полученные данные:', data));
