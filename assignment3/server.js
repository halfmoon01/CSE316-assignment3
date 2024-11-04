// Sanghyun Jun
// Sanghyun.Jun.1@stonybrook.edu

import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import mysql from 'mysql2';
import cloudinary from 'cloudinary';
import cors from 'cors';
import fs from 'fs/promises';

dotenv.config(); 
const app = express(); 
app.use(cors());
app.use(express.json()); 

// MySQL DB configuration
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Connection failed:', err.stack);
        return;
    }
    console.log('Connected to my database');
});

// Cloudinary configuration
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

async function updateImageUrl(imageFileName) {
    const facilityName = path.parse(imageFileName).name.replace(/_/g, ' '); 
    const imagePath = path.join(path.resolve(), 'Images', imageFileName);
    try {
        const result = await cloudinary.v2.uploader.upload(imagePath, {
            folder: "facilities",
            public_id: facilityName.replace(/\s+/g, '_')
        });
        const imageUrl = result.secure_url;
        const updateQuery = `
            UPDATE facilities
            SET image_url = ?
            WHERE name = ?
        `;
        await db.promise().query(updateQuery, [imageUrl, facilityName]);
        console.log(`facility "${facilityName}" URL updated!! `);
    } catch (error) {
        console.error(`Failure for facility "${facilityName}":`, error);
    }
}
async function updateImageURL() {
    try {
        const files = await fs.readdir(path.join(path.resolve(), 'Images'));
        for (const f of files) {
            await updateImageUrl(f);
        }
    } catch (error) {
        console.error("Failed to process images:", error);
    }
}

const port = process.env.PORT || 5001;
app.listen(port, async () => {
    await updateImageURL();
});