import { CodeBlock, DocsBlock } from "@howells/site-ui";
import { Plate } from "@/components/plate";
import { ChannelDemo } from "@/components/channel-demo";
import "./channel.css";

export const metadata = {
  description: "Gradient channel sliders with glass thumbs and Swatch sizing.",
  title: "Channel | Patternmode",
};

export default function ChannelPage() {
  return (
    <Plate slug="channel">
      <ChannelDemo />
      <DocsBlock title="Usage">
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
    </Plate>
  );
}
