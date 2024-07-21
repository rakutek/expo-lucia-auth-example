import { Stack } from "expo-router";


import { AppleSignIn } from "../../lib/auth/apple";
import { GithubSignIn } from "../../lib/auth/github";
import { GoogleSignIn } from "../../lib/auth/google";
import { Box } from "../../components/ui/box";
import { VStack } from "../../components/ui/vstack";
import { Text } from "../../components/ui/text";
import { View } from "react-native";

export default function SignIn() {
  return (
    <View>
      <Stack.Screen
        options={{
          title: "Sign In",
        }}
      />


      <VStack
        className="gap-12 flex-1 w-full max-w-[500px]"
      >
        <GithubSignIn />
        {/* <GoogleSignIn />
          <AppleSignIn /> */}
      </VStack>

    </View>
  );
}
