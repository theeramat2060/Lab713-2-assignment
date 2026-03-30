"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = uploadFile;
exports.getPresignedUrl = getPresignedUrl;
const awsConfig_1 = __importDefault(require("../awsConfig"));
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const crypto_1 = require("crypto");
function generateSaltedFilename(originalName) {
    const salt = (0, crypto_1.randomBytes)(16).toString('hex');
    const extension = originalName.split('.').pop();
    return `${salt}.${extension}`;
}
// Task 3-5: Upload file with salted filename
async function uploadFile(bucket, filePath, file) {
    const saltedFilename = generateSaltedFilename(file.originalname);
    const saltedFilePath = `${filePath}/${saltedFilename}`;
    const params = {
        Bucket: bucket,
        Key: saltedFilePath,
        Body: file.buffer,
        ContentType: file.mimetype,
    };
    try {
        await awsConfig_1.default.send(new client_s3_1.PutObjectCommand(params));
        console.log('File uploaded successfully:', saltedFilePath);
        return saltedFilePath;
    }
    catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
}
// Task 4: Generate presigned URL for accessing uploaded files
async function getPresignedUrl(bucket, filePath, expiresIn = 3600) {
    const command = new client_s3_1.GetObjectCommand({
        Bucket: bucket,
        Key: filePath,
    });
    try {
        const url = await (0, s3_request_presigner_1.getSignedUrl)(awsConfig_1.default, command, { expiresIn });
        return url;
    }
    catch (error) {
        console.error('Error generating presigned URL:', error);
        throw error;
    }
}
