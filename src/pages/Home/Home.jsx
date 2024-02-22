import { Typography, Stack, Container } from "@mui/material";
import Box from "@mui/material/Box";
import TemplateTester from "@/components/TemplateTester/TemplateTester";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";

function Home() {
  return (
    <Container sx={{ py: 2, position: "relative" }}>
      <Stack gap={1} my={2}>
        <NavBar />
        <Typography textAlign="center" variant="subtitle1">
          React + Redux + MuI + Axios + ESlint + Prettier
        </Typography>
      </Stack>
      <TemplateTester />
      <Footer />
    </Container>
  );
}

export default Home;
