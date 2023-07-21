import { useState, useEffect } from "react";
import {
  SimpleGrid,
  Card,
  CardBody,
  Image,
  Stack,
  Center,
  Heading,
  Divider,
  CardFooter,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";

function PopularMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const url = "https://api.themoviedb.org/3/movie/popular";

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setMovies(data.results);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div>
      <Header />
      <Box bg="gray.700">
        <SimpleGrid
          columns={{ base: 1, sm: 1, md: 2, xl: 3 }}
          spacing={10}
          m="auto"
        >
          {movies.map((movie) => (
            <Card
              key={movie.id}
              w={{ base: "300px", sm: "300px", md: "350px" }}
              justify="center"
              align="center"
              m="auto"
              my="4"
              bg="#1a202c"
              border="1px"
              boxShadow="dark-lg"
            >
              <CardBody>
                <Image
                  src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                  alt="Movie poster"
                  borderRadius="lg"
                  maxW="300px"
                  maxH="200px"
                  m="auto"
                />
                <Stack mt="6" spacing="3">
                  <Center>
                    <Heading
                      fontSize={{ base: "16px", md: "20px" }}
                      size="md"
                      color="white"
                    >
                      {movie.title}
                    </Heading>
                  </Center>
                  <Center>
                    <Text
                      color="blue.600"
                      fontSize={{ base: "16px", md: "20px" }}
                    >
                      {movie.vote_average}
                    </Text>
                  </Center>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <NavLink to={`/movie-details/${movie.id}`}>
                  <Button
                    border="1px"
                    borderColor="black"
                    bg="gray.300"
                    textColor="black"
                    boxShadow="lg"
                  >
                    Ajoutez à ma liste
                  </Button>
                </NavLink>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </div>
  );
}

export default PopularMovies;
