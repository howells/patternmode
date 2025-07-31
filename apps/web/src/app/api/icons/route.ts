import * as LucideIcons from "lucide-react";
import { NextRequest, NextResponse } from "next/server";

/**
 * Convert PascalCase to kebab-case
 * Handles both letters and numbers properly (e.g., FileJson2 -> file-json-2)
 */
function toKebabCase(str: string): string {
  return str
    .replace(/([A-Z])/g, "-$1") // Add dash before capital letters
    .replace(/([a-z])([0-9])/g, "$1-$2") // Add dash before numbers
    .toLowerCase()
    .replace(/^-/, ""); // Remove leading dash
}

/**
 * Dynamically generate the complete icon mapping from the actual Lucide React package.
 * This ensures we always have the most up-to-date and complete list of icons.
 */
function generateIconMapping(): Record<string, string> {
  const iconMapping: Record<string, string> = {};

  // Get all exports from lucide-react
  const allExports = Object.keys(LucideIcons);

  // Filter for actual icon components (exclude utilities, types, etc.)
  const iconNames = allExports.filter((name) => {
    // Include React components that:
    // 1. Start with capital letter (component naming convention)
    // 2. Don't end with "Icon" (those are icon data objects, not components)
    // 3. Exclude known utility functions and components
    return (
      name[0] === name[0].toUpperCase() && // Starts with capital letter
      !name.endsWith("Icon") && // Exclude icon data objects (e.g., AArrowDownIcon)
      name !== "Icon" && // Exclude the base Icon component
      name !== "DynamicIcon" && // Exclude DynamicIcon
      name !== "createLucideIcon" && // Exclude utility functions
      name !== "IconNode" && // Exclude type exports
      !name.startsWith("Lucide") // Exclude Lucide-prefixed utilities
    );
  });

  // Generate kebab-case to PascalCase mapping
  iconNames.forEach((pascalName) => {
    const kebabName = toKebabCase(pascalName);
    iconMapping[kebabName] = pascalName;
  });

  return iconMapping;
}

/**
 * Icon mapping from kebab-case to PascalCase.
 * Generated dynamically from the actual Lucide React package.
 */
const ICON_MAPPING = generateIconMapping();

/**
 * Get all available kebab-case icon names (sorted alphabetically)
 */
const ALL_KEBAB_ICONS = Object.keys(ICON_MAPPING).sort();

interface IconSearchParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface IconResponse {
  icons: Array<{
    kebab: string;
    pascal: string;
  }>;
  totalCount: number;
  hasMore: boolean;
  page: number;
  limit: number;
}

/**
 * GET /api/icons
 *
 * Returns paginated and searchable icon data with both kebab-case and PascalCase names.
 * This ensures we only serve icons that actually exist in Lucide React.
 *
 * @example
 * GET /api/icons?page=0&limit=50&search=arrow
 *
 * Response:
 * {
 *   "icons": [
 *     { "kebab": "arrow-down", "pascal": "ArrowDown" },
 *     { "kebab": "arrow-up", "pascal": "ArrowUp" }
 *   ],
 *   "totalCount": 45,
 *   "hasMore": false,
 *   "page": 0,
 *   "limit": 50
 * }
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters with defaults
    const page = Math.max(0, parseInt(searchParams.get("page") || "0"));
    const limit = Math.min(
      200,
      Math.max(1, parseInt(searchParams.get("limit") || "50"))
    );
    const search = searchParams.get("search")?.trim().toLowerCase() || "";

    let filteredIcons = ALL_KEBAB_ICONS;

    // Apply search filter if provided (search both kebab and pascal names)
    if (search) {
      filteredIcons = ALL_KEBAB_ICONS.filter((kebabName) => {
        const pascalName = ICON_MAPPING[kebabName];
        return (
          kebabName.includes(search) ||
          pascalName.toLowerCase().includes(search)
        );
      });
    }

    // Calculate pagination
    const totalCount = filteredIcons.length;
    const startIndex = page * limit;
    const endIndex = startIndex + limit;
    const paginatedKebabIcons = filteredIcons.slice(startIndex, endIndex);
    const hasMore = endIndex < totalCount;

    // Map to include both kebab and pascal names
    const icons = paginatedKebabIcons.map((kebab) => ({
      kebab,
      pascal: ICON_MAPPING[kebab],
    }));

    const response: IconResponse = {
      icons,
      totalCount,
      hasMore,
      page,
      limit,
    };

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error in /api/icons:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
