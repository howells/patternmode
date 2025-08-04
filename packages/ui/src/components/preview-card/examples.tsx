"use client";

import React from "react";
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
      <PreviewCardContent side="top" align="start">
        <PreviewCardArrow />
        <PreviewCardImage
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=225&fit=crop"
          alt="Article preview"
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
          <button className="text-xs text-blue-600 hover:underline">
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
      <PreviewCardTrigger className="text-blue-600 hover:underline cursor-pointer">
        @johndoe
      </PreviewCardTrigger>
      <PreviewCardContent>
        <PreviewCardHeader>
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face"
              alt="John Doe"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <PreviewCardHeading className="text-base">John Doe</PreviewCardHeading>
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
          <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
            Follow
          </button>
        </PreviewCardFooter>
      </PreviewCardContent>
    </PreviewCard>
  );
};
