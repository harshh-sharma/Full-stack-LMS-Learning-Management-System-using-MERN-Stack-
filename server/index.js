const PORT = process.env.PORT || 5000;
import app from "./app.js";
import connectToDB from "./config/db.js";

app.listen(PORT,async() => {
    await connectToDB();
    console.log(`server is successfully running on http://localhost:${PORT}`);
})