import { CodeBlock, DocsBlock } from "@howells/site-ui";
import { ComponentFrame } from "@/components/component-frame";
import { CopyCommand } from "@/components/copy-command";
import { ChannelDemo, ChannelSizes } from "@/components/channel-demo";
import "./channel.css";

export const metadata = {
  description: "Gradient channel sliders with glass thumbs and Swatch sizing.",
  title: "Channel | Patternmode",
};

export default function ChannelPage() {
  return (
    <ComponentFrame demo={<ChannelDemo />} slug="channel">
      <ChannelSizes />
      <DocsBlock title="Install">
        <CopyCommand command="npm install @patternmode/channel" />
        <CodeBlock>{`import { ChannelSlider } from "@patternmode/channel";
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
/>`}</CodeBlock>
      </DocsBlock>
    </ComponentFrame>
  );
}
