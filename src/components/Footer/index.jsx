import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { Box, Typography, Container, Divider } from "@mui/material";

const socialLinks = [
  { icon: <FaTwitter />, link: "https://twitter.com/", color: "#1DA1F2" },
  { icon: <FaLinkedin />, link: "https://linkedin.com/", color: "#0077B5" },
  { icon: <FaGithub />, link: "https://github.com/", color: "#171515" },
  { icon: <FaEnvelope />, link: "mailto:blog@example.com", color: "#EA4335" },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#f5f3ff",
        color: "#1f2937",
        py: 6,
        mt: 12,
        borderTop: "1px solid #e5e7eb",
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            gap={4}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                About Inkspire
              </Typography>
              <Typography
                variant="body2"
                sx={{ maxWidth: 400, color: "#4b5563" }}
              >
                A cozy corner for readers, devs, and creators to discover
                tutorials, thoughts, and stories over a cup of inspiration ☕.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Stay Connected
              </Typography>
              <Box display="flex" gap={2} flexWrap="wrap">
                {socialLinks.map(({ icon, link, color }, i) => (
                  <motion.a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    variants={{
                      rest: { scale: 1 },
                      hover: {
                        scale: 1.2,
                        boxShadow: `0 0 0 10px rgba(0,0,0,0)`,
                        transition: {
                          type: "spring",
                          stiffness: 500,
                          damping: 12,
                        },
                      },
                    }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      backgroundColor: "#ede9fe",
                      color: "#6b7280",
                      border: "1px solid #d1d5db",
                      transition: "all 0.4s ease-in-out",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#e0e7ff";
                      e.currentTarget.style.color = color;
                      e.currentTarget.style.boxShadow = `0 0 12px ${color}66`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#ede9fe";
                      e.currentTarget.style.color = "#6b7280";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {icon}
                    <motion.span
                      className="ring"
                      style={{
                        position: "absolute",
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        backgroundColor: color,
                        opacity: 0.1,
                        zIndex: 0,
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.1, 0.2, 0.1],
                      }}
                      transition={{
                        // repeat: Infinity,
                        duration: 0.1,
                        ease: "easeInOut", // 🔥 use this instead of spring
                      }}
                    />
                  </motion.a>
                ))}
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 4, borderColor: "#ddd6fe" }} />

          <Box textAlign="center">
            <Typography variant="caption" sx={{ color: "#6b7280" }}>
              © {new Date().getFullYear()} Inkspire — Built with joy and
              JavaScript 💜.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
