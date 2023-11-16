import express, {Application} from 'express';
import cors from 'cors';
import "./utils/dbConfig"
import mainApp from './mainApp';

const app: Application = express();
const port: number = 5544

app.use(express.json());
app.use(cors())

mainApp(app)

const server = app.listen(port, () =>{
    console.log("server listening on port")
});

process.on("uncaughtException", (err: Error) =>{
    console.log("uncaughtException", err)
    process.exit(1);
})

process.on("unhandledRejection", (reason: any) =>{
    console.log("unhandledRejection", reason)

    server.close(() =>{
        process.exit(1);
    })
})