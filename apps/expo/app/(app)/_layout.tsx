import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";
import { useAuth } from "../../lib/auth/AuthProvider";

export default function AppLayout() {
  const { loading, user } = useAuth();

  console.log("loading", loading);
  console.log("user", user);
  if (loading) {
    return (
      <>
        <Text>Loading...</Text>
        <Stack.Screen options={{ headerShown: false }} />
      </>
    );
  }
  if (!user) {
    return <Redirect href="/auth/sign-in" />;
  }

  return (
    <>
      <Stack />
      <Stack.Screen options={{ headerShown: false }} />
    </>
  );
}
