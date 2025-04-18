/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Rating,
  Paper,
  Grid,
  Container,
} from "@mui/material";
import { motion } from "framer-motion";

const textFieldStyle = {
  backgroundColor: "rgba(255,255,255,0.85)",
  borderRadius: 2,
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.2)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.4)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#9333ea",
    },
  },
};

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ rating, feedback, name, email });
    setRating(0);
    setFeedback("");
    setName("");
    setEmail("");
  };

  return (
    <section className="py-20 px-4">
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Paper
            elevation={3}
            sx={{
              px: { xs: 3, sm: 5, md: 8 },
              py: { xs: 4, md: 6 },
              borderRadius: 6,
              backgroundColor: "rgba(255, 255, 255, 0.55)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontWeight: 700, color: "#4B0082" }}
            >
              Share Your Feedback
            </Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{ color: "#555", mb: 5 }}
            >
              We appreciate your thoughts and suggestions!
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} justifyContent="center">
                {/* Name */}
                <Grid item xs={12} sm={10}>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    sx={textFieldStyle}
                  />
                </Grid>

                {/* Email */}
                <Grid item xs={12} sm={10}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    sx={textFieldStyle}
                  />
                </Grid>

                {/* Rating */}
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    align="center"
                    sx={{ color: "#333", fontWeight: 500 }}
                  >
                    Rate your experience
                  </Typography>
                  <Rating
                    name="rating"
                    value={rating}
                    onChange={(event, newValue) => setRating(newValue)}
                    size="large"
                    sx={{
                      "& .MuiRating-iconFilled": { color: "#9333ea" },
                      "& .MuiRating-iconHover": { color: "#7e22ce" },
                      display: "flex",
                      justifyContent: "center", // Ensures it's centered
                    }}
                  />
                </Grid>

                {/* Feedback Field */}
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="center">
                    <TextField
                      label="Your Feedback"
                      multiline
                      rows={6}
                      variant="outlined"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      required
                      sx={{
                        width: { xs: "100%", sm: "80%", md: "550px" },
                        backgroundColor: "rgba(255,255,255,0.85)",
                        borderRadius: 2,
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.2)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.4)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#9333ea",
                          },
                        },
                      }}
                    />
                  </Box>
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", pt: 4 }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      sx={{
                        width: { xs: "100%", sm: "60%", md: "300px" },
                        px: 6,
                        py: 1.5,
                        borderRadius: "999px",
                        backgroundColor: "#7e22ce",
                        textTransform: "none",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        boxShadow: "0 6px 15px rgba(126, 34, 206, 0.3)",
                        "&:hover": {
                          backgroundColor: "#6b21a8",
                          boxShadow: "0 8px 20px rgba(107, 33, 168, 0.4)",
                        },
                      }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </motion.div>
      </Container>
    </section>
  );
};

export default Feedback;
