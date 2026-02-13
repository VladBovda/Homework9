import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  Divider,
  Box
} from "@mui/material";
import { ExhibitInterface } from "../interfaces/exhibitInterface";
import Comment from "./Comment";
import CommentStripe from "./CommentStripe";
import {useState} from "react";

const Post = ({ exhibit }: { exhibit: ExhibitInterface }) => {
  const [imageError, setImageError] = useState(false);
  const [showComments, setShowComments] = useState(false);
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 500,
        borderRadius: 4,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        overflow: "hidden",
        bgcolor: "background.paper"
      }}
    >
      {/* Header */}
      <CardHeader
        sx={{ px: 2, py: 1.5 }}
        avatar={
          <Avatar sx={{ bgcolor: "primary.main", fontWeight: 600 }}>
            {exhibit.user.username[0].toUpperCase()}
          </Avatar>
        }
        title={
          <Typography fontWeight={600}>
            {exhibit.user.username}
          </Typography>
        }
      />

      {/* Image */}
      <Box
  sx={{
    width: "100%",
    height: 400,
    bgcolor: "grey.100",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  }}
>
<Box
  component="img"
  src={imageError ? "/public/logo192.png" : exhibit.imageUrl}
  onError={() => setImageError(true)}
/>
</Box>

      {/* Content */}
      <CardContent sx={{ px: 2, py: 1.5 }}>
        <Typography variant="body2">
          <Box component="span" fontWeight={600} mr={0.5}>
            {exhibit.user.username}
          </Box>
          {exhibit.description}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          mt={1}
          onClick={() => setShowComments((prev) => !prev)}
          sx={{
            cursor: "pointer",
            fontSize: 14,
            "&:hover": { textDecoration: "underline" }
          }}
        >
          {showComments ? "Hide comments" : `View all ${exhibit.commentCount} comments`}
        </Typography>

        {showComments && (
          <Box mt={1}>
            <CommentStripe exhibit={exhibit} />
          </Box>
        )}
      </CardContent>

      <Divider />

      {/* Comment input */}
      <Box sx={{ px: 2, py: 1.5 }}>
        <Comment exhibit={exhibit} />
      </Box>
    </Card>
  );
};

export default Post;