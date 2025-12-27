"use client";

import HowToTravelGuide from "../how-to-reach-dunai-dolpa/HowToTravelGuide";

type HowToReachDhoProps = {
  videoUrl?: string | null;
};

export default function HowToReachDho({ videoUrl }: HowToReachDhoProps) {
  return <HowToTravelGuide videoUrl={videoUrl} />;
}
