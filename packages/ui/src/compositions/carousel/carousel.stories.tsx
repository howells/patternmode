import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel-root";

type CarouselStoryArgs = React.ComponentProps<typeof Carousel>;

const meta: Meta<CarouselStoryArgs> = {
  title: "Carousel",
  component: Carousel,
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Scroll direction",
    },
    slidesToShow: {
      control: "number",
      description: "Number of slides visible",
    },
    freeScroll: {
      control: "boolean",
      description: "Enable free-scroll without snap",
    },
  },
  args: {
    orientation: "horizontal",
    slidesToShow: 1,
    freeScroll: false,
  },
  parameters: {
    builder: {
      category: "display",
      icon: "image",
    },
    docs: {
      description: {
        component:
          "Carousel built on Embla. Supports navigation, dots, multiple slides visible.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SAMPLE_SLIDES = [
  { id: 1, color: "bg-blue-500", label: "Slide 1" },
  { id: 2, color: "bg-green-500", label: "Slide 2" },
  { id: 3, color: "bg-purple-500", label: "Slide 3" },
  { id: 4, color: "bg-orange-500", label: "Slide 4" },
  { id: 5, color: "bg-pink-500", label: "Slide 5" },
];

/**
 * Base carousel with navigation.
 */
export const Base: Story = {
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Carousel {...args}>
      <CarouselContent>
        {SAMPLE_SLIDES.map((slide) => (
          <CarouselItem key={slide.id}>
            <div
              className={`${slide.color} flex aspect-video items-center justify-center rounded-lg font-semibold text-white text-xl`}
            >
              {slide.label}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  ),
};

/**
 * Multiple slides visible.
 */
export const MultipleSlidesVisible: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Show multiple slides at once with slidesToShow prop.",
      },
    },
  },
  render: () => (
    <div className="w-full max-w-2xl">
      <Carousel slidesToShow={3}>
        <CarouselContent className="gap-4">
          {SAMPLE_SLIDES.map((slide) => (
            <CarouselItem key={slide.id}>
              <div
                className={`${slide.color} flex aspect-square items-center justify-center rounded-lg font-semibold text-lg text-white`}
              >
                {slide.label}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};
