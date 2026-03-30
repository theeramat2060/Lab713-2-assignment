"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const endpoint = process.env.SUPABASE_ENDPOINT_URL;
const region = process.env.AWS_REGION;
if (!accessKeyId || !secretAccessKey || !endpoint || !region) {
    throw new Error("Missing required environment variables for AWS S3 configuration");
}
const s3Client = new client_s3_1.S3Client({
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
    endpoint,
    region,
    forcePathStyle: true,
});
exports.default = s3Client;
