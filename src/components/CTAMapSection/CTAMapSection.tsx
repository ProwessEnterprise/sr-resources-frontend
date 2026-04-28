"use client";

import { useEffect, useState, useRef } from "react";
import { Box, Typography, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomButton from "@/components/CustomButton/CustomButton";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import { getLocations } from "@/services/PageService";
import { Location } from "@/interfaces/Strapi";
import { colors, fontFamily } from "@/theme/theme";

const MAP_WIDTH = 960;
const MAP_HEIGHT = 500;

interface CTAMapSectionProps {
  title?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export default function CTAMapSection({
  title,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
}: CTAMapSectionProps) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  const projection = geoNaturalEarth1()
    .scale(160)
    .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2]);

  const pathGenerator = geoPath().projection(projection);

  useEffect(() => {
    getLocations().then((res) => setLocations(res?.data || []));

    fetch("/world-110m.json")
      .then((r) => r.json())
      .then((topo) => {
        const geo = feature(topo, topo.objects.countries) as any;
        setCountries(geo.features);
      });
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        backgroundColor: "#dce8f8",
        overflow: "hidden",
      }}
    >
      {/* Map fills the entire section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
        }}
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          {/* Country shapes */}
          {countries.map((feat, i) => (
            <path
              key={i}
              d={pathGenerator(feat) || ""}
              fill="#c2d4ea"
              stroke="#b3c7df"
              strokeWidth={0.5}
            />
          ))}

          {/* Location pins */}
          {locations.map((loc) => {
            const coords = projection([loc.longitude, loc.latitude]);
            if (!coords) return null;
            return (
              <g key={loc.id}>
                {/* Outer glow */}
                <circle
                  cx={coords[0]}
                  cy={coords[1]}
                  r={12}
                  fill="rgba(36, 99, 235, 0.15)"
                />
                {/* Pin dot */}
                <circle
                  cx={coords[0]}
                  cy={coords[1]}
                  r={6}
                  fill={colors.primary}
                />
                {/* Label */}
                <text
                  x={coords[0]}
                  y={coords[1] - 14}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="700"
                  fontFamily="'Manrope', sans-serif"
                  fill={colors.black}
                >
                  {loc.name}
                </text>
              </g>
            );
          })}
        </svg>
      </Box>

      {/* Title + Buttons overlay on the left */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: { xs: 2, md: 6 },
          zIndex: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: fontFamily.heading,
            fontWeight: 600,
            fontSize: "clamp(1.5rem, 4.5vw, 3.5rem)",
            color: colors.black,
            textTransform: "uppercase",
            lineHeight: 1.2,
            mb: 2,
          }}
        >
          {title || ""}
        </Typography>

        <Stack direction="row" spacing={2}>
          {primaryButtonText && (
            <CustomButton variant="outlined" colorScheme="dark" onClick={onPrimaryClick}>
              {primaryButtonText}
            </CustomButton>
          )}
          {secondaryButtonText && (
            <CustomButton onClick={onSecondaryClick} endIcon={<ArrowForwardIcon />}>
              {secondaryButtonText}
            </CustomButton>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
