import { Typography, Stack, Box } from "@mui/material";

import TemplateTester from "@/components/TemplateTester/TemplateTester";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import Hero from "@/components/Hero/Hero";

function Home() {
  return (
    <Box sx={{ position: "relative" }}>
      <NavBar />
      <Hero />
      <Footer />
      {/* <TemplateTester /> */}
    </Box>
  );
}

export default Home;
