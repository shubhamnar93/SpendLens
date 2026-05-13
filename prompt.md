# Prompt

When the selected category is `api`, show only the API-specific `toolName` options and their respective `planName` options.

When the selected category is any other value, show the full set of audit knowledge options from `auditKnowledge`.

For `api`, use the `apiKnowledge` dataset. For all other categories, use `auditKnowledge`.

Keep the prompt logic clean and isolated so the UI only displays the appropriate tool/plan combinations for the selected category.