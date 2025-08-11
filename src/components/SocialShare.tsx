"use client";

import { useCallback, useEffect, useState } from "react";
import { Facebook, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";

type Props = {
  url?: string;
  title: string;
};

export default function SocialShare({ url, title }: Props) {
  const [shareUrl, setShareUrl] = useState<string>(url || "");

  useEffect(() => {
    if (!url && typeof window !== "undefined") {
      setShareUrl(window.location.href);
    } else if (url) {
      setShareUrl(url);
    }
  }, [url]);

  const share = useCallback(
    (platform: "facebook" | "twitter" | "linkedin") => {
      const encodedUrl = encodeURIComponent(shareUrl);
      const encodedTitle = encodeURIComponent(title);
      let shareTarget = "";
      if (platform === "facebook") {
        shareTarget = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      } else if (platform === "twitter") {
        shareTarget = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
      } else if (platform === "linkedin") {
        shareTarget = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`;
      }
      window.open(shareTarget, "_blank", "noopener,noreferrer,width=600,height=500");
    },
    [shareUrl, title]
  );

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard");
    } catch {}
  }, [shareUrl]);

  const btn =
    "inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-card text-foreground hover:bg-accent transition-colors";

  return (
    <div className="flex flex-wrap gap-2">
      <button className={`${btn}`} onClick={() => share("facebook")}>
        <Facebook size={16} /> Facebook
      </button>
      <button className={`${btn}`} onClick={() => share("twitter")}>
        <Twitter size={16} /> Twitter
      </button>
      <button className={`${btn}`} onClick={() => share("linkedin")}>
        <Linkedin size={16} /> LinkedIn
      </button>
      <button className={`${btn}`} onClick={copy}>
        <LinkIcon size={16} /> Copy Link
      </button>
    </div>
  );
}
