import dotenv from "dotenv"
dotenv.config()

import express, {Request ,Response} from "express"
import { useRoutes } from "./routes"
import bodyParser from "body-parser"

const port = process.env.PORT || 8090
const app = express()
app.use(bodyParser.json())
useRoutes(app)

app.get("/", (req: Request, res: Response )=> {
    res.json({
        msg: "eita"
    })
})


app.listen(port, ()=> console.log(`Iniciado na porta ${port}`))
