import dotenv from "dotenv";
import app from "./app";

dotenv.config();

if (!process.env.APP_PORT) {
  process.exit(1);
}

const port = process.env.APP_PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
