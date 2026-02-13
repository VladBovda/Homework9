import { useState } from "react";
import commentActions from "../api/commentActions";

const useComment = (exhibitId: string | number) => {
    const [text, setText] = useState("");

    const handleSubmit = () => {
        if (!text.trim()) return;

        commentActions
            .createComment(exhibitId.toString(), { text })
            .then(() => setText(""));
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") handleSubmit();
    };

    return { text, setText, handleSubmit, handleKeyDown };
};

export default useComment;
