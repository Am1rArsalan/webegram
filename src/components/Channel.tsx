import { useParams } from "solid-app-router";
import { Show } from "solid-js";
import { useStore } from "../store";
import { MessageType } from "../types/message";
import ChatInputForm from "./ChatInputForm";
import Members from "./Members";
import MessagesList from "./MessagesList";
import styles from "./styles/Chat.module.css";

function Channel() {
    const params = useParams();
    const [store, { sendChannelMessage }] = useStore();

    function fetchMessages() {
        const channel = store.rooms.find((item) => item.slug == params.slug);

        if (channel) {
            return channel.chats;
        }

        return new Map<string, MessageType[]>();
    }

    return (
        <div class={styles.ChatContainer}>
            <div class={styles.ChatMain}>
                <div class={styles.ChatInfo}>
                    <div class={styles.ChannelName}>#{params.slug}</div>
                </div>
                <div class={styles.Messages}>
                    <div class={styles.EndOfMessages}>{"That's every message!"}</div>
                    <Show when={store.rooms.find((item) => item.slug == params.slug)}>
                        <MessagesList messages={fetchMessages()} />
                    </Show>
                </div>
                <ChatInputForm
                    sendMessage={(content) => {
                        params.slug && sendChannelMessage(content, params.slug);
                    }}
                />
            </div>
            <Members slug={params.slug} />
        </div>
    );
}

export default Channel;
