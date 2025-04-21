import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from './routes/userRoutes'
import jobSeekerRoutes from "./routes/jobSeekerRoutes";
import employerRoutes from "./routes/employerRoutes";
import jobRoutes from "./routes/jobRoutes"

//1. configuration of the dotenv
dotenv.config();

//2. instance of express
const app = express();

//3. load variables
const port = process.env.PORT || 3000;
console.log(port);

//4. enable cors
app.use(cors());

//5. middleware to parse json
app.use(express.json());

// simple test
app.get("/", (req, res) => { res.send("SkillMatch Backend is alive 🐳✨") });

// my routes
app.use('/api/users', userRoutes)
app.use("/api/job-seeker", jobSeekerRoutes);
app.use("/api/employer", employerRoutes);
app.use("/api/jobs", jobRoutes)


//start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
