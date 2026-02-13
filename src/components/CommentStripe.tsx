import { Box, Typography, Avatar, IconButton, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ExhibitInterface } from "../interfaces/exhibitInterface";
import useCommentStripe from "../hooks/useCommentStripe";

interface CommentStripeProps {
  exhibit: ExhibitInterface;
}

const CommentStripe = ({ exhibit }: CommentStripeProps) => {
  const { comments, loading, currentUserId, handleDelete } = useCommentStripe(exhibit.id);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={2}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (comments.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" py={1}>
        No comments yet.
      </Typography>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={1.5}>
      {comments.map((comment) => (
        <Box key={comment.id} display="flex" alignItems="flex-start" gap={1}>
          <Avatar sx={{ width: 28, height: 28, fontSize: 14, bgcolor: "secondary.main" }}>
            {comment.user.username[0].toUpperCase()}
          </Avatar>

          <Box flex={1} minWidth={0}>
            <Typography variant="body2">
              <Box component="span" fontWeight={600} mr={0.5}>
                {comment.user.username}
              </Box>
              {comment.text}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(comment.createdAt).toLocaleDateString()}
            </Typography>
          </Box>

          {currentUserId === comment.user.id && (
            <IconButton size="small" onClick={() => handleDelete(comment.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default CommentStripe;

