import { logger } from "./logger";
import { App } from "./app/App";

logger.info("Application starting...");

const port = process.env.PORT || 3457;

const app = new App();
app.express.listen(port, () => {
  logger.info(`server is listening on ${port}`);
});
