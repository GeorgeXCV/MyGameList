import { Box, Text } from "@chakra-ui/react"

const Review = ({ review }) => {

    return (
        <Box>
         <Text>{review.review}</Text>
         <Text>{review.score}</Text>
         <Text>{review.platform}</Text>
         <Text>{review.likes}</Text>
         <Text>{review.date}</Text>
         <Text>By {review.username}</Text>
        </Box>
    );
}

export default Review;