import { Detail, getPreferenceValues, List } from "@raycast/api";
import { useFetch } from "@raycast/utils";

export default function Command() {
  const preferences = getPreferenceValues();

  if (!!preferences.supabaseKey && !!preferences.supabaseUrl) {
    const { isLoading, error, data } = useFetch(`${preferences.supabaseUrl}/rest/v1/`, {
      headers: {
        apikey: preferences.supabaseKey,
        Authorization: `Bearer ${preferences.supabaseKey}`,
      },
    });

    if (error) {
      return <Detail markdown="## Something went wrong" />;
    }

    if (isLoading) {
      return <Detail markdown="## Loading..." />;
    }

    return (
      <List isShowingDetail isLoading={isLoading}>
        {Object.keys(data?.definitions).map((item: any) => (
          <List.Item
            key={item}
            title={item}
            subtitle={data?.definitions[item].description ? data?.definitions[item].description : false}
            detail={<List.Item.Detail markdown="# Hey! 👋" />}
          />
        ))}
      </List>
    );
  }

  return (
    <List isShowingDetail>
      <List.Item icon="list-icon.png" title="Greeting" detail={<List.Item.Detail markdown="# Hey! 👋" />} />
    </List>
  );
}
