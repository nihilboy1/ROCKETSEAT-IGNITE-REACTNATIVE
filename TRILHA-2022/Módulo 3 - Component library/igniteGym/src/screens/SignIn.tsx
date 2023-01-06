import { VStack, Image, Center, Text, Heading, ScrollView } from "native-base";
import BackgroundImage from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignIn() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator
    >
      <VStack flex="1" bg="gray.700" px="10" pb="12">
        <Image
          source={BackgroundImage}
          alt="Mulheres praticando spinning"
          resizeMode="contain"
          position="absolute"
        />
        <Center mt="16" mb="12">
          <LogoSvg />
          <Text color="gray.100" fontSize="sm" fontFamily="body">
            Treinando mente e corpo
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb="6" fontFamily="heading">
            Acesse sua conta
          </Heading>
          <Input
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input placeholder="Senha" secureTextEntry />
          <Button title="Entrar" />
        </Center>
        <Center mt="18">
          <Text color="gray.100" fontSize="sm" mb="3" fontFamily="body">
            Ainda não tem acesso?
          </Text>
          <Button variant="outline" title="Criar conta" />
        </Center>
      </VStack>
    </ScrollView>
  );
}
