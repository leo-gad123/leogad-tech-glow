import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Palette, RotateCcw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  neonBlue: string;
  neonCyan: string;
  neonPurple: string;
  neonPink: string;
}

const defaultTheme: ThemeColors = {
  primary: "200 100% 50%",
  secondary: "240 5% 26%",
  accent: "180 100% 50%",
  neonBlue: "200 100% 50%",
  neonCyan: "180 100% 50%",
  neonPurple: "280 100% 70%",
  neonPink: "330 100% 70%",
};

interface ThemeCustomizerProps {
  isAdmin?: boolean;
}

export function ThemeCustomizer({ isAdmin = false }: ThemeCustomizerProps) {
  const [colors, setColors] = useState<ThemeColors>(defaultTheme);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('theme_colors')
        .eq('email', 'hakizimanaleogad@gmail.com')
        .maybeSingle();

      if (data?.theme_colors) {
        const savedColors = JSON.parse(JSON.stringify(data.theme_colors)) as ThemeColors;
        setColors(savedColors);
        applyTheme(savedColors);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const applyTheme = (themeColors: ThemeColors) => {
    const root = document.documentElement;
    root.style.setProperty('--primary', themeColors.primary);
    root.style.setProperty('--secondary', themeColors.secondary);
    root.style.setProperty('--accent', themeColors.accent);
    root.style.setProperty('--neon-blue', themeColors.neonBlue);
    root.style.setProperty('--neon-cyan', themeColors.neonCyan);
    root.style.setProperty('--neon-purple', themeColors.neonPurple);
    root.style.setProperty('--neon-pink', themeColors.neonPink);
  };

  const handleColorChange = (key: keyof ThemeColors, value: string) => {
    const newColors = { ...colors, [key]: value };
    setColors(newColors);
    applyTheme(newColors);
  };

  const saveTheme = async () => {
    if (!isAdmin) {
      toast({
        title: "Permission Denied",
        description: "Only admins can save theme changes.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ theme_colors: JSON.parse(JSON.stringify(colors)) })
        .eq('email', 'hakizimanaleogad@gmail.com');

      if (error) throw error;

      toast({
        title: "Theme Saved",
        description: "Your theme has been saved successfully!",
      });
    } catch (error) {
      console.error('Error saving theme:', error);
      toast({
        title: "Error",
        description: "Failed to save theme.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const resetTheme = () => {
    setColors(defaultTheme);
    applyTheme(defaultTheme);
    toast({
      title: "Theme Reset",
      description: "Theme has been reset to default colors.",
    });
  };

  const hslToHex = (hsl: string) => {
    const [h, s, l] = hsl.split(' ').map(v => parseFloat(v.replace('%', '')));
    const hDecimal = h / 360;
    const sDecimal = s / 100;
    const lDecimal = l / 100;

    let r, g, b;
    if (sDecimal === 0) {
      r = g = b = lDecimal;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = lDecimal < 0.5 ? lDecimal * (1 + sDecimal) : lDecimal + sDecimal - lDecimal * sDecimal;
      const p = 2 * lDecimal - q;
      r = hue2rgb(p, q, hDecimal + 1 / 3);
      g = hue2rgb(p, q, hDecimal);
      b = hue2rgb(p, q, hDecimal - 1 / 3);
    }

    const toHex = (x: number) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const hexToHsl = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return '0 0% 0%';

    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  };

  const ColorPicker = ({ label, colorKey }: { label: string; colorKey: keyof ThemeColors }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={hslToHex(colors[colorKey])}
          onChange={(e) => handleColorChange(colorKey, hexToHsl(e.target.value))}
          className="w-12 h-12 rounded cursor-pointer border-2 border-border"
        />
        <span className="text-sm text-muted-foreground font-mono">
          {colors[colorKey]}
        </span>
      </div>
    </div>
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Palette className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Theme Customizer
            </CardTitle>
            <CardDescription>
              Customize your theme colors
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ColorPicker label="Primary Color" colorKey="primary" />
            <ColorPicker label="Secondary Color" colorKey="secondary" />
            <ColorPicker label="Accent Color" colorKey="accent" />
            <ColorPicker label="Neon Blue" colorKey="neonBlue" />
            <ColorPicker label="Neon Cyan" colorKey="neonCyan" />
            <ColorPicker label="Neon Purple" colorKey="neonPurple" />
            <ColorPicker label="Neon Pink" colorKey="neonPink" />

            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={resetTheme}
                className="flex-1"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              {isAdmin && (
                <Button
                  onClick={saveTheme}
                  disabled={isSaving}
                  className="flex-1"
                >
                  {isSaving ? "Saving..." : "Save Theme"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
