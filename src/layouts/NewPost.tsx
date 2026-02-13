import { Box, Paper, Typography, TextField, Button, IconButton } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import useNewPost from "../hooks/useNewPost";

const NewPost = () => {
  const { formik, preview, handleImageChange, removeImage } = useNewPost();

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Paper sx={{ width: "100%", maxWidth: 500, p: 3 }}>
        <Typography variant="h6" mb={2}>
          Create new post
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit}>
          {/* Text input */}
          <TextField
            placeholder="What's on your mind?"
            multiline
            minRows={4}
            fullWidth
            name="text"
            value={formik.values.text}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.text && Boolean(formik.errors.text)}
            helperText={formik.touched.text && formik.errors.text}
          />

        {/* Image preview */}
        {preview && (
          <Box mt={2} position="relative">
            <IconButton
              size="small"
              onClick={removeImage}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                bgcolor: "background.paper",
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>

            <Box
              component="img"
              src={preview}
              alt="preview"
              sx={{
                width: "100%",
                borderRadius: 2,
                maxHeight: 300,
                objectFit: "cover",
              }}
            />
          </Box>
        )}

        {/* Actions */}
        <Box
          mt={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button
            component="label"
            startIcon={<ImageIcon />}
            variant="outlined"
            color={formik.touched.image && formik.errors.image ? "error" : "primary"}
          >
            Add image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
          {formik.touched.image && formik.errors.image && (
            <Typography variant="caption" color="error">
              {formik.errors.image}
            </Typography>
          )}

          <Button
           type="submit"
           variant="contained"
           >
            Post
          </Button>
        </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default NewPost;
