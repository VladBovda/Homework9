import { Box, Pagination } from "@mui/material";
import usePaginatedExhibits from "../components/PaginationLogic";
import { getAllExhibits } from "../api/exhibitActions";
import Post from "../components/Post";

const StripePage = () => {
  const { page, lastPage, handlePageChange, exhibits } = usePaginatedExhibits(getAllExhibits);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        mt: 3
      }}
    >
      <Pagination
        count={lastPage}
        page={page}
        onChange={handlePageChange}
      />

      {exhibits.map((exhibit) => (
        <Post key={exhibit.id} exhibit={exhibit} />
      ))}
    </Box>
  );
};

export default StripePage;
