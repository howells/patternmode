import { SiGithub } from "@icons-pack/react-simple-icons";
import { Button } from "@patternmode/button";
import { Icon } from "@patternmode/icon";
import Link from "next/link";

export function GitHubLink() {
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      render={<Link href="https://github.com/howells/patternmode" target="_blank" rel="noopener noreferrer" />}
    >
      <Icon icon={SiGithub} size="sm" />
      <span className="sr-only">GitHub</span>
    </Button>
  );
}
