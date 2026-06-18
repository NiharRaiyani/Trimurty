import { createFileRoute } from "@tanstack/react-router";
import { useLenis } from "@/hooks/useLenis";
import { Nav } from "@/components/site/Nav";
import { HeroBoundary } from "@/components/site/HeroBoundary";
import { TransformationStory } from "@/components/site/TransformationStory";
import { SignatureScene } from "@/components/site/SignatureScene";
import { ProtectionSystems } from "@/components/site/ProtectionSystems";
import { ProofOfPermanence } from "@/components/site/ProofOfPermanence";
import { ProtectionProcess } from "@/components/site/ProtectionProcess";
import { SecureCTA } from "@/components/site/SecureCTA";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trimurti Cement Article — Everything Begins With A Boundary" },
      {
        name: "description",
        content:
          "RCC precast compound walls, security cabins, precast rooms and fencing systems. Manufactured in Dadri, installed across North India.",
      },
      { property: "og:title", content: "Trimurti Cement Article — Everything Begins With A Boundary" },
      { property: "og:description", content: "From empty land to permanent protection. Precast solutions manufactured in Dadri, UP." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  useLenis();
  return (
    <main className="relative bg-background text-foreground">
      <Nav />
      <HeroBoundary />
      <TransformationStory />
      <SignatureScene />
      <ProtectionSystems />
      <ProofOfPermanence />
      <ProtectionProcess />
      <SecureCTA />
      <Footer />
    </main>
  );
}
