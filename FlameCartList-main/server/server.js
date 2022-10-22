const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();
require("./config/mongoose.config");
app.use(cookieParser());
// app.use(cors());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
    
//routes begin
require("./routes/mailer.routes")(app)
require("./routes/list.routes")(app)
require("./routes/user.routes")(app)
require("./routes/item.routes")(app)
//routes end
    
app.listen(8000, () => console.log("The server is all fired up on port 8000"));