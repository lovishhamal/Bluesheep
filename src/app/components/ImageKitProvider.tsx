"use client";

import { IKContext } from "imagekitio-react";
import { IMAGEKIT_CONFIG } from "../util/imagekit-config";

export default function ImageKitProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <IKContext
      urlEndpoint={IMAGEKIT_CONFIG.urlEndpoint}
      publicKey={IMAGEKIT_CONFIG.publicKey}
    >
      {children}
    </IKContext>
  );
}

