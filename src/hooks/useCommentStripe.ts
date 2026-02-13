import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import commentActions from "../api/commentActions";
import { CommentData } from "../interfaces/commentInterface";

const useCommentStripe = (exhibitId: string | number) => {
    const [comments, setComments] = useState<CommentData[]>([]);
    const [loading, setLoading] = useState(true);
    const currentUserId = useSelector((state: RootState) => state.user.userId);

    const fetchComments = useCallback(() => {
        setLoading(true);
        commentActions
            .getComments(exhibitId.toString())
            .then((res: any) => {
                const data = Array.isArray(res) ? res : res?.data ?? [];
                setComments(data);
            })
            .finally(() => setLoading(false));
    }, [exhibitId]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const handleDelete = (commentId: number) => {
        commentActions
            .deleteComment(exhibitId.toString(), commentId.toString())
            .then(() => setComments((prev) => prev.filter((c) => c.id !== commentId)));
    };

    return { comments, loading, currentUserId, handleDelete };
};

export default useCommentStripe;
