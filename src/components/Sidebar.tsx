import { useStore } from "../store";
import ChannelList from "./ChannelList";
import Search from "./Search";
import styles from "./styles/Sidebar.module.css";
import UserInfo from "./UserInfo";
import DirectsList from "./DirectsList";
import { Button, IconButton } from "./UI/button";
import { Plus } from "./UI/icons/Plus";
import { Popover } from "solid-popover";
import AddGroupForm from "./AddGroupForm";
import { createSignal } from "solid-js";

function Sidebar(props: { popoverContainerRef?: HTMLDivElement }) {
  const [store, { logout }] = useStore();
  const [isOpen, setIsOpen] = createSignal(false);
  const togglePopover = () => setIsOpen(!isOpen());

  return (
    <>
      <div
        style={{
          width: "90%",
          margin: "1rem auto",
          display: "flex",
          "justify-content": "center",
        }}
      >
        <UserInfo
          displayName={store.profile?.displayName || ""}
          image={store.profile?.image || ""}
        >
          <div class={styles.NavUser}>
            <Button class={styles.textButton} onClick={() => logout()}>
              logout
            </Button>
            <Popover
              parentElement={props.popoverContainerRef}
              isOpen={isOpen()}
              content={<AddGroupForm closeForm={togglePopover} />}
              onClickOutside={() => setIsOpen(false)}
              positions={["bottom", "right", "top", "left"]}
              spacing={10}
            >
              <IconButton
                onClick={togglePopover}
                class={styles.addChannelButton}
              >
                <Plus fill="#000" width={11} height={11} />
              </IconButton>
            </Popover>
          </div>
        </UserInfo>
      </div>
      <nav class={styles.ChannelNav}>
        <ChannelList />
        <br />
        <div class={styles.List}>
          <h2> users </h2>
          <Search />
          <DirectsList />
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
