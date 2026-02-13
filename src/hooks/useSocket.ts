import { useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { RootState } from "../store/store";
import { useSnackbar } from "../contexts/SnackbarContext";

const SOCKET_URL = "https://playground.zenberry.one";

const useSocket = () => {
    const token = useSelector((state: RootState) => state.user.token);
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        if (!token) return;

        const socket = io(SOCKET_URL, {
            auth: { token },
            transports: ["websocket", "polling"],
        });

        socket.on("newExhibit", (data: { user: string; message?: string }) => {
            showSnackbar(
                data.message || `${data.user} just added a new post!`,
                "info"
            );
        });

        return () => {
            socket.disconnect();
        };
    }, [token, showSnackbar]);
};

export default useSocket;
