import { SiGithub } from "@icons-pack/react-simple-icons";
import { Button } from "@patternmode/ui/components/button";
import { Icon } from "@patternmode/ui/components/icon";
import Link from "next/link";

export function GitHubLink() {
  return (
    <Button
      href="https://github.com/howells/patternmode"
      variant="ghost"
      size="icon-sm"
      render={<Link href="https://github.com/howells/patternmode" target="_blank" rel="noopener noreferrer" />}
    >
      <Icon icon={SiGithub} size="sm" />
      <span className="sr-only">GitHub</span>
    </Button>
  );
}
