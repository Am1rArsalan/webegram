import { Button, IconButton } from "./UI/button";
import { Plus } from "./UI/icons/Plus";
import { Popover } from "solid-popover";
import AddChannelForm from "./AddChannelForm";
import { createSignal, Show } from "solid-js";
import { useStore } from "../store";
import UserInfo from "./UserInfo";
import styles from "./styles/Profile.module.css";

function Profile(props: { popoverContainerRef: HTMLDivElement | undefined }) {
  const [store, { logout }] = useStore();
  const [isOpen, setIsOpen] = createSignal(false);
  const togglePopover = () => setIsOpen(!isOpen());

  return (
    <Show when={store.profile} keyed>
      {(profile) => {
        return (
          <div class={styles.ProfileContainer}>
            <UserInfo displayName={profile.displayName} image={profile.image}>
              <div class={styles.NavUser}>
                <Button class={styles.textButton} onClick={() => logout()}>
                  logout
                </Button>
                <Popover
                  parentElement={props.popoverContainerRef}
                  isOpen={isOpen()}
                  content={<AddChannelForm closeForm={togglePopover} />}
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
        );
      }}
    </Show>
  );
}
export default Profile;
