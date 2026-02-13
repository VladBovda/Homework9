import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import commentActions from "../api/commentActions";

const useComment = (exhibitId: string | number) => {
    const [text, setText] = useState("");
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

    const handleSubmit = () => {
        if (!isAuthenticated || !text.trim()) return;

        commentActions
            .createComment(exhibitId.toString(), { text })
            .then(() => setText(""));
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") handleSubmit();
    };

    return { text, setText, handleSubmit, handleKeyDown, isAuthenticated };
};

export default useComment;
