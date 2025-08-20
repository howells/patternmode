import { expect, test } from "@playwright/experimental-ct-react";
import { TestAvatar } from "./avatar.stories";

test.describe("Simple Avatar Test", () => {
	test("should render avatar", async ({ mount }) => {
		const component = await mount(<TestAvatar />);
		await expect(component).toBeVisible();
	});
});
