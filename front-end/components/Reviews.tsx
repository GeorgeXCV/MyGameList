import { Box } from "@chakra-ui/react"
import Review from "./Review";

const Reviews = ({ reviews }) => {
    return (
      <>
        <Box>
          {reviews.map(review => {
              return <Review key={review.id} review={review} />
          })}
        </Box>
      </>
    );
}

export default Reviews;