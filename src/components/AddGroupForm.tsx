import { ParentProps } from "solid-js";
import styles from "./styles/Sidebar.module.css";
import { Button } from "./UI/button";
import { Input } from "./UI/input/Input";

function AddGroupForm(props: { closeForm: () => void }) {
  return (
    <form
      class={styles.AddGroupForm}
      onSubmit={(ev) => {
        ev.preventDefault();
        console.log("onSubmit");
        props.closeForm();
      }}
    >
      <FormGroup label="group-name">
        <Input />
      </FormGroup>
      <FormGroup label="group-cover">
        <Input />
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

export default AddGroupForm;
