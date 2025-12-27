"use client";

import HowToTravelGuide from "./HowToTravelGuide";

type HowToReachDunaiProps = {
  videoUrl?: string | null;
};

export default function HowToReachDunai({ videoUrl }: HowToReachDunaiProps) {
  return <HowToTravelGuide videoUrl={videoUrl} />;
}
