import { Radio as BaseRadio } from "@base-ui-components/react/radio";

export const Radio = (
  props: React.ComponentPropsWithoutRef<typeof BaseRadio.Root>
) => (
  <BaseRadio.Root data-testid="radio" {...props}>
    {props.children}
  </BaseRadio.Root>
);
Radio.displayName = "Radio";
