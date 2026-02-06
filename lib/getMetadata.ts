import type { Metadata } from "next";

const isProduction = process.env.NODE_ENV === "production";
const baseUrl = isProduction
  ? "https://suilenz.vercel.app"
  : `http://localhost:${process.env.PORT || 3000}`;

const titleTemplate = "%s | SuiLenz - Transaction Explainer";

/**
 * Generates metadata for a given page.
 *
 * @param {Object} options
 * @param {string} options.title Page title
 * @param {string} options.description Page description
 * @param {string} [options.imageRelativePath="/thumbnail.png"] Relative path to the image for the page
 * @returns {Metadata} The generated metadata
 */
export const getMetadata = ({
  title,
  description,
  imageRelativePath = "/thumbnail.png",
}: {
  title: string;
  description: string;
  imageRelativePath?: string;
}): Metadata => {
  const imageUrl = `${baseUrl}${imageRelativePath}`;

  return {
    generator: "SuiLenz Team",
    applicationName: "SuiLenz",
    referrer: "origin-when-cross-origin",
    keywords: [
      "SuiLenz",
      "Sui",
      "Transaction Explainer",
      "Block Explorer",
      "Blockchain Visualization",
      "Mermaid.js",
      "Developer Tools",
      "Crypto",
      "Web3",
    ],
    creator: "SuiLenz Team",
    publisher: "SuiLenz",
    metadataBase: new URL(baseUrl),
    manifest: `${baseUrl}/manifest.json`,
    alternates: {
      canonical: baseUrl,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    title: {
      default: title,
      template: titleTemplate,
    },
    description: description,
    openGraph: {
      title: {
        default: title,
        template: titleTemplate,
      },
      description: description,
      images: [
        {
          url: imageUrl,
          alt: "SuiLenz - High-Fidelity Transaction Explainer",
        },
      ],
      type: "website",
      siteName: "SuiLenz",
      locale: "en_US",
      url: baseUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: {
        default: title,
        template: titleTemplate,
      },
      description: description,
      creator: "@SuiLenz",
      images: [
        {
          url: imageUrl,
          alt: "SuiLenz - High-Fidelity Transaction Explainer",
        },
      ],
    },
    icons: {
      icon: [
        {
          url: `/scan-eye.png`,
          type: "image/png",
        },
      ],
      apple: [
        {
          url: `/scan-eye.png`,
          type: "image/png",
        },
      ],
      shortcut: [
        {
          url: `/scan-eye.png`,
          type: "image/png",
        },
      ],
    },
  };
};
