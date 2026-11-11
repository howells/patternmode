import { ComponentFrame } from "@/components/component-frame";
import { ChannelDemo, ChannelSizes, ChannelVariants } from "@/components/channel-demo";
import { InstallBlock } from "@/components/install-block";
import { componentMetadata } from "@/lib/catalogue";

export const metadata = componentMetadata("channel");

const channelExample = `import { ChannelSlider } from "@patternmode/channel";
import "@patternmode/channel/styles.css";

<ChannelSlider
  label="Lightness"
  background="linear-gradient(to right, #fff, #000)"
  size="xl"
  value={lightness}
  onValueChange={setLightness}
  onValueCommitted={search}
  getThumbColor={(value) => value < 50 ? "#000" : "#fff"}
  labelStart="Lighter"
  labelEnd="Darker"
/>`;

export default function ChannelPage() {
  return (
    <ComponentFrame demo={<ChannelDemo />} slug="channel">
      <ChannelVariants />
      <ChannelSizes />
      <InstallBlock
        command="npm i @patternmode/channel"
        example={channelExample}
        lead="Update local state on every move. Run expensive work in onValueCommitted."
      />
    </ComponentFrame>
  );
}
