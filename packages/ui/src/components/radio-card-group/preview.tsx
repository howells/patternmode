"use client";

import { Check, Shield, Star } from "lucide-react";
import React from "react";
import { RadioCardGroup, RadioCardItem } from "./component";

const planOptions = [
  {
    value: "basic",
    title: "Basic Plan",
    description: "Perfect for personal use and small projects",
    price: "$9/month",
    features: ["5 Projects", "10GB Storage", "Email Support"],
    icon: Check,
    popular: false,
  },
  {
    value: "pro",
    title: "Pro Plan",
    description: "Great for professionals and growing teams",
    price: "$29/month",
    features: ["Unlimited Projects", "100GB Storage", "Priority Support"],
    icon: Star,
    popular: true,
  },
  {
    value: "enterprise",
    title: "Enterprise Plan",
    description: "Advanced features for large organizations",
    price: "$99/month",
    features: ["Custom Integration", "Unlimited Storage", "24/7 Support"],
    icon: Shield,
    popular: false,
  },
];

export type RadioCardGroupPreviewProps = {
  /**
   * Layout orientation of the radio card group.
   * Vertical stacks cards in a column, horizontal arranges them in a row.
   */
  orientation?: "vertical" | "horizontal";
  /**
   * Number of card options to display.
   * Controls how many radio card options are shown.
   */
  optionCount?: 2 | 3;
  /**
   * Whether to show pricing information.
   * Displays price and features when enabled for plan selection.
   */
  showPricing?: boolean;
  /**
   * Whether to show icons on cards.
   * Displays relevant icons for better visual recognition.
   */
  showIcons?: boolean;
  /**
   * Whether to show popular badge.
   * Highlights the recommended option when enabled.
   */
  showPopularBadge?: boolean;
  /**
   * Default selected value.
   * Determines which card is pre-selected.
   */
  defaultValue?: "basic" | "pro" | "enterprise";
  /**
   * Card size variant.
   * Controls the padding and overall size of cards.
   */
  size?: "sm" | "md" | "lg";
};

export function RadioCardGroupPreview({
  orientation = "vertical",
  optionCount = 3,
  showPricing = true,
  showIcons = true,
  showPopularBadge = true,
  defaultValue = "basic",
  size = "md",
}: RadioCardGroupPreviewProps = {}) {
  const displayedOptions = planOptions.slice(0, optionCount);

  return (
    <div className="p-8">
      <RadioCardGroup
        defaultValue={defaultValue}
        className={orientation === "horizontal" ? "grid grid-cols-1 md:grid-cols-3 gap-4" : "space-y-4"}
      >
        {displayedOptions.map((option) => {
          const Icon = option.icon;
          return (
            <RadioCardItem
              key={option.value}
              value={option.value}
              className="relative"
            >
              {showPopularBadge && option.popular && (
                <div className="absolute -top-2 left-4 px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                  Most Popular
                </div>
              )}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {showIcons && <Icon className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />}
                    <div className="font-medium text-zinc-900 dark:text-zinc-50">
                      {option.title}
                    </div>
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                    {option.description}
                  </div>
                  {showPricing && (
                    <>
                      <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                        {option.price}
                      </div>
                      <ul className="space-y-1">
                        {option.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                            <Check className="h-3 w-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </RadioCardItem>
          );
        })}
      </RadioCardGroup>
    </div>
  );
}

// Preview props for prop explorer
export const radioCardGroupPreviewProps = [
  {
    name: "layout",
    type: "select",
    description: "Card layout arrangement - controls how cards are arranged in the group.",
    options: ["grid", "stack"],
    defaultValue: "grid",
  },
  {
    name: "showPricing",
    type: "boolean",
    description: "Whether to show pricing information - displays price details when enabled.",
    defaultValue: true,
  },
  {
    name: "showFeatures",
    type: "boolean",
    description: "Whether to show feature lists - displays feature details when enabled.",
    defaultValue: true,
  },
  {
    name: "showIcons",
    type: "boolean",
    description: "Whether to show icons - displays icon indicators when enabled.",
    defaultValue: true,
  },
  {
    name: "showPopularBadge",
    type: "boolean",
    description: "Whether to show popular badge - highlights recommended options when enabled.",
    defaultValue: true,
  },
];
