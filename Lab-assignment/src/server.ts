import express, { Request, Response } from "express";
import cors, { CorsOptions } from 'cors';
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';
import eventRoute from "./routes/EventRoute";
import authRoute from "./routes/AuthRoute";
import { uploadFile, getPresignedUrl } from "./services/UploadFileService";

dotenv.config();

const app = express();

// Task 2: Setup CORS with specific options
const corsOptions: CorsOptions = {
  origin: ['http://localhost:5051', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use(express.json());

// Routes
app.use('/events', eventRoute);
app.use('/auth', authRoute);

// Task 3: Setup file upload endpoint
const upload = multer({ storage: multer.memoryStorage() });

// Task 3-5: File upload endpoint
app.post('/upload', upload.single('file'), async (req: any, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    const bucket = process.env.SUPABASE_BUCKET_NAME || 'images';
    const filePath = process.env.UPLOAD_DIR || 'uploads';

    // Task 5: Upload with salted filename
    const uploadedPath = await uploadFile(bucket, filePath, file);
    
    // Task 4: Get presigned URL for the uploaded file
    const presignedUrl = await getPresignedUrl(bucket, uploadedPath);

    res.status(200).json({
      status: 'success',
      message: 'File uploaded successfully.',
      filePath: uploadedPath,
      url: presignedUrl,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Error uploading file.');
  }
});

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.json('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
