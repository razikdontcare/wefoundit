import { S3Client } from "@aws-sdk/client-s3";
import { env } from "../config";

const client = new S3Client({
    region: env.S3_REGION,
    credentials: {
        accessKeyId: env.S3_ACCESS_KEY,
        secretAccessKey: env.S3_SECRET_KEY,
    },
    bucketEndpoint: true,
})