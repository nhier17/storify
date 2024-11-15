"use server";

import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { Query, ID } from "node-appwrite";
import { parseStringify } from "@/lib/utils";
import { cookies } from "next/headers";
import { avatarPlaceholderUrl } from "@/constants";
import { redirect } from "next/navigation";

const getUserByEmail = async (email: string) => {
    const { databases } = await createAdminClient();

    const user = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("email", email)]
    );
    return user.total > 0 ? user.documents[0] : null;
}

const handleError = (error: unknown, message: string) => {
    console.log(error, message);
    throw error;
  };

//send email otp
export const sendEmailOtp = async ({ email }: { email: string }) => {
    const { account } = await createAdminClient();

    try {
        const session = await account.createEmailToken(ID.unique(), email);
        return session.userId;
    } catch (error) {
        handleError(error, "Failed to send email otp");
    }
}

//create user
export const createAccount = async ({
    fullName,
    email,
  }: {
    fullName: string;
    email: string;
  }) => {
    const existingUser = await getUserByEmail(email);

    const accountId = await sendEmailOtp({ email });

    if(!existingUser) {
    const { databases } = await createAdminClient();

    await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        {
            fullName,
            email,
            avatarUrl: avatarPlaceholderUrl,
            accountId,
        }
    );
    }
    return parseStringify({ accountId });
  }

  //verify email otp
  export const verifySecret = async ({
    accountId,
    password,
  }: {
    accountId: string;
    password: string;
  }) => {
    try {
        const { account } = await createAdminClient();
        const session = await account.createSession(accountId, password);
        
        (await cookies()).set("appwrite.session", session.secret, {
            httpOnly: true,
            secure: true,
            path: "/",
            sameSite: "strict",
        });

        return parseStringify({ sessionId: session.$id });
    } catch (error) {
        handleError(error, "Failed to verify email otp");
    }
  }

  //get current user
  export const getCurrentUser = async () => {
 try {
        const { account, databases } = await createSessionClient();
        const result = await account.get();
        const user = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", result.$id)]
        );
        if(user.total <= 0) return null;
        return parseStringify(user.documents[0]);
    } catch (error) {
        handleError(error, "Failed to get current user");
    }
  }

  //sign in user
  export const signInUser = async ({ email }: { email: string; }) => {
    try {
       const existingUser = await getUserByEmail(email);

       if(existingUser) {
        await sendEmailOtp({ email });
        return parseStringify({ accountId: existingUser.accountId });
       }
    } catch (error) {
        handleError(error, "Failed to sign in user");
    }
  }

  //sign out user
  export const signOutUser = async () => {
    const { account } = await createSessionClient();
    try {
        await account.deleteSession("current");
        (await cookies()).delete("appwrite.session");
    } catch (error) {
        handleError(error, "Failed to sign out user");
    } finally {
        redirect("/sign-in");
    }
  }
