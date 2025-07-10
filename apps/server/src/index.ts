import { app } from "./app.js";
import { env } from "./config.js";

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT} in ${env.NODE_ENV} mode`);
});
