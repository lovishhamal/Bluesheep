"use client";

import HowToTravelGuide from "../how-to-reach-dunai-dolpa/HowToTravelGuide";

type HowToReachPhoksundoProps = {
  videoUrl?: string | null;
};

export default function HowToReachPhoksundo({ videoUrl }: HowToReachPhoksundoProps) {
  return <HowToTravelGuide videoUrl={videoUrl} />;
}
