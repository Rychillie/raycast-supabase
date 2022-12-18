import { Action, ActionPanel, Detail, getPreferenceValues, List, openCommandPreferences } from "@raycast/api";
import { useFetch } from "@raycast/utils";

export default function Command() {
  const preferences = getPreferenceValues();

  if (!!preferences.supabaseKey && !!preferences.supabaseUrl) {
    const { isLoading, error, data } = FetchTables(preferences);

    if (error) {
      return <Detail markdown="## Something went wrong" />;
    }

    if (isLoading) {
      return <Detail markdown="## Loading..." />;
    }

    return (
      <List isShowingDetail isLoading={isLoading}>
        {Object.keys(data?.definitions as any).map((item: any) => (
          <List.Item
            key={item}
            title={item}
            icon="table-icon.png"
            subtitle={data?.definitions[item].description ? data?.definitions[item].description : null}
            detail={
              <List.Item.Detail
                metadata={
                  <List.Item.Detail.Metadata>
                    <List.Item.Detail.Metadata.Label title="Table name:" text={item} />
                    <List.Item.Detail.Metadata.Label
                      title="Table description:"
                      text={data?.definitions[item].description}
                    />
                    <List.Item.Detail.Metadata.Separator />
                    <List.Item.Detail.Metadata.Label title="Table Columns:" />
                    {Object.keys(data?.definitions[item].properties).map((column: any) => (
                      <List.Item.Detail.Metadata.Label key={column} title={column} />
                    ))}
                  </List.Item.Detail.Metadata>
                }
              />
            }
          />
        ))}
      </List>
    );
  }

  const markdownError = "API key or URL incorrect. Please update it in extension preferences and try again.";

  return (
    <Detail
      markdown={markdownError}
      actions={
        <ActionPanel>
          <Action title="Open Extension Preferences" onAction={openCommandPreferences} />
        </ActionPanel>
      }
    />
  );
}

function FetchTables(preferences: any) {
  const { isLoading, error, data } = useFetch(`${preferences.supabaseUrl}/rest/v1/`, {
    headers: {
      apikey: preferences.supabaseKey,
      Authorization: `Bearer ${preferences.supabaseKey}`,
    },
  });

  return { isLoading, error, data };
}
