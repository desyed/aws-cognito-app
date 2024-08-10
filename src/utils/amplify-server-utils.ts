import { authConfig } from "@/app/amplify-cognito-config";
import { NextServer, createServerRunner } from "@aws-amplify/adapter-nextjs";
import { fetchAuthSession, getCurrentUser } from "@aws-amplify/auth/server";  

export const { runWithAmplifyServerContext } = createServerRunner({
  config: {
    Auth: authConfig,
  },
});

export async function authenticateUser(context: NextServer.Context) {
  return await runWithAmplifyServerContext({
    nextServerContext: context,
    operation: async(contextSpec) => {
      try {
        // fetch auth session
        const session = await fetchAuthSession(contextSpec);
        // if there is not tokens in the session then there will be no authentication
        if(!session.tokens) {
          return;
        }
        // collect the user from the contextSpec
        const user = {
          ...(await getCurrentUser(contextSpec)),
          isAdmin: false
        };
        // collect the groups from the accessToken
        const groups = session.tokens.accessToken.payload["congnito:groups"];

        // if the groups contains "Admins" then make the user as admin user
        // @ts-ignore
        user.isAdmin = Boolean(groups && groups.includes("Admins"));

        return user;
      } catch(error) {
        console.log(error);
      }
    }
  });
}