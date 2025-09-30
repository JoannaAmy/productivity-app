"use server";


import { signIn, signOut } from "@/auth";
// import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
// import prisma from "./db";
// import bcrypt from "bcryptjs";

export type SignUpResult = {
  success: boolean;
  error?: string;
  message?: string;
};

export async function signOutAction() {
  try {
    await signOut();
    return {
      success: true,
      message: "Logout successful!",
    };
  } catch (error) {
    console.error("Error during logout", error);
    throw new Error("An unexpected error occurred");
  }
}

export async function signInWithGoogleAction(redirectTo: string = "/") {
  await signIn("google", { redirectTo });
}


// export async function signUpAction(formData: FormData): Promise<SignUpResult> {
//   const email = (formData.get("email") as string).toLowerCase().trim();
//   const password = formData.get("password") as string;
//   const name = formData.get("name") as string;

// if (!email || !password || !name) {
//     return { success: false, error: "All inputs are required" };
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   try {
//     const existingUser = await prisma.user.findUnique({ where: { email } });
//     if (existingUser) {
//       return { success: false, error: "Email is already in use" };
//     }

//     await prisma.user.create({
//       data: { email, password: hashedPassword, name },
//     });

//     // await signIn("credentials", {
//     //   //   redirectTo: "/dashboard",
//     //   email,
//     //   password,
//     // });
//     return { success: true, message: "Signup successful! Redirecting..." };
//   } catch (error) {
//     if (error instanceof PrismaClientKnownRequestError) {
//       if (error.code === "P2002") {
//         return { success: false, error: "Email is already in use" };
//       }
//     }

//     console.error("Error during signup", error);
//     return { success: false, error: "An unexpected error occured" };
//   }
// }


// //   try {
// //     const existingUser = await prisma.user.findUnique({
// //       where: { email },
// //     });

// //     if (existingUser) {
// //       return {
// //         success: false,
// //         error: "Email is already in use",
// //       };
// //     }

// //     await prisma.user.create({
// //       data: {
// //         email,
// //         password: hashedPassword,
// //         name,
// //       },
// //     });

// //     return {
// //       success: true,
// //       message: "Signup successful!",
// //     };
// //   } catch (error) {
// //     console.error("Error during signup", error);
// //     return {
// //       success: false,
// //       error: "An unexpected error occured",
// //     };
// //   }


// export async function signInAction(formData: FormData): Promise<SignUpResult> {
//   const email = (formData.get("email") as string)?.trim().toLowerCase();
//   const password = formData.get("password") as string;

//   if (!email || !password) {
//     return {
//       success: false,
//       error: "Emails and password are required",
//     };
//   }

//   try {
//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       return { success: false, error: "No User found with this email" };
//     }
//     if (!user.password) {
//       return {
//         success: false,
//         error: "This account doesn't support password login",
//       };
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return { success: false, error: "Invalid Password" };
//     }

//     const signInResult = await signIn("credentials", {
//       email,
//       password,
//       redirect: false,
//     });

//     if (signInResult?.error) {
//       return {
//         success: false,
//         error: String(signInResult.error),
//       };
//     }

//     return {
//       success: true,
//       message: "Login successful!",
//     };
//   } catch (error) {
//     console.error("Unexpected error during login", error);
//     return {
//       success: false,
//       error: "An unexpected error occured",
//     };
//   }
// }



// // export async function createComment(formData: FormData) {
// //   const session = await auth();
// //   const user = session?.user;

// //   if (!user || !user.id || !user.name) {
// //     return;
// //   }
// //   const message = formData.get("message") as string;
// //   const postId = formData.get("postId") as string;

// //   try {
// //     await prisma.comment.create({
// //       data: {
// //         name: user.name,
// //         message,
// //         postId: parseInt(postId),
// //         userId: user.id,
// //       },
// //     });
// //     revalidatePath(`/posts/${postId}`);
// //   } catch (error) {
// //     console.error("error", error);
// //   }
// // }

// // //delete comments
// // export async function deleteComment(formData: FormData) {
// //   const commentId = formData.get("commentId") as string;
// //   const postId = formData.get("postId") as string;

// //   await prisma.comment.delete({
// //     where: {
// //       id: parseInt(commentId),
// //     },
// //   });
// //   revalidatePath(`/posts/${postId}`);
// // }

// // //edit comments
// // export async function editComment(formData: FormData) {
// //   const commentId = formData.get("commentId") as string;
// //   const newText = formData.get("newText") as string;
// //   const postId = formData.get("postId") as string;

// //   await prisma.comment.update({
// //     where: {
// //       id: parseInt(commentId),
// //     },
// //     data: {
// //       message: newText,
// //     },
// //   });
// //   revalidatePath(`/posts/${postId}`);
// // }
