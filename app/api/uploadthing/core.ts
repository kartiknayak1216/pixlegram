import { createUploadthing, type FileRouter } from "uploadthing/next";
import auth from "@/auth";
import { user } from "@/auth";
const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const users =  await user()

      if (!user) throw new Error("Unauthorized");

      return { userId: users?.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;