const ExpoConfig = require("@expo/config");
const fs = require("fs");
const { exp } = ExpoConfig.getConfig(__dirname);
fs.writeFileSync("./dist/expoConfig.json", JSON.stringify(exp));
