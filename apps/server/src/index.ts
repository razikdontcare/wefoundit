import { app } from "./app";
import { env } from "./config";

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT} in ${env.NODE_ENV} mode`);
});
