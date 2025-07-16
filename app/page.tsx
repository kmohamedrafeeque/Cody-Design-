"use client"

import type React from "react"

import { useState, useCallback, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Lock,
  Unlock,
  RefreshCw,
  Download,
  Copy,
  Palette,
  Sparkles,
  Upload,
  ImageIcon,
  X,
  Briefcase,
  Heart,
  Zap,
  Leaf,
  Crown,
  Globe,
  Code,
  Gamepad2,
  ShoppingBag,
  GraduationCap,
  Stethoscope,
  Camera,
  Type,
  Ruler,
  Eye,
  Layers,
  Waves,
  Mountain,
  Grid3X3,
  Hexagon,
  Circle,
  Square,
  Triangle,
  Star,
  Droplets,
  Flame,
  Snowflake,
  Sun,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

type Color = {
  r: number
  g: number
  b: number
}

type PaletteColor = {
  color: Color
  locked: boolean
  hex: string
}

type ColorModel = "default" | "complementary" | "triadic" | "analogous" | "monochromatic" | "tetradic"

type FontScale = {
  id: string
  name: string
  description: string
  baseSize: number
  ratio: number
  sizes: {
    xs: number
    sm: number
    base: number
    lg: number
    xl: number
    "2xl": number
    "3xl": number
    "4xl": number
    "5xl": number
    "6xl": number
  }
  lineHeights: {
    xs: number
    sm: number
    base: number
    lg: number
    xl: number
    "2xl": number
    "3xl": number
    "4xl": number
    "5xl": number
    "6xl": number
  }
  category: string
  useCase: string[]
}

type TypographyPairing = {
  id: string
  name: string
  description: string
  headingFont: string
  bodyFont: string
  category: string
  fallbacks: {
    heading: string
    body: string
  }
  weights: {
    heading: number[]
    body: number[]
  }
}

type Gradient = {
  id: string
  name: string
  description: string
  category: string
  colors: string[]
  direction: string
  css: string
  icon: React.ComponentType<{ className?: string }>
  tags: string[]
}

type Texture = {
  id: string
  name: string
  description: string
  category: string
  pattern: string
  css: string
  icon: React.ComponentType<{ className?: string }>
  tags: string[]
  opacity?: number
}

type PredefinedPalette = {
  id: string
  name: string
  description: string
  category: string
  colors: string[]
  icon: React.ComponentType<{ className?: string }>
  tags: string[]
  recommendedFontScale?: string
  recommendedTypography?: string
  recommendedGradient?: string
  recommendedTexture?: string
}

const fontScales: FontScale[] = [
  {
    id: "minor-second",
    name: "Minor Second",
    description: "Subtle, conservative scale (1.067)",
    baseSize: 16,
    ratio: 1.067,
    sizes: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 17,
      xl: 18,
      "2xl": 19,
      "3xl": 21,
      "4xl": 22,
      "5xl": 24,
      "6xl": 26,
    },
    lineHeights: {
      xs: 1.4,
      sm: 1.4,
      base: 1.5,
      lg: 1.5,
      xl: 1.5,
      "2xl": 1.4,
      "3xl": 1.4,
      "4xl": 1.3,
      "5xl": 1.3,
      "6xl": 1.2,
    },
    category: "conservative",
    useCase: ["corporate", "legal", "finance"],
  },
  {
    id: "major-second",
    name: "Major Second",
    description: "Balanced, versatile scale (1.125)",
    baseSize: 16,
    ratio: 1.125,
    sizes: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      "2xl": 23,
      "3xl": 26,
      "4xl": 29,
      "5xl": 33,
      "6xl": 37,
    },
    lineHeights: {
      xs: 1.4,
      sm: 1.4,
      base: 1.5,
      lg: 1.5,
      xl: 1.4,
      "2xl": 1.4,
      "3xl": 1.3,
      "4xl": 1.3,
      "5xl": 1.2,
      "6xl": 1.1,
    },
    category: "balanced",
    useCase: ["business", "blog", "portfolio"],
  },
  {
    id: "minor-third",
    name: "Minor Third",
    description: "Harmonious, musical scale (1.2)",
    baseSize: 16,
    ratio: 1.2,
    sizes: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 19,
      xl: 23,
      "2xl": 28,
      "3xl": 33,
      "4xl": 40,
      "5xl": 48,
      "6xl": 58,
    },
    lineHeights: {
      xs: 1.4,
      sm: 1.4,
      base: 1.5,
      lg: 1.4,
      xl: 1.4,
      "2xl": 1.3,
      "3xl": 1.3,
      "4xl": 1.2,
      "5xl": 1.2,
      "6xl": 1.1,
    },
    category: "harmonious",
    useCase: ["creative", "design", "music"],
  },
  {
    id: "major-third",
    name: "Major Third",
    description: "Bold, confident scale (1.25)",
    baseSize: 16,
    ratio: 1.25,
    sizes: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 20,
      xl: 25,
      "2xl": 31,
      "3xl": 39,
      "4xl": 49,
      "5xl": 61,
      "6xl": 76,
    },
    lineHeights: {
      xs: 1.4,
      sm: 1.4,
      base: 1.5,
      lg: 1.4,
      xl: 1.3,
      "2xl": 1.3,
      "3xl": 1.2,
      "4xl": 1.2,
      "5xl": 1.1,
      "6xl": 1.1,
    },
    category: "bold",
    useCase: ["marketing", "landing", "startup"],
  },
  {
    id: "perfect-fourth",
    name: "Perfect Fourth",
    description: "Strong, architectural scale (1.333)",
    baseSize: 16,
    ratio: 1.333,
    sizes: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 21,
      xl: 28,
      "2xl": 37,
      "3xl": 50,
      "4xl": 67,
      "5xl": 89,
      "6xl": 119,
    },
    lineHeights: {
      xs: 1.4,
      sm: 1.4,
      base: 1.5,
      lg: 1.4,
      xl: 1.3,
      "2xl": 1.2,
      "3xl": 1.2,
      "4xl": 1.1,
      "5xl": 1.1,
      "6xl": 1.0,
    },
    category: "strong",
    useCase: ["editorial", "news", "magazine"],
  },
  {
    id: "golden-ratio",
    name: "Golden Ratio",
    description: "Natural, pleasing scale (1.618)",
    baseSize: 16,
    ratio: 1.618,
    sizes: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 26,
      xl: 42,
      "2xl": 68,
      "3xl": 110,
      "4xl": 178,
      "5xl": 288,
      "6xl": 466,
    },
    lineHeights: {
      xs: 1.4,
      sm: 1.4,
      base: 1.5,
      lg: 1.3,
      xl: 1.2,
      "2xl": 1.1,
      "3xl": 1.1,
      "4xl": 1.0,
      "5xl": 1.0,
      "6xl": 0.9,
    },
    category: "dramatic",
    useCase: ["hero", "display", "artistic"],
  },
]

const typographyPairings: TypographyPairing[] = [
  {
    id: "inter-system",
    name: "Inter + System",
    description: "Modern, clean pairing for web applications",
    headingFont: "Inter",
    bodyFont: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    category: "modern",
    fallbacks: {
      heading: "sans-serif",
      body: "sans-serif",
    },
    weights: {
      heading: [400, 500, 600, 700],
      body: [400, 500],
    },
  },
  {
    id: "playfair-source",
    name: "Playfair + Source Sans",
    description: "Elegant serif with clean sans-serif",
    headingFont: "Playfair Display",
    bodyFont: "Source Sans Pro",
    category: "elegant",
    fallbacks: {
      heading: "serif",
      body: "sans-serif",
    },
    weights: {
      heading: [400, 500, 600, 700, 800, 900],
      body: [300, 400, 600],
    },
  },
  {
    id: "montserrat-open",
    name: "Montserrat + Open Sans",
    description: "Geometric heading with friendly body text",
    headingFont: "Montserrat",
    bodyFont: "Open Sans",
    category: "friendly",
    fallbacks: {
      heading: "sans-serif",
      body: "sans-serif",
    },
    weights: {
      heading: [300, 400, 500, 600, 700, 800],
      body: [300, 400, 600, 700],
    },
  },
  {
    id: "poppins-nunito",
    name: "Poppins + Nunito",
    description: "Rounded, approachable font combination",
    headingFont: "Poppins",
    bodyFont: "Nunito",
    category: "approachable",
    fallbacks: {
      heading: "sans-serif",
      body: "sans-serif",
    },
    weights: {
      heading: [300, 400, 500, 600, 700, 800],
      body: [300, 400, 600, 700],
    },
  },
  {
    id: "roboto-slab-roboto",
    name: "Roboto Slab + Roboto",
    description: "Technical slab serif with matching sans",
    headingFont: "Roboto Slab",
    bodyFont: "Roboto",
    category: "technical",
    fallbacks: {
      heading: "serif",
      body: "sans-serif",
    },
    weights: {
      heading: [300, 400, 500, 700, 900],
      body: [300, 400, 500, 700],
    },
  },
  {
    id: "lora-lato",
    name: "Lora + Lato",
    description: "Warm serif with humanist sans-serif",
    headingFont: "Lora",
    bodyFont: "Lato",
    category: "warm",
    fallbacks: {
      heading: "serif",
      body: "sans-serif",
    },
    weights: {
      heading: [400, 500, 600, 700],
      body: [300, 400, 700, 900],
    },
  },
]

const gradients: Gradient[] = [
  // Linear Gradients
  {
    id: "sunset-linear",
    name: "Sunset Linear",
    description: "Warm sunset colors in linear gradient",
    category: "linear",
    colors: ["#ff7e5f", "#feb47b"],
    direction: "45deg",
    css: "linear-gradient(45deg, #ff7e5f 0%, #feb47b 100%)",
    icon: Sun,
    tags: ["warm", "sunset", "orange", "linear"],
  },
  {
    id: "ocean-linear",
    name: "Ocean Linear",
    description: "Deep ocean blues in linear gradient",
    category: "linear",
    colors: ["#667eea", "#764ba2"],
    direction: "135deg",
    css: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    icon: Waves,
    tags: ["blue", "ocean", "cool", "linear"],
  },
  {
    id: "forest-linear",
    name: "Forest Linear",
    description: "Natural forest greens in linear gradient",
    category: "linear",
    colors: ["#11998e", "#38ef7d"],
    direction: "90deg",
    css: "linear-gradient(90deg, #11998e 0%, #38ef7d 100%)",
    icon: Leaf,
    tags: ["green", "nature", "forest", "linear"],
  },
  {
    id: "purple-linear",
    name: "Purple Linear",
    description: "Royal purple gradient",
    category: "linear",
    colors: ["#667eea", "#764ba2"],
    direction: "45deg",
    css: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
    icon: Crown,
    tags: ["purple", "royal", "elegant", "linear"],
  },

  // Radial Gradients
  {
    id: "sunset-radial",
    name: "Sunset Radial",
    description: "Radial sunset burst effect",
    category: "radial",
    colors: ["#ff9a9e", "#fecfef", "#fecfef"],
    direction: "circle",
    css: "radial-gradient(circle, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
    icon: Sun,
    tags: ["warm", "radial", "burst", "pink"],
  },
  {
    id: "ocean-radial",
    name: "Ocean Radial",
    description: "Deep ocean radial gradient",
    category: "radial",
    colors: ["#667eea", "#764ba2"],
    direction: "circle",
    css: "radial-gradient(circle, #667eea 0%, #764ba2 100%)",
    icon: Droplets,
    tags: ["blue", "radial", "ocean", "deep"],
  },
  {
    id: "fire-radial",
    name: "Fire Radial",
    description: "Fiery radial burst",
    category: "radial",
    colors: ["#ff416c", "#ff4b2b"],
    direction: "circle",
    css: "radial-gradient(circle, #ff416c 0%, #ff4b2b 100%)",
    icon: Flame,
    tags: ["red", "fire", "radial", "hot"],
  },

  // Conic Gradients
  {
    id: "rainbow-conic",
    name: "Rainbow Conic",
    description: "Full spectrum rainbow cone",
    category: "conic",
    colors: [
      "#ff0000",
      "#ff8000",
      "#ffff00",
      "#80ff00",
      "#00ff00",
      "#00ff80",
      "#00ffff",
      "#0080ff",
      "#0000ff",
      "#8000ff",
      "#ff00ff",
      "#ff0080",
    ],
    direction: "from 0deg",
    css: "conic-gradient(from 0deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080, #ff0000)",
    icon: Circle,
    tags: ["rainbow", "colorful", "conic", "spectrum"],
  },
  {
    id: "sunset-conic",
    name: "Sunset Conic",
    description: "Warm sunset conic gradient",
    category: "conic",
    colors: ["#ff7e5f", "#feb47b", "#ff7e5f"],
    direction: "from 45deg",
    css: "conic-gradient(from 45deg, #ff7e5f, #feb47b, #ff7e5f)",
    icon: Sun,
    tags: ["warm", "sunset", "conic", "orange"],
  },

  // Multi-stop Gradients
  {
    id: "aurora",
    name: "Aurora",
    description: "Northern lights inspired gradient",
    category: "multi",
    colors: ["#00c9ff", "#92fe9d", "#00c9ff"],
    direction: "45deg",
    css: "linear-gradient(45deg, #00c9ff 0%, #92fe9d 50%, #00c9ff 100%)",
    icon: Snowflake,
    tags: ["aurora", "northern lights", "blue", "green"],
  },
  {
    id: "cosmic",
    name: "Cosmic",
    description: "Deep space cosmic gradient",
    category: "multi",
    colors: ["#667eea", "#764ba2", "#f093fb", "#f5576c"],
    direction: "135deg",
    css: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 75%, #f5576c 100%)",
    icon: Star,
    tags: ["cosmic", "space", "purple", "multi"],
  },
  {
    id: "tropical",
    name: "Tropical",
    description: "Vibrant tropical paradise",
    category: "multi",
    colors: ["#ff9a9e", "#fecfef", "#fecfef", "#a8edea", "#fed6e3"],
    direction: "90deg",
    css: "linear-gradient(90deg, #ff9a9e 0%, #fecfef 25%, #a8edea 75%, #fed6e3 100%)",
    icon: Heart,
    tags: ["tropical", "vibrant", "paradise", "multi"],
  },
]

const textures: Texture[] = [
  // Geometric Patterns
  {
    id: "dots",
    name: "Polka Dots",
    description: "Classic polka dot pattern",
    category: "geometric",
    pattern: "dots",
    css: "radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)",
    icon: Circle,
    tags: ["dots", "polka", "geometric", "classic"],
    opacity: 0.1,
  },
  {
    id: "grid",
    name: "Grid Lines",
    description: "Clean grid line pattern",
    category: "geometric",
    pattern: "grid",
    css: "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
    icon: Grid3X3,
    tags: ["grid", "lines", "geometric", "clean"],
    opacity: 0.1,
  },
  {
    id: "diagonal-lines",
    name: "Diagonal Lines",
    description: "Diagonal stripe pattern",
    category: "geometric",
    pattern: "diagonal",
    css: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)",
    icon: Square,
    tags: ["diagonal", "stripes", "geometric", "lines"],
    opacity: 0.1,
  },
  {
    id: "hexagon",
    name: "Hexagon Pattern",
    description: "Honeycomb hexagon pattern",
    category: "geometric",
    pattern: "hexagon",
    css: "radial-gradient(circle at 25% 25%, transparent 20%, rgba(0,0,0,0.1) 21%, rgba(0,0,0,0.1) 34%, transparent 35%, transparent), linear-gradient(0deg, transparent 24%, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0.1) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.1) 75%, rgba(0,0,0,0.1) 76%, transparent 77%, transparent)",
    icon: Hexagon,
    tags: ["hexagon", "honeycomb", "geometric", "pattern"],
    opacity: 0.1,
  },
  {
    id: "triangles",
    name: "Triangle Pattern",
    description: "Geometric triangle tessellation",
    category: "geometric",
    pattern: "triangles",
    css: "linear-gradient(60deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%, rgba(0,0,0,0.1)), linear-gradient(-60deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%, rgba(0,0,0,0.1))",
    icon: Triangle,
    tags: ["triangles", "tessellation", "geometric", "angular"],
    opacity: 0.1,
  },

  // Organic Patterns
  {
    id: "noise",
    name: "Subtle Noise",
    description: "Fine grain noise texture",
    category: "organic",
    pattern: "noise",
    css: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E\")",
    icon: Mountain,
    tags: ["noise", "grain", "organic", "subtle"],
    opacity: 0.1,
  },
  {
    id: "paper",
    name: "Paper Texture",
    description: "Subtle paper grain texture",
    category: "organic",
    pattern: "paper",
    css: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.05'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3Ccircle cx='37' cy='17' r='1'/%3E%3Ccircle cx='17' cy='37' r='1'/%3E%3Ccircle cx='43' cy='7' r='1'/%3E%3Ccircle cx='7' cy='43' r='1'/%3E%3Ccircle cx='23' cy='53' r='1'/%3E%3Ccircle cx='53' cy='23' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
    icon: Square,
    tags: ["paper", "grain", "organic", "texture"],
    opacity: 0.05,
  },
  {
    id: "waves",
    name: "Wave Pattern",
    description: "Flowing wave texture",
    category: "organic",
    pattern: "waves",
    css: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fillOpacity='0.1' fillRule='evenodd'%3E%3Cpath d='m0 40c0-11.046 8.954-20 20-20s20 8.954 20 20v20h-40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
    icon: Waves,
    tags: ["waves", "flowing", "organic", "water"],
    opacity: 0.1,
  },

  // Artistic Patterns
  {
    id: "crosshatch",
    name: "Crosshatch",
    description: "Hand-drawn crosshatch pattern",
    category: "artistic",
    pattern: "crosshatch",
    css: "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px), repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
    icon: Grid3X3,
    tags: ["crosshatch", "artistic", "hand-drawn", "sketch"],
    opacity: 0.1,
  },
  {
    id: "stipple",
    name: "Stipple",
    description: "Stippled dot texture",
    category: "artistic",
    pattern: "stipple",
    css: "radial-gradient(circle at 20% 80%, rgba(0,0,0,0.1) 1px, transparent 1px), radial-gradient(circle at 80% 20%, rgba(0,0,0,0.1) 1px, transparent 1px), radial-gradient(circle at 40% 40%, rgba(0,0,0,0.1) 1px, transparent 1px)",
    icon: Circle,
    tags: ["stipple", "dots", "artistic", "texture"],
    opacity: 0.1,
  },
  {
    id: "brush-strokes",
    name: "Brush Strokes",
    description: "Painterly brush stroke texture",
    category: "artistic",
    pattern: "brush",
    css: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
    icon: Square,
    tags: ["brush", "strokes", "artistic", "paint"],
    opacity: 0.08,
  },
]

const colorModels: { value: ColorModel; label: string; description: string }[] = [
  { value: "default", label: "Default", description: "AI-inspired balanced palettes" },
  { value: "complementary", label: "Complementary", description: "Colors opposite on the color wheel" },
  { value: "triadic", label: "Triadic", description: "Three evenly spaced colors" },
  { value: "analogous", label: "Analogous", description: "Adjacent colors on the wheel" },
  { value: "monochromatic", label: "Monochromatic", description: "Variations of a single hue" },
  { value: "tetradic", label: "Tetradic", description: "Four colors forming a rectangle" },
]

const predefinedPalettes: PredefinedPalette[] = [
  // Business & Corporate
  {
    id: "corporate-blue",
    name: "Corporate Blue",
    description: "Professional and trustworthy for business websites",
    category: "business",
    colors: ["#1e3a8a", "#3b82f6", "#60a5fa", "#93c5fd", "#dbeafe"],
    icon: Briefcase,
    tags: ["professional", "trust", "corporate", "finance"],
    recommendedFontScale: "major-second",
    recommendedTypography: "inter-system",
    recommendedGradient: "ocean-linear",
    recommendedTexture: "grid",
  },
  {
    id: "executive-gray",
    name: "Executive Gray",
    description: "Sophisticated neutral palette for premium brands",
    category: "business",
    colors: ["#111827", "#374151", "#6b7280", "#9ca3af", "#f3f4f6"],
    icon: Crown,
    tags: ["luxury", "premium", "sophisticated", "minimal"],
    recommendedFontScale: "minor-third",
    recommendedTypography: "playfair-source",
    recommendedGradient: "cosmic",
    recommendedTexture: "paper",
  },
  {
    id: "startup-energy",
    name: "Startup Energy",
    description: "Dynamic and innovative for tech startups",
    category: "business",
    colors: ["#7c3aed", "#a855f7", "#c084fc", "#e9d5ff", "#faf5ff"],
    icon: Zap,
    tags: ["innovation", "tech", "startup", "creative"],
    recommendedFontScale: "major-third",
    recommendedTypography: "montserrat-open",
    recommendedGradient: "purple-linear",
    recommendedTexture: "diagonal-lines",
  },

  // E-commerce & Retail
  {
    id: "shopping-warm",
    name: "Shopping Warm",
    description: "Inviting and conversion-focused for online stores",
    category: "ecommerce",
    colors: ["#dc2626", "#f97316", "#fbbf24", "#fef3c7", "#fffbeb"],
    icon: ShoppingBag,
    tags: ["retail", "shopping", "warm", "conversion"],
    recommendedFontScale: "major-second",
    recommendedTypography: "poppins-nunito",
    recommendedGradient: "sunset-linear",
    recommendedTexture: "dots",
  },
  {
    id: "luxury-retail",
    name: "Luxury Retail",
    description: "Premium and elegant for high-end products",
    category: "ecommerce",
    colors: ["#000000", "#1f2937", "#d4af37", "#f7e7ce", "#ffffff"],
    icon: Crown,
    tags: ["luxury", "premium", "elegant", "gold"],
    recommendedFontScale: "perfect-fourth",
    recommendedTypography: "playfair-source",
    recommendedGradient: "cosmic",
    recommendedTexture: "crosshatch",
  },
  {
    id: "fresh-market",
    name: "Fresh Market",
    description: "Natural and organic for food and lifestyle brands",
    category: "ecommerce",
    colors: ["#166534", "#22c55e", "#86efac", "#dcfce7", "#f0fdf4"],
    icon: Leaf,
    tags: ["organic", "natural", "fresh", "healthy"],
    recommendedFontScale: "minor-third",
    recommendedTypography: "lora-lato",
    recommendedGradient: "forest-linear",
    recommendedTexture: "waves",
  },

  // Creative & Portfolio
  {
    id: "creative-vibrant",
    name: "Creative Vibrant",
    description: "Bold and artistic for creative portfolios",
    category: "creative",
    colors: ["#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6"],
    icon: Palette,
    tags: ["creative", "artistic", "vibrant", "portfolio"],
    recommendedFontScale: "golden-ratio",
    recommendedTypography: "montserrat-open",
    recommendedGradient: "rainbow-conic",
    recommendedTexture: "brush-strokes",
  },
  {
    id: "photographer-mono",
    name: "Photographer Mono",
    description: "Clean monochrome for photography portfolios",
    category: "creative",
    colors: ["#000000", "#404040", "#808080", "#c0c0c0", "#ffffff"],
    icon: Camera,
    tags: ["photography", "minimal", "monochrome", "clean"],
    recommendedFontScale: "minor-second",
    recommendedTypography: "inter-system",
    recommendedGradient: "cosmic",
    recommendedTexture: "noise",
  },
  {
    id: "designer-pastel",
    name: "Designer Pastel",
    description: "Soft and modern for design portfolios",
    category: "creative",
    colors: ["#fecaca", "#fed7aa", "#fef3c7", "#d1fae5", "#ddd6fe"],
    icon: Palette,
    tags: ["pastel", "soft", "modern", "design"],
    recommendedFontScale: "major-third",
    recommendedTypography: "poppins-nunito",
    recommendedGradient: "tropical",
    recommendedTexture: "stipple",
  },

  // Technology & SaaS
  {
    id: "saas-modern",
    name: "SaaS Modern",
    description: "Clean and professional for SaaS platforms",
    category: "technology",
    colors: ["#0f172a", "#1e293b", "#0ea5e9", "#38bdf8", "#f0f9ff"],
    icon: Code,
    tags: ["saas", "modern", "tech", "professional"],
    recommendedFontScale: "major-second",
    recommendedTypography: "inter-system",
    recommendedGradient: "ocean-linear",
    recommendedTexture: "grid",
  },
  {
    id: "developer-dark",
    name: "Developer Dark",
    description: "Dark theme for developer tools and platforms",
    category: "technology",
    colors: ["#0d1117", "#21262d", "#30363d", "#6e7681", "#f0f6fc"],
    icon: Code,
    tags: ["dark", "developer", "coding", "terminal"],
    recommendedFontScale: "minor-second",
    recommendedTypography: "roboto-slab-roboto",
    recommendedGradient: "cosmic",
    recommendedTexture: "hexagon",
  },
  {
    id: "ai-future",
    name: "AI Future",
    description: "Futuristic gradient for AI and ML platforms",
    category: "technology",
    colors: ["#1e1b4b", "#3730a3", "#6366f1", "#a5b4fc", "#e0e7ff"],
    icon: Zap,
    tags: ["ai", "futuristic", "gradient", "innovation"],
    recommendedFontScale: "perfect-fourth",
    recommendedTypography: "montserrat-open",
    recommendedGradient: "aurora",
    recommendedTexture: "triangles",
  },

  // Health & Wellness
  {
    id: "medical-trust",
    name: "Medical Trust",
    description: "Trustworthy and calming for healthcare websites",
    category: "health",
    colors: ["#1e40af", "#3b82f6", "#60a5fa", "#dbeafe", "#eff6ff"],
    icon: Stethoscope,
    tags: ["medical", "healthcare", "trust", "calm"],
    recommendedFontScale: "major-second",
    recommendedTypography: "lora-lato",
    recommendedGradient: "ocean-radial",
    recommendedTexture: "waves",
  },
  {
    id: "wellness-nature",
    name: "Wellness Nature",
    description: "Natural and soothing for wellness brands",
    category: "health",
    colors: ["#064e3b", "#059669", "#34d399", "#a7f3d0", "#ecfdf5"],
    icon: Leaf,
    tags: ["wellness", "nature", "soothing", "health"],
    recommendedFontScale: "minor-third",
    recommendedTypography: "lora-lato",
    recommendedGradient: "forest-linear",
    recommendedTexture: "waves",
  },
  {
    id: "fitness-energy",
    name: "Fitness Energy",
    description: "Energetic and motivating for fitness brands",
    category: "health",
    colors: ["#dc2626", "#ea580c", "#f59e0b", "#fbbf24", "#fef3c7"],
    icon: Zap,
    tags: ["fitness", "energy", "motivation", "active"],
    recommendedFontScale: "major-third",
    recommendedTypography: "poppins-nunito",
    recommendedGradient: "fire-radial",
    recommendedTexture: "diagonal-lines",
  },

  // Education & Learning
  {
    id: "education-friendly",
    name: "Education Friendly",
    description: "Approachable and engaging for educational platforms",
    category: "education",
    colors: ["#1d4ed8", "#3b82f6", "#60a5fa", "#93c5fd", "#dbeafe"],
    icon: GraduationCap,
    tags: ["education", "learning", "friendly", "engaging"],
    recommendedFontScale: "major-second",
    recommendedTypography: "poppins-nunito",
    recommendedGradient: "ocean-linear",
    recommendedTexture: "dots",
  },
  {
    id: "kids-learning",
    name: "Kids Learning",
    description: "Playful and colorful for children's education",
    category: "education",
    colors: ["#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899"],
    icon: GraduationCap,
    tags: ["kids", "playful", "colorful", "fun"],
    recommendedFontScale: "major-third",
    recommendedTypography: "poppins-nunito",
    recommendedGradient: "rainbow-conic",
    recommendedTexture: "stipple",
  },

  // Entertainment & Gaming
  {
    id: "gaming-neon",
    name: "Gaming Neon",
    description: "Electric and exciting for gaming platforms",
    category: "entertainment",
    colors: ["#000000", "#7c3aed", "#ec4899", "#06ffa5", "#ffffff"],
    icon: Gamepad2,
    tags: ["gaming", "neon", "electric", "exciting"],
    recommendedFontScale: "perfect-fourth",
    recommendedTypography: "montserrat-open",
    recommendedGradient: "cosmic",
    recommendedTexture: "hexagon",
  },
  {
    id: "entertainment-warm",
    name: "Entertainment Warm",
    description: "Warm and inviting for media and entertainment",
    category: "entertainment",
    colors: ["#7c2d12", "#ea580c", "#f97316", "#fb923c", "#fed7aa"],
    icon: Heart,
    tags: ["entertainment", "warm", "media", "inviting"],
    recommendedFontScale: "minor-third",
    recommendedTypography: "lora-lato",
    recommendedGradient: "sunset-radial",
    recommendedTexture: "brush-strokes",
  },

  // Trending & Modern
  {
    id: "glassmorphism",
    name: "Glassmorphism",
    description: "Modern glass effect with subtle transparency",
    category: "trending",
    colors: ["#1e1b4b", "#312e81", "#6366f1", "#a5b4fc", "#f1f5f9"],
    icon: Globe,
    tags: ["glassmorphism", "modern", "transparent", "trendy"],
    recommendedFontScale: "minor-third",
    recommendedTypography: "inter-system",
    recommendedGradient: "aurora",
    recommendedTexture: "noise",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Futuristic neon for cutting-edge brands",
    category: "trending",
    colors: ["#0a0a0a", "#1a1a2e", "#16213e", "#0f3460", "#e94560"],
    icon: Zap,
    tags: ["cyberpunk", "neon", "futuristic", "edgy"],
    recommendedFontScale: "perfect-fourth",
    recommendedTypography: "roboto-slab-roboto",
    recommendedGradient: "cosmic",
    recommendedTexture: "triangles",
  },
  {
    id: "sunset-gradient",
    name: "Sunset Gradient",
    description: "Warm gradient inspired by golden hour",
    category: "trending",
    colors: ["#7c3aed", "#c026d3", "#ec4899", "#f97316", "#fbbf24"],
    icon: Heart,
    tags: ["gradient", "sunset", "warm", "golden"],
    recommendedFontScale: "golden-ratio",
    recommendedTypography: "playfair-source",
    recommendedGradient: "tropical",
    recommendedTexture: "waves",
  },
]

const categories = [
  { id: "all", name: "All Templates", icon: Globe },
  { id: "business", name: "Business", icon: Briefcase },
  { id: "ecommerce", name: "E-commerce", icon: ShoppingBag },
  { id: "creative", name: "Creative", icon: Palette },
  { id: "technology", name: "Technology", icon: Code },
  { id: "health", name: "Health", icon: Stethoscope },
  { id: "education", name: "Education", icon: GraduationCap },
  { id: "entertainment", name: "Entertainment", icon: Gamepad2 },
  { id: "trending", name: "Trending", icon: Sparkles },
]

const gradientCategories = [
  { id: "all", name: "All Gradients", icon: Layers },
  { id: "linear", name: "Linear", icon: Square },
  { id: "radial", name: "Radial", icon: Circle },
  { id: "conic", name: "Conic", icon: Sun },
  { id: "multi", name: "Multi-stop", icon: Sparkles },
]

const textureCategories = [
  { id: "all", name: "All Textures", icon: Layers },
  { id: "geometric", name: "Geometric", icon: Grid3X3 },
  { id: "organic", name: "Organic", icon: Mountain },
  { id: "artistic", name: "Artistic", icon: Palette },
]

export default function ColormindClone() {
  useEffect(() => {
    document.title = "Cody Design - Design System Generator"
  }, [])
  const [palette, setPalette] = useState<PaletteColor[]>([])
  const [colorModel, setColorModel] = useState<ColorModel>("default")
  const [isGenerating, setIsGenerating] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedGradientCategory, setSelectedGradientCategory] = useState("all")
  const [selectedTextureCategory, setSelectedTextureCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("generator")
  const [selectedFontScale, setSelectedFontScale] = useState<FontScale>(fontScales[1])
  const [selectedTypography, setSelectedTypography] = useState<TypographyPairing>(typographyPairings[0])
  const [selectedGradient, setSelectedGradient] = useState<Gradient>(gradients[0])
  const [selectedTexture, setSelectedTexture] = useState<Texture>(textures[0])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Convert hex to RGB
  const hexToRgb = (hex: string): Color => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 }
  }

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0,
      s = 0,
      l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    return [h * 360, s * 100, l * 100]
  }

  // Convert HSL to RGB
  const hslToRgb = (h: number, s: number, l: number): Color => {
    h /= 360
    s /= 100
    l /= 100
    const a = s * Math.min(l, 1 - l)
    const f = (n: number) => {
      const k = (n + h * 12) % 12
      return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    }
    return {
      r: Math.round(f(0) * 255),
      g: Math.round(f(8) * 255),
      b: Math.round(f(4) * 255),
    }
  }

  // Convert RGB to HEX
  const rgbToHex = (color: Color): string => {
    const toHex = (n: number) => n.toString(16).padStart(2, "0")
    return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`
  }

  // Generate random color
  const generateRandomColor = (): Color => ({
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  })

  // Apply predefined palette
  const applyPredefinedPalette = (predefinedPalette: PredefinedPalette) => {
    const newPalette: PaletteColor[] = predefinedPalette.colors.map((hex) => ({
      color: hexToRgb(hex),
      locked: false,
      hex: hex.toUpperCase(),
    }))

    setPalette(newPalette)

    // Apply recommended font scale and typography
    if (predefinedPalette.recommendedFontScale) {
      const recommendedScale = fontScales.find((scale) => scale.id === predefinedPalette.recommendedFontScale)
      if (recommendedScale) {
        setSelectedFontScale(recommendedScale)
      }
    }

    if (predefinedPalette.recommendedTypography) {
      const recommendedTypo = typographyPairings.find((typo) => typo.id === predefinedPalette.recommendedTypography)
      if (recommendedTypo) {
        setSelectedTypography(recommendedTypo)
      }
    }

    if (predefinedPalette.recommendedGradient) {
      const recommendedGrad = gradients.find((grad) => grad.id === predefinedPalette.recommendedGradient)
      if (recommendedGrad) {
        setSelectedGradient(recommendedGrad)
      }
    }

    if (predefinedPalette.recommendedTexture) {
      const recommendedTex = textures.find((tex) => tex.id === predefinedPalette.recommendedTexture)
      if (recommendedTex) {
        setSelectedTexture(recommendedTex)
      }
    }

    setActiveTab("generator")

    toast({
      title: "Template applied!",
      description: `${predefinedPalette.name} complete design system is now active`,
    })
  }

  // Filter palettes by category
  const filteredPalettes =
    selectedCategory === "all" ? predefinedPalettes : predefinedPalettes.filter((p) => p.category === selectedCategory)

  // Filter gradients by category
  const filteredGradients =
    selectedGradientCategory === "all" ? gradients : gradients.filter((g) => g.category === selectedGradientCategory)

  // Filter textures by category
  const filteredTextures =
    selectedTextureCategory === "all" ? textures : textures.filter((t) => t.category === selectedTextureCategory)

  // Color distance calculation
  const colorDistance = (c1: Color, c2: Color): number => {
    return Math.sqrt(Math.pow(c1.r - c2.r, 2) + Math.pow(c1.g - c2.g, 2) + Math.pow(c1.b - c2.b, 2))
  }

  // Extract dominant colors from image
  const extractColorsFromImage = useCallback((imageData: ImageData): Color[] => {
    const colors: Color[] = []
    const colorMap = new Map<string, number>()

    // Sample every 10th pixel for performance
    for (let i = 0; i < imageData.data.length; i += 40) {
      const r = imageData.data[i]
      const g = imageData.data[i + 1]
      const b = imageData.data[i + 2]
      const alpha = imageData.data[i + 3]

      // Skip transparent pixels
      if (alpha < 128) continue

      // Quantize colors to reduce noise
      const quantizedR = Math.floor(r / 32) * 32
      const quantizedG = Math.floor(g / 32) * 32
      const quantizedB = Math.floor(b / 32) * 32

      const colorKey = `${quantizedR},${quantizedG},${quantizedB}`
      colorMap.set(colorKey, (colorMap.get(colorKey) || 0) + 1)
    }

    // Sort by frequency and get top colors
    const sortedColors = Array.from(colorMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([colorKey]) => {
        const [r, g, b] = colorKey.split(",").map(Number)
        return { r, g, b }
      })

    // Use k-means clustering to get 5 representative colors
    const clusters = kMeansClustering(sortedColors, 5)
    return clusters
  }, [])

  // Simple k-means clustering for color grouping
  const kMeansClustering = (colors: Color[], k: number): Color[] => {
    if (colors.length <= k) return colors

    // Initialize centroids randomly
    let centroids = colors.slice(0, k)

    for (let iteration = 0; iteration < 10; iteration++) {
      const clusters: Color[][] = Array(k)
        .fill(null)
        .map(() => [])

      // Assign colors to nearest centroid
      colors.forEach((color) => {
        let minDistance = Number.POSITIVE_INFINITY
        let closestCentroid = 0

        centroids.forEach((centroid, index) => {
          const distance = colorDistance(color, centroid)
          if (distance < minDistance) {
            minDistance = distance
            closestCentroid = index
          }
        })

        clusters[closestCentroid].push(color)
      })

      // Update centroids
      const newCentroids = clusters.map((cluster) => {
        if (cluster.length === 0) return centroids[0]

        const avgR = Math.round(cluster.reduce((sum, c) => sum + c.r, 0) / cluster.length)
        const avgG = Math.round(cluster.reduce((sum, c) => sum + c.g, 0) / cluster.length)
        const avgB = Math.round(cluster.reduce((sum, c) => sum + c.b, 0) / cluster.length)

        return { r: avgR, g: avgG, b: avgB }
      })

      centroids = newCentroids
    }

    return centroids
  }

  // Analyze uploaded image
  const analyzeImage = useCallback(
    async (file: File) => {
      setIsAnalyzing(true)

      try {
        const imageUrl = URL.createObjectURL(file)
        setUploadedImage(imageUrl)

        const img = new Image()
        img.crossOrigin = "anonymous"

        await new Promise((resolve, reject) => {
          img.onload = resolve
          img.onerror = reject
          img.src = imageUrl
        })

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Resize image for analysis (max 200px for performance)
        const maxSize = 200
        const scale = Math.min(maxSize / img.width, maxSize / img.height)
        const width = img.width * scale
        const height = img.height * scale

        canvas.width = width
        canvas.height = height

        ctx.drawImage(img, 0, 0, width, height)
        const imageData = ctx.getImageData(0, 0, width, height)

        const dominantColors = extractColorsFromImage(imageData)

        const newPalette: PaletteColor[] = dominantColors.map((color) => ({
          color,
          locked: false,
          hex: rgbToHex(color),
        }))

        setPalette(newPalette)
        setActiveTab("generator")

        toast({
          title: "Image analyzed!",
          description: "Color palette extracted from your image",
        })
      } catch (error) {
        toast({
          title: "Analysis failed",
          description: "Could not analyze the image",
          variant: "destructive",
        })
      } finally {
        setIsAnalyzing(false)
      }
    },
    [extractColorsFromImage],
  )

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      analyzeImage(file)
    } else {
      toast({
        title: "Invalid file",
        description: "Please upload an image file",
        variant: "destructive",
      })
    }
  }

  // Remove uploaded image
  const removeImage = () => {
    setUploadedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Generate color based on model
  const generateColorByModel = (baseColor: Color, model: ColorModel, index: number): Color => {
    const [h, s, l] = rgbToHsl(baseColor.r, baseColor.g, baseColor.b)

    switch (model) {
      case "complementary":
        if (index === 1) return hslToRgb((h + 180) % 360, s, l)
        break
      case "triadic":
        if (index === 1) return hslToRgb((h + 120) % 360, s, l)
        if (index === 2) return hslToRgb((h + 240) % 360, s, l)
        break
      case "analogous":
        return hslToRgb((h + index * 30) % 360, s, l)
      case "monochromatic":
        return hslToRgb(h, s, Math.max(10, Math.min(90, l + (index - 2) * 20)))
      case "tetradic":
        if (index === 1) return hslToRgb((h + 90) % 360, s, l)
        if (index === 2) return hslToRgb((h + 180) % 360, s, l)
        if (index === 3) return hslToRgb((h + 270) % 360, s, l)
        break
      default:
        // Default AI-inspired generation with some randomness
        const hueShift = (Math.random() - 0.5) * 60
        const satShift = (Math.random() - 0.5) * 40
        const lightShift = (Math.random() - 0.5) * 40
        return hslToRgb(
          (h + hueShift + 360) % 360,
          Math.max(10, Math.min(90, s + satShift)),
          Math.max(15, Math.min(85, l + lightShift)),
        )
    }
    return baseColor
  }

  // Generate new palette
  const generatePalette = useCallback(async () => {
    setIsGenerating(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newPalette: PaletteColor[] = []
    let baseColor: Color | null = null

    // Find first unlocked color or generate base
    const unlockedIndex = palette.findIndex((p) => !p.locked)
    if (unlockedIndex !== -1 && palette.length > 0) {
      baseColor = palette.find((p) => p.locked)?.color || generateRandomColor()
    } else {
      baseColor = generateRandomColor()
    }

    for (let i = 0; i < 5; i++) {
      if (palette[i]?.locked) {
        newPalette.push(palette[i])
      } else {
        const color = i === 0 ? baseColor : generateColorByModel(baseColor, colorModel, i)
        newPalette.push({
          color,
          locked: false,
          hex: rgbToHex(color),
        })
      }
    }

    setPalette(newPalette)
    setIsGenerating(false)
  }, [palette, colorModel])

  // Toggle lock on color
  const toggleLock = (index: number) => {
    setPalette((prev) => prev.map((p, i) => (i === index ? { ...p, locked: !p.locked } : p)))
  }

  // Copy color to clipboard
  const copyColor = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex)
      toast({
        title: "Color copied!",
        description: `${hex} copied to clipboard`,
      })
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy color to clipboard",
        variant: "destructive",
      })
    }
  }

  // Copy gradient CSS to clipboard
  const copyGradientCSS = async (gradient: Gradient) => {
    try {
      await navigator.clipboard.writeText(`background: ${gradient.css};`)
      toast({
        title: "Gradient CSS copied!",
        description: `${gradient.name} CSS copied to clipboard`,
      })
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy gradient CSS to clipboard",
        variant: "destructive",
      })
    }
  }

  // Helper to generate SVG string for a given CSS background
  const getSvgForBackground = (
    cssBackground: string,
    opacity = 1,
    width: number,
    height: number,
    isGradient: boolean, // New parameter to distinguish
    gradientType?: string, // e.g., "linear", "radial", "conic"
  ): string => {
    // If it's a data URL for SVG (already handled by downloadTexture for SVG files)
    if (cssBackground.startsWith('url("data:image/svg+xml')) {
      const svgContentMatch = cssBackground.match(/url$$"data:image\/svg\+xml,(.*?)"$$/)
      if (svgContentMatch && svgContentMatch[1]) {
        const decodedSvg = decodeURIComponent(svgContentMatch[1])
        // Embed the SVG directly as an image within the main SVG
        return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <image href="data:image/svg+xml,${encodeURIComponent(decodedSvg)}" x="0" y="0" width="${width}" height="${height}" opacity="${opacity}" />
      </svg>`
      }
    }

    // Attempt to parse CSS gradients into native SVG gradients to avoid foreignObject tainting
    if (isGradient) {
      if (gradientType === "linear") {
        const match = cssBackground.match(/linear-gradient$$([^)]*)$$/)
        if (match) {
          const parts = match[1].split(",").map((s) => s.trim())
          let angle = 180 // Default to bottom
          let colors: string[] = []

          if (parts[0].endsWith("deg")) {
            angle = Number.parseFloat(parts[0])
            colors = parts.slice(1)
          } else if (parts[0].startsWith("to ")) {
            const direction = parts[0].substring(3)
            switch (direction) {
              case "top":
                angle = 0
                break
              case "right":
                angle = 90
                break
              case "bottom":
                angle = 180
                break
              case "left":
                angle = 270
                break
              case "top right":
                angle = 45
                break
              case "bottom right":
                angle = 135
                break
              case "bottom left":
                angle = 225
                break
              case "top left":
                angle = 315
                break
            }
            colors = parts.slice(1)
          } else {
            colors = parts
          }

          // Corrected angle conversion for SVG linear gradients
          // CSS angle 0deg is to top, 90deg is to right.
          // SVG x1,y1,x2,y2 define the gradient vector.
          const angleRad = (angle * Math.PI) / 180
          const x1 = 50 - 50 * Math.sin(angleRad)
          const y1 = 50 + 50 * Math.cos(angleRad)
          const x2 = 50 + 50 * Math.sin(angleRad)
          const y2 = 50 - 50 * Math.cos(angleRad)

          const stops = colors
            .map((color, i) => {
              const offset = (i / (colors.length - 1)) * 100
              return `<stop offset="${offset}%" stopColor="${color}" />`
            })
            .join("")

          return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
          <defs>
            <linearGradient id="grad" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">${stops}</linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad)" opacity="${opacity}" />
        </svg>`
        }
      } else if (gradientType === "radial") {
        const match = cssBackground.match(/radial-gradient$$([^)]*)$$/)
        if (match) {
          const parts = match[1].split(",").map((s) => s.trim())
          let colors: string[] = []
          if (parts[0].startsWith("circle") || parts[0].startsWith("ellipse")) {
            colors = parts.slice(1)
          } else {
            colors = parts
          }

          const stops = colors
            .map((color, i) => {
              const offset = (i / (colors.length - 1)) * 100
              return `<stop offset="${offset}%" stopColor="${color}" />`
            })
            .join("")

          return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
          <defs>
            <radialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">${stops}</radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad)" opacity="${opacity}" />
        </svg>`
        }
      }
    }
    // Return empty string if not a supported native SVG gradient or SVG data URL
    return ""
  }

  // Helper to download a CSS background as a PNG image
  const downloadAsPng = async (
    cssBackground: string,
    filename: string,
    width = 400,
    height = 200,
    isGradient = false,
    gradientType?: string,
    opacity = 1,
  ) => {
    // Check if the background type is not supported for PNG download
    if (gradientType === "conic" || (!isGradient && !cssBackground.startsWith('url("data:image/svg+xml'))) {
      toast({
        title: "Download not supported",
        description:
          "This background type cannot be downloaded as a PNG due to browser security restrictions. Please use the 'Copy CSS' option.",
        variant: "destructive",
      })
      return
    }

    const svgString = getSvgForBackground(cssBackground, opacity, width, height, isGradient, gradientType)

    if (!svgString) {
      toast({
        title: "Download failed",
        description: "Could not generate SVG for this background. Please try copying the CSS instead.",
        variant: "destructive",
      })
      return
    }

    const img = new Image()
    // Removed img.crossOrigin = "anonymous" as it's not needed for blob URLs and can cause tainting.
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(svgBlob)

    img.onload = () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        toast({ title: "Error", description: "Could not create canvas context.", variant: "destructive" })
        URL.revokeObjectURL(url)
        return
      }
      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0, width, height)

      try {
        canvas.toBlob((blob) => {
          if (blob) {
            const pngUrl = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = pngUrl
            a.download = filename
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(pngUrl)
            toast({ title: "Image downloaded!", description: `${filename} saved to file.` })
          } else {
            toast({
              title: "Failed to generate image",
              description: "Could not create PNG blob.",
              variant: "destructive",
            })
          }
          URL.revokeObjectURL(url)
        }, "image/png")
      } catch (error: any) {
        console.error("Canvas toBlob error:", error)
        let errorMessage =
          "Could not download image. This might be due to browser security restrictions for complex backgrounds."
        if (error.name === "SecurityError" && error.message.includes("Tainted canvases")) {
          errorMessage += " Try copying the CSS code instead."
        } else {
          errorMessage += ` Error: ${error.message}`
        }
        toast({
          title: "Download failed",
          description: errorMessage,
          variant: "destructive",
        })
        URL.revokeObjectURL(url)
      }
    }

    img.onerror = (e) => {
      console.error("Error loading SVG as image:", e)
      toast({
        title: "Failed to generate image",
        description: "Could not render background to image. Please try again.",
        variant: "destructive",
      })
      URL.revokeObjectURL(url)
    }

    img.src = url
  }

  // Download gradient as PNG
  const downloadGradient = async (gradient: Gradient) => {
    const gradientType = gradient.css.startsWith("linear-gradient")
      ? "linear"
      : gradient.css.startsWith("radial-gradient")
        ? "radial"
        : gradient.css.startsWith("conic-gradient")
          ? "conic"
          : undefined
    downloadAsPng(gradient.css, `${gradient.name.toLowerCase().replace(/\s/g, "-")}.png`, 400, 200, true, gradientType)
  }

  // Helper to get the full inline style string for a texture
  const getTextureInlineStyle = (texture: Texture) => {
    const backgroundSize =
      texture.pattern === "noise" ||
      texture.pattern === "paper" ||
      texture.pattern === "waves" ||
      texture.pattern === "brush"
        ? "60px 60px"
        : "20px 20px"
    const opacityStyle = texture.opacity !== undefined ? `opacity:${texture.opacity};` : ""
    return `background-image:${texture.css};background-size:${backgroundSize};${opacityStyle}`
  }

  // Copy texture CSS to clipboard
  const copyTextureCSS = async (texture: Texture) => {
    try {
      await navigator.clipboard.writeText(getTextureInlineStyle(texture))
      toast({
        title: "Texture CSS copied!",
        description: `${texture.name} CSS copied to clipboard`,
      })
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy texture CSS to clipboard",
        variant: "destructive",
      })
    }
  }

  // Helper to download SVG content from a data URL
  const downloadSvgFromDataUrl = (dataUrl: string, filename: string) => {
    try {
      const svgContent = decodeURIComponent(dataUrl.split(",")[1])
      const blob = new Blob([svgContent], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast({ title: "SVG downloaded!", description: `${filename} saved to file.` })
    } catch (error) {
      toast({ title: "Failed to download SVG", description: "Could not process SVG data.", variant: "destructive" })
    }
  }

  // Download texture (SVG or PNG)
  const downloadTexture = async (texture: Texture) => {
    if (texture.css.startsWith('url("data:image/svg+xml')) {
      const svgDataUrlMatch = texture.css.match(/url$$"([^"]+)"$$/)
      if (svgDataUrlMatch && svgDataUrlMatch[1]) {
        downloadSvgFromDataUrl(svgDataUrlMatch[1], `${texture.name.toLowerCase().replace(/\s/g, "-")}.svg`)
      } else {
        toast({ title: "Error", description: "Could not parse SVG data URL.", variant: "destructive" })
      }
    } else {
      // It's a CSS gradient-based texture, download as PNG
      const styleString = getTextureInlineStyle(texture)
      downloadAsPng(
        styleString,
        `${texture.name.toLowerCase().replace(/\s/g, "-")}.png`,
        400,
        200,
        false,
        undefined,
        texture.opacity,
      )
    }
  }

  // Export design system
  const exportDesignSystem = () => {
    const designSystem = {
      colors: palette.map((p) => p.hex),
      typography: {
        heading: {
          fontFamily: selectedTypography.headingFont,
          fallback: selectedTypography.fallbacks.heading,
          weights: selectedTypography.weights.heading,
        },
        body: {
          fontFamily: selectedTypography.bodyFont,
          fallback: selectedTypography.fallbacks.body,
          weights: selectedTypography.weights.body,
        },
      },
      fontScale: {
        name: selectedFontScale.name,
        ratio: selectedFontScale.ratio,
        sizes: selectedFontScale.sizes,
        lineHeights: selectedFontScale.lineHeights,
      },
      gradient: selectedGradient,
      texture: selectedTexture,
      css: generateCSS(),
    }

    const blob = new Blob([JSON.stringify(designSystem, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "cody-design-design-system.json"
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Design system exported!",
      description: "Complete Cody Design system saved to file",
    })
  }

  // Generate CSS from current settings
  const generateCSS = () => {
    const colorVars = palette.map((p, i) => `  --color-${i + 1}: ${p.hex};`).join("\n")

    const fontSizeVars = Object.entries(selectedFontScale.sizes)
      .map(([key, value]) => `  --font-size-${key}: ${value}px;`)
      .join("\n")

    const lineHeightVars = Object.entries(selectedFontScale.lineHeights)
      .map(([key, value]) => `  --line-height-${key}: ${value};`)
      .join("\n")

    const gradientCss = `  --gradient-background: ${selectedGradient.css};`
    const textureCss =
      selectedTexture.pattern === "noise" ||
      selectedTexture.pattern === "paper" ||
      selectedTexture.pattern === "waves" ||
      selectedTexture.pattern === "brush"
        ? `  --texture-background-image: ${selectedTexture.css};
--texture-background-size: 60px 60px;`
        : `  --texture-background-image: ${selectedTexture.css};
--texture-background-size: 20px 20px;`

    return `:root {
${colorVars}
${fontSizeVars}
${lineHeightVars}
--font-heading: ${selectedTypography.headingFont}, ${selectedTypography.fallbacks.heading};
--font-body: ${selectedTypography.bodyFont}, ${selectedTypography.fallbacks.body};
${gradientCss}
${textureCss}
}

/* Typography Classes */
.heading {
font-family: var(--font-heading);
font-weight: 600;
}

.body {
font-family: var(--font-body);
font-weight: 400;
}

/* Font Size Classes */
${Object.keys(selectedFontScale.sizes)
  .map(
    (key) => `.text-${key} {
font-size: var(--font-size-${key});
line-height: var(--line-height-${key});
}`,
  )
  .join("\n\n")}

/* Color Classes */
${palette
  .map(
    (p, i) => `.text-color-${i + 1} {
color: var(--color-${i + 1});
}

.bg-color-${i + 1} {
background-color: var(--color-${i + 1});
}`,
  )
  .join("\n\n")}

/* Gradient and Texture Classes */
.bg-gradient {
background: var(--gradient-background);
}

.bg-texture {
background-image: var(--texture-background-image);
background-size: var(--texture-background-size);
opacity: ${selectedTexture.opacity || 1};
}`
  }

  // Copy CSS to clipboard
  const copyCSSToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateCSS())
      toast({
        title: "CSS copied!",
        description: "Design system CSS copied to clipboard",
      })
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy CSS to clipboard",
        variant: "destructive",
      })
    }
  }

  // Initialize with first palette
  useEffect(() => {
    if (palette.length === 0) {
      generatePalette()
    }
  }, [generatePalette, palette.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gray-200 rounded-lg border border-gray-300">
              <Palette className="w-8 h-8 text-gray-700" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">Cody Design</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate beautiful color palettes with typography systems. Extract colors from images, choose from
            professional templates, and create complete design systems with Cody Design.
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <Crown className="w-4 h-4" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="generator" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Generator
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              Typography
            </TabsTrigger>
            <TabsTrigger value="backgrounds" className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Backgrounds
            </TabsTrigger>
          </TabsList>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => {
                const IconComponent = category.icon
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    <IconComponent className="w-4 h-4" />
                    {category.name}
                  </Button>
                )
              })}
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPalettes.map((template) => {
                const IconComponent = template.icon
                const recommendedScale = fontScales.find((scale) => scale.id === template.recommendedFontScale)
                const recommendedTypo = typographyPairings.find((typo) => typo.id === template.recommendedTypography)
                const recommendedGrad = gradients.find((grad) => grad.id === template.recommendedGradient)
                const recommendedTex = textures.find((tex) => tex.id === template.recommendedTexture)

                return (
                  <Card
                    key={template.id}
                    className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
                    onClick={() => applyPredefinedPalette(template)}
                  >
                    <div className="space-y-4">
                      {/* Template Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-200 rounded-lg border border-gray-300">
                            <IconComponent className="w-5 h-5 text-gray-700" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg group-hover:text-gray-700 transition-colors">
                              {template.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">{template.description}</p>
                          </div>
                        </div>
                      </div>

                      {/* Color Preview */}
                      <div className="flex rounded-lg overflow-hidden h-16 shadow-inner">
                        {template.colors.map((color, index) => (
                          <div
                            key={index}
                            className="flex-1 transition-transform group-hover:scale-105"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>

                      {/* Typography Preview */}
                      {recommendedTypo && (
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-muted-foreground">Recommended Typography:</div>
                          <div className="text-sm">
                            <span className="font-semibold">{recommendedTypo.headingFont}</span> +{" "}
                            <span>{recommendedTypo.bodyFont}</span>
                          </div>
                          {recommendedScale && (
                            <div className="text-xs text-muted-foreground">
                              Font Scale: {recommendedScale.name} ({recommendedScale.ratio})
                            </div>
                          )}
                        </div>
                      )}

                      {/* Background Preview */}
                      {(recommendedGrad || recommendedTex) && (
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-muted-foreground">Recommended Background:</div>
                          <div className="flex items-center gap-2 text-sm">
                            {recommendedGrad && (
                              <Badge variant="secondary" className="flex items-center gap-1">
                                <Layers className="w-3 h-3" />
                                {recommendedGrad.name}
                              </Badge>
                            )}
                            {recommendedTex && (
                              <Badge variant="secondary" className="flex items-center gap-1">
                                <Waves className="w-3 h-3" />
                                {recommendedTex.name}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {template.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Color Codes */}
                      <div className="text-xs text-muted-foreground font-mono">{template.colors.join(" • ")}</div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Generator Tab */}
          <TabsContent value="generator" className="space-y-8">
            {/* Image Upload Section */}
            <div className="max-w-2xl mx-auto">
              <Card className="p-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    Extract Colors from Image
                  </h3>

                  {uploadedImage ? (
                    <div className="relative inline-block">
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Uploaded"
                        className="max-w-full max-h-48 rounded-lg shadow-md"
                      />
                      <Button size="sm" variant="destructive" className="absolute top-2 right-2" onClick={removeImage}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 hover:border-muted-foreground/50 transition-colors">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isAnalyzing}
                        className="mb-2"
                      >
                        {isAnalyzing ? (
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Upload className="w-4 h-4 mr-2" />
                        )}
                        {isAnalyzing ? "Analyzing..." : "Upload Image"}
                      </Button>
                      <p className="text-sm text-muted-foreground">Upload an image to extract its dominant colors</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Select value={colorModel} onValueChange={(value: ColorModel) => setColorModel(value)}>
                <SelectTrigger className="w-full sm:w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {colorModels.map((model) => (
                    <SelectItem key={model.value} value={model.value}>
                      <div>
                        <div className="font-medium">{model.label}</div>
                        <div className="text-xs text-muted-foreground">{model.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button
                  onClick={generatePalette}
                  disabled={isGenerating}
                  className="bg-gray-700 hover:bg-gray-800 text-white"
                >
                  {isGenerating ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4 mr-2" />
                  )}
                  Generate
                </Button>

                <Button variant="outline" onClick={exportDesignSystem}>
                  <Download className="w-4 h-4 mr-2" />
                  Export System
                </Button>

                <Button variant="outline" onClick={copyCSSToClipboard}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy CSS
                </Button>
              </div>
            </div>

            {/* Color Palette */}
            <Card className="max-w-4xl mx-auto overflow-hidden shadow-md border border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-5 min-h-[400px]">
                {palette.map((paletteColor, index) => (
                  <div
                    key={index}
                    className="relative group cursor-pointer transition-all duration-300"
                    style={{ backgroundColor: paletteColor.hex }}
                    onClick={() => copyColor(paletteColor.hex)}
                  >
                    {/* Color Info Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex flex-col justify-between p-4">
                      {/* Lock Button */}
                      <div className="flex justify-end">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="sm"
                                variant={paletteColor.locked ? "default" : "secondary"}
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleLock(index)
                                }}
                              >
                                {paletteColor.locked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>{paletteColor.locked ? "Unlock color" : "Lock color"}</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      {/* Color Values */}
                      <div className="space-y-2">
                        {paletteColor.locked && (
                          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                            <Lock className="w-3 h-3 mr-1" />
                            Locked
                          </Badge>
                        )}

                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white space-y-1">
                            <div className="font-mono text-sm font-bold">{paletteColor.hex.toUpperCase()}</div>
                            <div className="text-xs opacity-80">
                              RGB({paletteColor.color.r}, {paletteColor.color.g}, {paletteColor.color.b})
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                              <Copy className="w-3 h-3" />
                              Click to copy
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Typography Tab */}
          <TabsContent value="typography" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Font Scale Selection */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Ruler className="w-5 h-5" />
                  Font Scale
                </h3>
                <div className="space-y-4">
                  <Select
                    value={selectedFontScale.id}
                    onValueChange={(value) => {
                      const scale = fontScales.find((s) => s.id === value)
                      if (scale) setSelectedFontScale(scale)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fontScales.map((scale) => (
                        <SelectItem key={scale.id} value={scale.id}>
                          <div>
                            <div className="font-medium">{scale.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {scale.description} - Ratio: {scale.ratio}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Font Scale Preview */}
                  <div className="space-y-2">
                    {Object.entries(selectedFontScale.sizes).map(([key, size]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span
                          className="font-medium"
                          style={{
                            fontSize: `${Math.min(size, 24)}px`,
                            lineHeight:
                              selectedFontScale.lineHeights[key as keyof typeof selectedFontScale.lineHeights],
                          }}
                        >
                          {key.toUpperCase()}
                        </span>
                        <span className="text-sm text-muted-foreground font-mono">
                          {size}px / {selectedFontScale.lineHeights[key as keyof typeof selectedFontScale.lineHeights]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Typography Pairing Selection */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Type className="w-5 h-5" />
                  Typography Pairing
                </h3>
                <div className="space-y-4">
                  <Select
                    value={selectedTypography.id}
                    onValueChange={(value) => {
                      const typo = typographyPairings.find((t) => t.id === value)
                      if (typo) setSelectedTypography(typo)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {typographyPairings.map((typo) => (
                        <SelectItem key={typo.id} value={typo.id}>
                          <div>
                            <div className="font-medium">{typo.name}</div>
                            <div className="text-xs text-muted-foreground">{typo.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Typography Preview */}
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Heading Font</div>
                      <div
                        className="text-2xl font-semibold"
                        style={{
                          fontFamily: `${selectedTypography.headingFont}, ${selectedTypography.fallbacks.heading}`,
                        }}
                      >
                        {selectedTypography.headingFont}
                      </div>
                    </div>
                    <div>
                      <div
                        className="text-base"
                        style={{ fontFamily: `${selectedTypography.bodyFont}, ${selectedTypography.fallbacks.body}` }}
                      >
                        {selectedTypography.bodyFont}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Typography Preview with Colors */}
            <Card className="p-8">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Design System Preview
              </h3>
              <div className="space-y-8">
                {/* Heading Examples */}
                <div className="space-y-4">
                  <h1
                    className="font-bold"
                    style={{
                      fontFamily: `${selectedTypography.headingFont}, ${selectedTypography.fallbacks.heading}`,
                      fontSize: `${selectedFontScale.sizes["4xl"]}px`,
                      lineHeight: selectedFontScale.lineHeights["4xl"],
                      color: palette[0]?.hex || "#000000",
                    }}
                  >
                    Main Heading
                  </h1>
                  <h2
                    className="font-semibold"
                    style={{
                      fontFamily: `${selectedTypography.headingFont}, ${selectedTypography.fallbacks.heading}`,
                      fontSize: `${selectedFontScale.sizes["2xl"]}px`,
                      lineHeight: selectedFontScale.lineHeights["2xl"],
                      color: palette[1]?.hex || "#333333",
                    }}
                  >
                    Section Heading
                  </h2>
                  <h3
                    className="font-medium"
                    style={{
                      fontFamily: `${selectedTypography.headingFont}, ${selectedTypography.fallbacks.heading}`,
                      fontSize: `${selectedFontScale.sizes.lg}px`,
                      lineHeight: selectedFontScale.lineHeights.lg,
                      color: palette[2]?.hex || "#666666",
                    }}
                  >
                    Subsection Heading
                  </h3>
                </div>

                {/* Body Text Examples */}
                <div className="space-y-4">
                  <p
                    style={{
                      fontFamily: `${selectedTypography.bodyFont}, ${selectedTypography.fallbacks.body}`,
                      fontSize: `${selectedFontScale.sizes.base}px`,
                      lineHeight: selectedFontScale.lineHeights.base,
                      color: palette[3]?.hex || "#444444",
                    }}
                  >
                    This is body text that demonstrates how your chosen typography pairing works with the selected color
                    palette. The font scale ensures consistent spacing and hierarchy throughout your design system.
                  </p>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: `${selectedTypography.bodyFont}, ${selectedTypography.fallbacks.body}`,
                      fontSize: `${selectedFontScale.sizes.sm}px`,
                      lineHeight: selectedFontScale.lineHeights.sm,
                      color: palette[4]?.hex || "#888888",
                    }}
                  >
                    Small text for captions, footnotes, and secondary information. The typography system maintains
                    readability across all sizes.
                  </p>
                </div>

                {/* Color Swatches with Typography */}
                <div className="grid grid-cols-5 gap-4">
                  {palette.map((color, index) => (
                    <div key={index} className="text-center">
                      <div
                        className="w-full h-16 rounded-lg mb-2 shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div
                        className="font-mono text-xs font-medium"
                        style={{
                          fontFamily: `${selectedTypography.bodyFont}, ${selectedTypography.fallbacks.body}`,
                          color: color.hex,
                        }}
                      >
                        {color.hex}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Backgrounds Tab */}
          <TabsContent value="backgrounds" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Gradients Selection */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  Gradients
                </h3>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {gradientCategories.map((category) => {
                    const IconComponent = category.icon
                    return (
                      <Button
                        key={category.id}
                        variant={selectedGradientCategory === category.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedGradientCategory(category.id)}
                        className="flex items-center gap-2"
                      >
                        <IconComponent className="w-4 h-4" />
                        {category.name}
                      </Button>
                    )
                  })}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredGradients.map((gradient) => (
                    <Card
                      key={gradient.id}
                      className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => setSelectedGradient(gradient)}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-gray-200 rounded-lg border border-gray-300">
                          <gradient.icon className="w-5 h-5 text-gray-700" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{gradient.name}</h4>
                          <p className="text-sm text-muted-foreground">{gradient.description}</p>
                        </div>
                      </div>
                      <div className="h-24 rounded-lg shadow-inner mb-3" style={{ background: gradient.css }} />
                      <div className="flex justify-between items-center">
                        <Badge variant="secondary" className="text-xs">
                          {gradient.category}
                        </Badge>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation()
                              copyGradientCSS(gradient)
                            }}
                          >
                            <Copy className="w-4 h-4 mr-1" />
                            Copy CSS
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>

              {/* Textures Selection */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Waves className="w-5 h-5" />
                  Textures
                </h3>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {textureCategories.map((category) => {
                    const IconComponent = category.icon
                    return (
                      <Button
                        key={category.id}
                        variant={selectedTextureCategory === category.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTextureCategory(category.id)}
                        className="flex items-center gap-2"
                      >
                        <IconComponent className="w-4 h-4" />
                        {category.name}
                      </Button>
                    )
                  })}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredTextures.map((texture) => (
                    <Card
                      key={texture.id}
                      className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => setSelectedTexture(texture)}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-gray-200 rounded-lg border border-gray-300">
                          <texture.icon className="w-5 h-5 text-gray-700" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{texture.name}</h4>
                          <p className="text-sm text-muted-foreground">{texture.description}</p>
                        </div>
                      </div>
                      <div
                        className="h-24 rounded-lg shadow-inner mb-3"
                        style={{
                          backgroundImage: texture.css,
                          backgroundSize:
                            texture.pattern === "noise" ||
                            texture.pattern === "paper" ||
                            texture.pattern === "waves" ||
                            texture.pattern === "brush"
                              ? "60px 60px"
                              : "20px 20px",
                          opacity: texture.opacity || 1,
                        }}
                      />
                      <div className="flex justify-between items-center">
                        <Badge variant="secondary" className="text-xs">
                          {texture.category}
                        </Badge>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation()
                              copyTextureCSS(texture)
                            }}
                          >
                            <Copy className="w-4 h-4 mr-1" />
                            Copy CSS
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </div>

            {/* Background Preview with Current Palette */}
            <Card className="p-8">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Background Preview
              </h3>
              <div
                className="relative w-full h-64 rounded-lg overflow-hidden shadow-xl flex items-center justify-center text-center text-white text-2xl font-bold"
                style={{
                  background: selectedGradient.css,
                  backgroundImage: selectedTexture.css
                    ? `${selectedTexture.css}, ${selectedGradient.css}`
                    : selectedGradient.css,
                  backgroundSize: selectedTexture.css
                    ? selectedTexture.pattern === "noise" ||
                      selectedTexture.pattern === "paper" ||
                      selectedTexture.pattern === "waves" ||
                      selectedTexture.pattern === "brush"
                      ? "60px 60px"
                      : "20px 20px"
                    : "auto",
                  opacity: selectedTexture.opacity || 1,
                }}
              >
                <div className="absolute inset-0" style={{ background: selectedGradient.css, opacity: 1 }} />
                {selectedTexture.css && (
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: selectedTexture.css,
                      backgroundSize:
                        selectedTexture.pattern === "noise" ||
                        selectedTexture.pattern === "paper" ||
                        selectedTexture.pattern === "waves" ||
                        selectedTexture.pattern === "brush"
                          ? "60px 60px"
                          : "20px 20px",
                      opacity: selectedTexture.opacity || 1,
                    }}
                  />
                )}
                <span className="relative z-10 p-4 rounded-md bg-black/30 backdrop-blur-sm">
                  Your Design Background
                </span>
              </div>
            </Card>

            {/* CSS Output */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Code className="w-5 h-5" />
                Generated CSS
              </h3>
              <div className="relative">
                <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{generateCSS()}</code>
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2 bg-transparent"
                  onClick={copyCSSToClipboard}
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Instructions */}
        <div className="text-center mt-8 space-y-4">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4" />
              Browse professional templates with typography
            </div>
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              Customize font scales and pairings
            </div>
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Upload images to extract colors
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export complete design systems
            </div>
          </div>

          <p className="text-xs text-muted-foreground max-w-lg mx-auto">
            Create complete design systems with harmonious color palettes and typography scales using Cody Design.
            Export CSS variables and design tokens for seamless development integration.
          </p>
        </div>

        {/* Hidden canvas for image analysis */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  )
}
