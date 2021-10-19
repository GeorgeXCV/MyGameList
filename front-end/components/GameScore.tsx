import { Text, Icon } from "@chakra-ui/react"
import kFormatter from "../services/ratings";

const GameScore = ({ score, totalRatings, disableOutOf10 }) => {
    return (
      <>
        <Text
        mt={2}
        color="white.500"
        fontSize="md"
        display="flex"
        placeItems="center"
        >
        <Icon mr={1}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M12 18.26l-7.053 3.948 1.575-7.928L.587 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928z"
              fill="rgb(245, 197, 24)"
            />
          </svg>
        </Icon>
        {score} <Text fontSize="sm" color="grey">{disableOutOf10 === false ? "/10" : null}</Text>
        </Text>
        {(totalRatings) && (
          <Text fontSize="sm" color="grey">{kFormatter(totalRatings)}</Text>
        )}
      </>
    )
}

export default GameScore;