import { useEffect, useState } from "react";
import { Pressable, useColorScheme, View } from "react-native";
import { router } from "expo-router";
import type { InferResponseType } from "hono";
import type { Api } from "../../lib/api.client";
import { useAuth } from "../../lib/auth/AuthProvider";
import { VStack } from "../../components/ui/vstack";
import { HStack } from "../../components/ui/hstack";
import { Button, ButtonText } from "../../components/ui/button";
import { Text } from "../../components/ui/text";
import { Image } from "../../components/ui/image";
import { Center } from "../../components/ui/center";
import { Box } from "../../components/ui/box";

export function App() {
  const scheme = useColorScheme();
  const { user, signOut, getOAuthAccounts, signInWithOAuth } = useAuth();
  const [accounts, setAccounts] = useState<
    InferResponseType<(typeof Api.client)["user"]["oauth-accounts"]["$get"]>["accounts"]
  >([]);

  useEffect(() => {
    void getOAuthAccounts().then((response) => setAccounts(response));
  }, [getOAuthAccounts]);


  return (

    <Center>
      <VStack className="flex flex-col gap-3 flex-1 w-full max-w-[500px] bg-white dark:bg-transparent p-4 rounded-lg">


        {user && (
          <View>
            <Text className="mb-3">User Information</Text>
            <HStack className="flex gap-4 items-center mb-3">
              {user.profilePictureUrl ? (
                <Image
                  source={{ uri: user.profilePictureUrl }}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <View className="w-8 h-8 bg-gray-300 rounded-full" />
              )}
              <View>
                <Text>{user.username}</Text>
                <Text>{user.email}</Text>
              </View>
            </HStack>
            <VStack className="gap-6">
              <Text className="text-gray-500">User ID: {user.id}</Text>
              <Text className="text-gray-500">
                E-Mail Verified: {user.emailVerified ? "yes" : "no"}
              </Text>
            </VStack>
          </View>
        )}
        <Text>OAuth</Text>
        {["Google", "Apple", "Github"].map((provider) => (
          <HStack
            key={provider}
            className="flex items-center justify-between bg-gray-100 rounded-lg p-3"
          >
            <Text>{provider}</Text>
            {accounts.some((account) => account.provider === provider.toLowerCase()) ? (
              <Text className="text-green-500">Connected</Text>
            ) : (
              <Pressable onPress={() => signInWithOAuth({ provider: provider.toLowerCase() })}>
                <Text className="text-gray-900">Connect now</Text>
              </Pressable>
            )}
          </HStack>
        ))}
        <Button
          onPress={() => {
            void signOut().then(() => router.replace("/auth/sign-in"));
          }}
          className={`${scheme === "light" ? "bg-gray-200" : ""}`}
        >
          Sign out
        </Button>
      </VStack>
    </Center >

  );
}