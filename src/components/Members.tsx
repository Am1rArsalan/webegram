import { classNames } from "./UI/utils/classNames";
import styles from "./styles/Members.module.css";
import Search from "./Search";
import { For, ParentProps } from "solid-js";
import { useStore } from "../store";

function Member(props: ParentProps) {
  return (
    <div class={styles.Member}>
      <div class={classNames(styles.MemberStatus, styles.online)} />
      {props.children}
    </div>
  );
}

function Members(props: { slug: string }) {
  const [store, { addMember }] = useStore();
  let containerRef;

  function getRoomMembers() {
    const roomIndex = store.rooms.findIndex((room) => room.slug === props.slug);
    if (roomIndex == -1) {
      return [];
    }

    const room = store.rooms[roomIndex];

    return room.members;
  }
  return (
    <div class={styles.Members} ref={containerRef}>
      <div>
        <h5>add member form</h5>
        <Search
          action={(data) =>
            addMember({
              memberId: data._id,
              roomSlug: props.slug,
              memberName: data.displayName,
            })
          }
          containerRef={containerRef}
        />
      </div>
      <div>
        <For each={getRoomMembers()}>
          {(member) => {
            return <Member>{member.displayName}</Member>;
          }}
        </For>
      </div>
    </div>
  );
}

export default Members;
