import { Box, Pagination, Typography } from "@mui/material";
import { getUserExhibits } from "../api/exhibitActions";
import usePaginatedExhibits from "../components/PaginationLogic";
import Post from "../components/Post";

const MyExhibits = () => {
  const { page, lastPage, handlePageChange, exhibits } = usePaginatedExhibits(getUserExhibits);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        mt: 3,
      }}
    >
      <Typography variant="h5" fontWeight={600}>
        My Exhibits
      </Typography>

      <Pagination count={lastPage} page={page} onChange={handlePageChange} />

      {exhibits.length === 0 ? (
        <Typography color="text.secondary">You have no exhibits yet.</Typography>
      ) : (
        exhibits.map((exhibit) => <Post key={exhibit.id} exhibit={exhibit} />)
      )}
    </Box>
  );
};

export default MyExhibits;