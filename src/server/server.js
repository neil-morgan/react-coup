import { Server, FlatFile } from "boardgame.io/server";
import { Coup } from "../Game/Game";
import { customAlphabet } from "nanoid";
import path from "path";
import serve from "koa-static";
import { DEFAULT_PORT } from "./config";

const server = Server({
  games: [Coup],
  db: new FlatFile({ dir: "db", logging: false, ttl: 1000 * 60 * 60 }),
});

const PORT = process.env.PORT || DEFAULT_PORT;

const frontEndAppBuildPath = path.resolve(__dirname, "./build");
server.app.use(serve(frontEndAppBuildPath));

server.run({
  port: PORT,
  callback: () => {
    server.app.use(
      async (ctx, next) =>
        await serve(frontEndAppBuildPath)(
          Object.assign(ctx, { path: "index.html" }),
          next
        )
    );
  },
  lobbyConfig: {
    uuid: customAlphabet("ABCDEFGHJKMNOPQRSTUVWXYZ0123456789", 6),
  },
});
