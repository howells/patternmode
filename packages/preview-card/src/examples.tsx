"use client";

import {
  PreviewCard,
  PreviewCardArrow,
  PreviewCardBody,
  PreviewCardContent,
  PreviewCardDescription,
  PreviewCardFooter,
  PreviewCardHeader,
  PreviewCardHeading,
  PreviewCardImage,
  PreviewCardTrigger,
} from "./component";

export const DefaultExample = () => {
  return (
    <PreviewCard>
      <PreviewCardTrigger className="text-blue-600 hover:underline">
        Hover for preview
      </PreviewCardTrigger>
      <PreviewCardContent>
        <PreviewCardHeader>
          <PreviewCardHeading>Card Title</PreviewCardHeading>
          <PreviewCardDescription>
            Brief description of the content that appears in the preview.
          </PreviewCardDescription>
        </PreviewCardHeader>
      </PreviewCardContent>
    </PreviewCard>
  );
};

export const WithImageExample = () => {
  return (
    <PreviewCard>
      <PreviewCardTrigger className="text-blue-600 hover:underline">
        Read the full article
      </PreviewCardTrigger>
      <PreviewCardContent align="start" side="top">
        <PreviewCardArrow />
        <PreviewCardImage
          alt="Article preview"
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=225&fit=crop"
        />
        <PreviewCardHeader>
          <PreviewCardHeading>The Future of Web Development</PreviewCardHeading>
          <PreviewCardDescription>
            Exploring the latest trends and technologies shaping the web.
          </PreviewCardDescription>
        </PreviewCardHeader>
        <PreviewCardBody>
          <div className="space-y-2">
            <p className="text-xs text-zinc-500">Published: March 15, 2024</p>
            <p className="text-xs text-zinc-500">Reading time: 5 minutes</p>
          </div>
        </PreviewCardBody>
        <PreviewCardFooter>
          <span className="text-xs text-zinc-500">TechBlog.com</span>
          <button
            className="text-blue-600 text-xs hover:underline"
            type="button"
          >
            Read more
          </button>
        </PreviewCardFooter>
      </PreviewCardContent>
    </PreviewCard>
  );
};

export const UserProfileExample = () => {
  return (
    <PreviewCard>
      <PreviewCardTrigger className="cursor-pointer text-blue-600 hover:underline">
        @johndoe
      </PreviewCardTrigger>
      <PreviewCardContent>
        <PreviewCardHeader>
          <div className="flex items-center gap-3">
            {/* biome-ignore lint/performance/noImgElement: Preview example uses plain <img> */}
            <img
              alt="John Doe"
              className="h-12 w-12 rounded-full"
              height={48}
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face"
              width={48}
            />
            <div>
              <PreviewCardHeading className="text-base">
                John Doe
              </PreviewCardHeading>
              <PreviewCardDescription className="text-xs">
                Software Engineer
              </PreviewCardDescription>
            </div>
          </div>
        </PreviewCardHeader>
        <PreviewCardBody>
          <p className="text-sm">
            Building amazing web experiences with React and TypeScript.
          </p>
        </PreviewCardBody>
        <PreviewCardFooter>
          <span className="text-xs text-zinc-500">Joined March 2022</span>
          <button
            className="rounded bg-blue-500 px-2 py-1 text-white text-xs hover:bg-blue-600"
            type="button"
          >
            Follow
          </button>
        </PreviewCardFooter>
      </PreviewCardContent>
    </PreviewCard>
  );
};
