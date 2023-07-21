import {
  Flex,
  Image,
  Box,
  Button,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useUserContext } from "../contexts/UserContext";
import logo from "../assets/logo.png";

export default function Header() {
  const { user } = useUserContext();

  return (
    <Flex
      align="center"
      justify="space-between"
      bg="#1a202c"
      boxShadow="md"
      fontWeight="700"
      fontSize={{ base: "8px", sm: "11px", md: "16px" }}
      borderBottom="2px"
      borderColor="black"
    >
      <Box>
        <NavLink to="/">
          <Image
            src={logo}
            w={{ base: "6", md: "10" }}
            h={{ base: "6", md: "10" }}
            ml={{ base: "4", sm: "3", md: "4" }}
          />
        </NavLink>
      </Box>
      {user && (
        <Box display={{ base: "none", sm: "initial" }} color="gray.400">
          <Flex gap="4em">
            <NavLink to="/popular-movies">Films</NavLink>
            <NavLink to="/best-movies">Listes</NavLink>
          </Flex>
        </Box>
      )}
      <Box>
        <NavLink to="/login">
          {user ? (
            <Icon
              as={FaUserCircle}
              boxSize={{ base: "2rem", md: "3.5rem" }}
              mr={{ base: "1rem", xl: "2rem" }}
              display={{ base: "none", sm: "initial" }}
              color="gray.400"
            />
          ) : (
            <Button
              display={{ base: "none", sm: "initial" }}
              size={{ base: "xs", sm: "sm", md: "lg" }}
              mr="5"
              my="3"
              color="gray.400"
              bg="gray.700"
              borderRadius="0.5rem"
              boxShadow="md"
            >
              Se connecter
            </Button>
          )}
        </NavLink>
      </Box>
      <Box
        mr="5"
        right="0"
        color="brand.bleu"
        display={{ base: "initial", sm: "none" }}
      >
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
          />
          <MenuList>
            <NavLink to="/login">
              <MenuItem>Se connecter</MenuItem>
            </NavLink>
            <NavLink to="/popular-movies">
              <MenuItem>Films</MenuItem>
            </NavLink>
            <NavLink to="/my-list">
              <MenuItem>Listes</MenuItem>
            </NavLink>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
}
