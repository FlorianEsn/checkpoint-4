/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserContext();
  const navigate = useNavigate();
  const toast = useToast();
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = () => {
    setIsRegistered(false);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();

    if (!email || !password) {
      toast({
        title: "Erreur.",
        description: "Veuillez remplir tous les champs",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    } else {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const user = data;
          console.info(user);
          setUser(user);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
          toast({
            title: "Authentification réussie.",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom-right",
          });
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch(() => {
          setLoading(false);
          toast({
            title: "Erreur.",
            description: "Impossible de se connecter, veuillez réessayer.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "bottom-right",
          });
        });
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.700"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="black" />
        <Heading color="black">Bienvenue</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="#1a202c"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <Input
                    type="email"
                    placeholder="Email"
                    onChange={handleChangeEmail}
                    value={email}
                    bg="white"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Mot de passe"
                    onChange={handleChangePassword}
                    value={password}
                    bg="white"
                  />
                  <Button
                    bg="gray.300"
                    h="2.5rem"
                    size="sm"
                    ml="1"
                    onClick={handleShowClick}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputGroup>
                <FormHelperText color="gray.400" textAlign="right">
                  <Link href="/">Mot de passe oublié?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                bg="white"
                width="full"
                onClick={handleSubmit}
              >
                Connexion
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Pas de compte?{" "}
        <Link color="gray.400" href="/signup" onClick={handleRegister}>
          S'inscrire
        </Link>
      </Box>
    </Flex>
  );
}

// Login.propTypes = {
//   setIsRegistered: PropTypes.func.isRequired,
// };
