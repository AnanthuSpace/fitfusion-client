import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: import.meta.env.VITE_AWS_S3_ACCESS_KEY,
        secretAccessKey: import.meta.env.VITE_AWS_S3_SECRET_KEY,
    }
});

export const getVideos = async (key) => {
    console.log(import.meta.env.VITE_S3_BUCKET_NAME_VIDEOS)
    const command = new GetObjectCommand({
        Bucket: import.meta.env.VITE_S3_BUCKET_NAME_VIDEOS,
        Key: key,
    });
    console.log(key)
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 * 24 * 7 });
    return url;
}