export const appwriteConfig = {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
    databaseId: process.env.APPWRITE_DATABASE_ID!,
    userCollectionId: process.env.APPWRITE_USER_COLLECTION_ID!,
    fileCollectionId: process.env.APPWRITE_FILE_COLLECTION_ID!,
    storageId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET!,
    secretKey: process.env.APPWRITE_SECRET!,
}