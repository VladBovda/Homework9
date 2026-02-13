import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ExhibitInterface } from "../interfaces/exhibitInterface";
import useComment from "./useComment";

interface CommentProps {
  exhibit: ExhibitInterface;
}

const Comment = ({ exhibit }: CommentProps) => {
  const { text, setText, handleSubmit, handleKeyDown } = useComment(exhibit.id);

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <TextField
        fullWidth
        size="small"
        placeholder="Add a comment…"
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={handleKeyDown}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "999px",
            fontSize: 14,
            bgcolor: "grey.50"
          }
        }}
      />

      <IconButton
        color="primary"
        onClick={handleSubmit}
        disabled={!text.trim()}
        sx={{
          bgcolor: "primary.main",
          color: "white",
          "&:hover": {
            bgcolor: "primary.dark"
          }
        }}
      >
        <SendIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default Comment;