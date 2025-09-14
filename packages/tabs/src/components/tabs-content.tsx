import { Tabs as BaseTabs } from "@base-ui-components/react/tabs";
import { cx } from "@patternmode/utils/cx";

export const TabsContent = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseTabs.Panel>) => (
  <BaseTabs.Panel className={cx("mt-3", className)} {...props} />
);
