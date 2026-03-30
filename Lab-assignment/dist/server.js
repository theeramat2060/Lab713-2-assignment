"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const dotenv_1 = __importDefault(require("dotenv"));
const EventRoute_1 = __importDefault(require("./routes/EventRoute"));
const AuthRoute_1 = __importDefault(require("./routes/AuthRoute"));
const UploadFileService_1 = require("./services/UploadFileService");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Task 2: Setup CORS with specific options
const corsOptions = {
    origin: ['http://localhost:5051', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// Routes
app.use('/events', EventRoute_1.default);
app.use('/auth', AuthRoute_1.default);
// Task 3: Setup file upload endpoint
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
// Task 3-5: File upload endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).send('No file uploaded.');
        }
        const bucket = process.env.SUPABASE_BUCKET_NAME || 'images';
        const filePath = process.env.UPLOAD_DIR || 'uploads';
        // Task 5: Upload with salted filename
        const uploadedPath = await (0, UploadFileService_1.uploadFile)(bucket, filePath, file);
        // Task 4: Get presigned URL for the uploaded file
        const presignedUrl = await (0, UploadFileService_1.getPresignedUrl)(bucket, uploadedPath);
        res.status(200).json({
            status: 'success',
            message: 'File uploaded successfully.',
            filePath: uploadedPath,
            url: presignedUrl,
        });
    }
    catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Error uploading file.');
    }
});
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.json('Hello World!');
});
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
