import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Box, useTheme } from "native-base";
import { AuthRoutes } from "./auth.routes";
import { useAuthContext } from "@hooks/useAuthContext";
import { AppRoutes } from "./app.routes";
import { Loading } from "@components/Loading";

export function Routes() {
  const nativeBaseTheme = useTheme();
  const { user, checkingUserSession } = useAuthContext();
  const theme = DefaultTheme;
  theme.colors.background = nativeBaseTheme.colors.gray[700];
  if (checkingUserSession) {
    return <Loading />;
  }
  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}
