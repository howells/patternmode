import { SiGithub } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import { Button } from "@patternmode/ui/components/button";
import { Icon } from "@patternmode/ui/components/icon";

export function GitHubLink() {
  return (
    <Button
      href="https://github.com/howells/patternmode"
      variant="ghost"
      size="icon-sm"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon icon={SiGithub} size="sm" />
      <span className="sr-only">GitHub</span>
    </Button>
  );
}