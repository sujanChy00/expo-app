const dotenv = require("dotenv");
dotenv.config();

if (!process.env.EXPO_PUBLIC_BASE_URL.includes("api")) {
  console.error(
    `Error: Please change the EXPO_PUBLIC_BASE_URL to prod in .env.`
  );
  process.exit(1);
}

console.log("ALL GOOD🎉");
