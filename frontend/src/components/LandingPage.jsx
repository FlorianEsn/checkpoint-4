/* eslint-disable react/jsx-props-no-spreading */
import { Image, Flex, Box, SimpleGrid, Text, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const slides = [
    {
      img: "https://image.tmdb.org/t/p/w780//qWQSnedj0LCUjWNp9fLcMtfgadp.jpg",
    },
    {
      img: "https://image.tmdb.org/t/p/w780/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg",
    },
    {
      img: "https://image.tmdb.org/t/p/w780/4XM8DUTQb3lhLemJC51Jx4a2EuA.jpg",
    },
    {
      img: "https://image.tmdb.org/t/p/w780/oqP1qEZccq5AD9TVTIaO6IGUj7o.jpg",
    },
    {
      img: "https://image.tmdb.org/t/p/w780/uPcN7Ra6AJvmTn432XDohDed4uv.jpg",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = slides.length;
  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };
  const SLIDES_INTERVAL_TIME = 3000;
  const ANIMATION_DIRECTION = "right";
  useEffect(() => {
    const prevSlide = () => {
      setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
    };

    const nextSlide = () => {
      setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
    };

    const automatedSlide = setInterval(() => {
      // eslint-disable-next-line no-unused-expressions
      ANIMATION_DIRECTION.toLowerCase() === "left" ? prevSlide() : nextSlide();
    }, SLIDES_INTERVAL_TIME);
    return () => clearInterval(automatedSlide);
  }, [slidesCount]);
  return (
    <>
      <Flex
        w="full"
        bg="gray.700"
        _dark={{
          bg: "#3e3e3e",
        }}
        p={10}
        alignItems="center"
        justifyContent="center"
      >
        <Flex w="full" overflow="hidden">
          <Flex pos="relative" h="450px" w="full" {...carouselStyle}>
            {slides.map((slide, sid) => (
              // eslint-disable-next-line react/no-array-index-key
              <Box key={`slide-${sid}`} flex="none" boxSize="full" shadow="md">
                <Image
                  src={slide.img}
                  alt="carousel image"
                  boxSize="full"
                  backgroundSize="cover"
                />
              </Box>
            ))}
          </Flex>
        </Flex>
      </Flex>
      <Flex
        bg="gray.700"
        _dark={{
          bg: "#3e3e3e",
        }}
        p={20}
        w="auto"
        justifyContent="center"
        alignItems="center"
      >
        <SimpleGrid
          boxShadow="dark-lg"
          bg="#1a202c"
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={20}
          px={{
            base: 4,
            lg: 16,
            xl: 24,
          }}
          py={20}
          mx="auto"
          _dark={{
            bg: "gray.800",
          }}
          shadow="xl"
        >
          <Box
            title="Lorem ipsum"
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            }
          >
            <Heading size="lg" color="gray.400" mb="3">
              Lorem Ipsum
            </Heading>
            <Text color="gray.400">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
              impedit perferendis suscipit eaque, iste dolor cupiditate
              blanditiis ratione.
            </Text>
          </Box>

          <Box
            title="Lorem Ipsum"
            icon={
              <path
                fillRule="evenodd"
                d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z"
                clipRule="evenodd"
              />
            }
          >
            <Heading size="lg" color="gray.400" mb="3">
              Lorem Ipsum
            </Heading>

            <Text color="gray.400">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
              impedit perferendis suscipit eaque, iste dolor cupiditate
              blanditiis ratione.
            </Text>
          </Box>

          <Box
            title="Lorem Ipsum"
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
              />
            }
          >
            <Heading size="lg" color="gray.400" mb="3">
              Lorem Ipsum
            </Heading>

            <Text color="gray.400">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
              impedit perferendis suscipit eaque, iste dolor cupiditate
              blanditiis ratione.
            </Text>
          </Box>
        </SimpleGrid>
      </Flex>
    </>
  );
}
