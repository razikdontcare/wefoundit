import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { env } from "../config";
import {
  IStorageService,
  UploadParams,
  DeleteParams,
  GetParams,
  ListParams,
} from "../interfaces/StorageInterface";
import { Readable } from "stream";

export class StorageService implements IStorageService {
  private client: S3Client;
  private bucket: string;

  constructor() {
    this.client = new S3Client({
      region: env.S3_REGION,
      credentials: {
        accessKeyId: env.S3_ACCESS_KEY,
        secretAccessKey: env.S3_SECRET_KEY,
      },
      bucketEndpoint: true,
    });

    this.bucket = env.S3_BUCKET;
  }

  async upload({
    key,
    prefix,
    body,
    contentType,
  }: UploadParams): Promise<string> {
    const fullKey = prefix ? `${prefix.replace(/\/$/, "")}/${key}` : key;

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: fullKey,
      Body: body,
      ContentType: contentType,
    });

    await this.client.send(command);

    return `${env.S3_BUCKET}/${fullKey}`;
  }

  async delete({ key }: DeleteParams): Promise<boolean> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    try {
      await this.client.send(command);
      return true;
    } catch (err) {
      console.error("Delete failed:", err);
      return false;
    }
  }

  async get({ key }: GetParams): Promise<Buffer> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    const response = await this.client.send(command);

    const stream = response.Body as Readable;

    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    }

    return Buffer.concat(chunks);
  }

  async list(params?: ListParams) {
    const command = new ListObjectsV2Command({
      Bucket: this.bucket,
      Prefix: params?.prefix,
    });

    const response = await this.client.send(command);
    return response.Contents?.map((obj) => obj.Key!) ?? [];
  }
}

export const storageService = new StorageService();
