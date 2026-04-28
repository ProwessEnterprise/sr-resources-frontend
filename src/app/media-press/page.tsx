import { Metadata } from "next";
import MediaPressContent from "./MediaPressContent";

export const metadata: Metadata = {
  description: "SR Resources media and press - news releases, media contacts, and executive leadership profiles.",
  openGraph: { title: "Media & Press - SR Resources", description: "News, media contacts, and leadership." },
};

export default function MediaPress() {
  return <MediaPressContent />;
}
