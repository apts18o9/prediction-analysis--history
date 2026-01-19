//express app 

import express from "express"

import cors from "cors"

import creatorRoutes from "./routes/creator.routes";
import videoRoutes from "./routes/video.routes"


const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/creators", creatorRoutes);
app.use("/api/videos", videoRoutes)


app.get("/", (_, res)=> {
    res.json({status: "OK"});
})

export default app;





