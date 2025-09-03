import { SiGithub } from "@icons-pack/react-simple-icons";
import { Button } from "@patternmode/button";
import { Icon } from "@patternmode/icon";
import Link from "next/link";

export function GitHubLink() {
  return (
    <Button
      render={
        <Link
          href="https://github.com/howells/patternmode"
          rel="noopener noreferrer"
          target="_blank"
        />
      }
      size="icon-sm"
      variant="ghost"
    >
      <Icon icon={SiGithub} size="sm" />
      <span className="sr-only">GitHub</span>
    </Button>
  );
}
