"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
//userRoute
const user_1 = __importDefault(require("./routes/user"));
const app = (0, express_1.default)();
const connectionString = "mongodb+srv://rukmanisdb:vjycEqeXgt3fpaS7@cluster0.fw901z3.mongodb.net/QuizApp";
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("hello");
});
//redirect /user to Route
app.use('/user', user_1.default);
mongoose_1.default
    .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
})
    .then(() => {
    console.log("Database Connected Successfuly.");
})
    .catch((err) => {
    console.log("Error Connectiong to the Database");
});
app.listen(process.env.PORT || 3000, () => console.log("server running on port 3000"));
