import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

export default function Authentication() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const { setUser } = useUserContext();
  const toast = useToast();
  const navigate = useNavigate();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!nickname || !email || !password) {
      toast({
        title: "Erreur.",
        description: "Impossible de vous inscrire, veuillez réessayer.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    } else {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname,
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          toast({
            title: "Inscription réussie",
            description: "Vous êtes inscrit",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom-right",
          });
          navigate("/");
        })
        .catch((err) => {
          console.error("Error: ", err);
        });
    }
  };

  return (
    <form>
      <Stack
        direction={{ base: "column", md: "row" }}
        bg="gray.700"
        minH="90vh"
      >
        <Flex p={8} flex={1} align="center" justify="center">
          <Stack
            spacing={4}
            w="full"
            maxW="md"
            border="2px"
            p="4"
            borderRadius="md"
            boxShadow="dark-lg"
          >
            <Heading fontSize="2xl" color="black">
              Inscription
            </Heading>
            <FormControl id="nickname">
              <FormLabel color="black">Pseudo :</FormLabel>
              <Input
                bg="white"
                required
                name="nickname"
                placeholder="Pseudo"
                type="text"
                onChange={handleChangeNickname}
                value={nickname}
                _placeholder={{ color: "gray.500" }}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel color="black">Email :</FormLabel>
              <Input
                required
                bg="white"
                name="email"
                placeholder="Email"
                type="email"
                onChange={handleChangeEmail}
                value={email}
                _placeholder={{ color: "gray.500" }}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel color="black">Mot de passe :</FormLabel>
              <Input
                required
                bg="white"
                name="password"
                placeholder="Mot de passe"
                onChange={handleChangePassword}
                value={password}
                type="password"
              />
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align="start"
                justify="space-between"
              />
              <Button
                border="2px"
                type="button"
                bg="white"
                color="black"
                borderRadius="100rem"
                fontWeight="extrabold"
                onClick={handleSubmit}
              >
                S'inscrire
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </Stack>
    </form>
  );
}
