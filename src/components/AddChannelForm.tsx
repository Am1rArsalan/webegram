import { createSignal, ParentProps } from "solid-js";
import { useStore } from "../store";
import styles from "./styles/Sidebar.module.css";
import { Button } from "./UI/button";
import { Input } from "./UI/input/Input";

function AddChannelForm(props: { closeForm: () => void }) {
  const [groupName, setGroupName] = createSignal("");
  const [groupSlug, setGroupSlug] = createSignal("");
  const [_, { createRoom }] = useStore();

  return (
    <form
      class={styles.AddGroupForm}
      onSubmit={(ev) => {
        ev.preventDefault();
        const slug = groupSlug();
        const name = groupName();
        if (name.length < 3) return;
        createRoom(name, slug.trim().replaceAll(/[ ]{1,}/g, "-"));
        props.closeForm();
      }}
    >
      <FormGroup label="group-name">
        <Input
          value={groupName()}
          onChange={(ev) => setGroupName(ev.currentTarget.value)}
        />
      </FormGroup>
      <FormGroup label="group-slug">
        <Input
          value={groupSlug()}
          onChange={(ev) => setGroupSlug(ev.currentTarget.value)}
        />
      </FormGroup>
      <Button style={{ width: "100%", height: "2rem" }} type="submit">
        add Group
      </Button>
    </form>
  );
}

function FormGroup(props: ParentProps<{ label: string }>) {
  return (
    <div
      style={{
        display: "flex",
        "justify-content": "space-between",
      }}
    >
      <label> {props.label} </label>
      {props.children}
    </div>
  );
}

export default AddChannelForm;
