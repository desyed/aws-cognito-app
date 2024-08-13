import { redirect } from "next/navigation";
import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  resendSignUpCode,
  autoSignIn
} from "aws-amplify/auth";
import {getErrorMessage} from "@/lib/get-error-message";

export async function handleSignUp(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: String(formData.get("email")),
      password: String(formData.get("password")),
      options: {
        userAttributes: {
          email: String(formData.get("email")),
          name: String(formData.get("name")),
        },
        // optional
        autoSignIn: true,
      },
    });
  } catch (error) {
    return getErrorMessage(error);
  }
  redirect("/auth/confirm-signup");
}

export async function handleSendEmailVerificationCode(
  prevState: { message: string; errorMessage: string },
  formData: FormData
) {
  let currentState;
  try {
    await resendSignUpCode({
      username: String(formData.get("email")),
    });
    currentState = {
      ...prevState,
      message: "Code sent successfully",
    };
  } catch (error) {
    currentState = {
      ...prevState,
      errorMessage: getErrorMessage(error),
    };
  }

  return currentState;
}

export async function handleConfirmSignUp(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username: String(formData.get("email")),
      confirmationCode: String(formData.get("code")),
    });
    autoSignIn();
  } catch (error) {
    return getErrorMessage(error);
  }
  redirect("/auth/login");
}

export async function handleSignIn(
  formData:  any
) {
  let redirectLink = "/dashboard";
  try {
    const { isSignedIn, nextStep } = await signIn({
      username: formData.email,
      password: formData.password,
    });
    if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
      await resendSignUpCode({
        username: formData.email,
      });
      redirectLink = "/auth/confirm-signup";

    }

  } catch (error) {
    return {error};
  }

  return {redirectLink: redirectLink};
}

export const handleSignOut = async () => {
  try {
    await signOut();
  } catch (error) {
    console.log(getErrorMessage(error));
  }
  redirect("/auth/login");
}