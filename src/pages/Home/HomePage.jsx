import { Box } from "@mui/material";

import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";

function Home() {
  return (
    <Box sx={{ position: "relative" }}>
      <Hero />
      <Footer />
    </Box>
  );
}

export default Home;
