import { List } from "@raycast/api";

export default function Command() {
  return (
    <List isShowingDetail>
      <List.Item icon="list-icon.png" title="Greeting" detail={<List.Item.Detail markdown="# Hey! 👋" />} />
    </List>
  );
}
