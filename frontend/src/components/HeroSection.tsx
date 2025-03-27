import React from "react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  onCtaClick?: () => void;
}

export function HeroSection({
  title,
  subtitle,
  ctaText,
  onCtaClick,
}: HeroSectionProps) {
  const navigate = useNavigate();

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      // Direktno preusmeravanje na javnu chat stranicu
      navigate('/guest-chat');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
        {title}
      </h1>
      <p className="text-lg md:text-xl max-w-2xl text-muted-foreground">
        {subtitle}
      </p>
      <Button
        variant="accent"
        size="xl"
        onClick={handleCtaClick}
        className="mt-8 font-semibold"
      >
        {ctaText}
      </Button>
    </div>
  );
}