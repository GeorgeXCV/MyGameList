import { GetServerSideProps } from 'next'
import { useContext, useState, useEffect } from 'react';
import { UserContext } from "../_app";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Divider, Heading, Image, Link, Text, Menu, MenuButton, IconButton, MenuList, MenuItem, useDisclosure  } from "@chakra-ui/react";
import GameScore from '../../components/GameScore';
import WantToPlayButton from '../../components/WantToPlayButton';
import getReleaseDate from '../../services/date';
import * as dayjs from 'dayjs'
import PlayingModal from '../../components/PlayingModal';
import PlayedModal from '../../components/PlayedModal';
import DroppedModal from '../../components/DroppedModal';
import { getGame, addToBacklog } from '../../services/profile';
import RemoveGameButton from '../../components/RemoveGameButton';
import FavouriteButton from '../../components/FavouriteButton';
import YourGameScore from '../../components/YourGameScore';
import RatingModal from '../../components/RatingModal';

export default function Game ({ game }) {

    const user = useContext(UserContext);
    const [gameStatus, setGameStatus] = useState(null)
    const [gameEntry, setGameEntry] = useState(null)
    const [rating, setRating] = useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isPlayedOpen, onOpen: onPlayedOpen, onClose: onPlayedClose } = useDisclosure();
    const { isOpen: isDroppedOpen, onOpen: onDroppedOpen, onClose: onDroppedClose } = useDisclosure();
    const { isOpen: isRatingOpen, onOpen: onRatingOpen, onClose: onRatingClose } = useDisclosure();

    useEffect(() => {  
        async function checkGameStatus() {
            if (!user) return;
            const currentGame = await getGame(game.id, user.id)
            if (currentGame.status) {
                setGameStatus(currentGame.status)
                setGameEntry(currentGame)
                setRating(currentGame.rating)
            }
        }        
        checkGameStatus();
  }, [])

    const addGame = async () => {
        await addToBacklog(game?.id, user?.id)
        setGameStatus("Backlog")
    }

    return (
        <>
        <Box d={"flex"} alignItems={"center"} paddingLeft={255}>
            <PlayingModal isOpen={isOpen} onClose={onClose} game={game} user={user} setGameStatus={setGameStatus}/>
            <PlayedModal isOpen={isPlayedOpen} onClose={onPlayedClose} game={game} gameEntry={gameEntry} user={user} setGameStatus={setGameStatus}/>
            <DroppedModal isOpen={isDroppedOpen} onClose={onDroppedClose} game={game} gameEntry={gameEntry} user={user} setGameStatus={setGameStatus}/>
            <RatingModal isOpen={isRatingOpen} onClose={onRatingClose} rating={rating} setRating={setRating} game={game} user={user} />
            <Box>
                <Image
                src={game.cover}
                fallbackSrc={`https://via.placeholder.com/175x200?text=${game.name}`}
                alt="Game Cover"
                minWidth={185}
                minHeight={275}
                />
                <FavouriteButton  game={game} user={user} gameEntry={gameEntry}/>
                <Box>
                {!gameStatus && (
                    <>
                    <WantToPlayButton game={game} user={user} setGameStatus={setGameStatus} />  
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<ChevronDownIcon />}
                            variant="outline"
                            background="green"
                        />
                        <MenuList>
                            <MenuItem onClick={onOpen}>
                                Currently Playing
                            </MenuItem>
                            <MenuItem onClick={onPlayedOpen}>
                                Played
                            </MenuItem>
                            <MenuItem onClick={onDroppedOpen}>
                                Dropped                            
                            </MenuItem>
                        </MenuList>
                    </Menu>
                    </>
                    )
                }
                {gameStatus === "Backlog" && (
                    <>
                    <RemoveGameButton game={game} user={user} status={"Backlog"} setGameStatus={setGameStatus} />
                    <Menu>
                          <MenuButton
                              as={IconButton}
                              aria-label="Options"
                              icon={<ChevronDownIcon />}
                              variant="outline"
                              background="green"
                          />
                          <MenuList>
                            <MenuItem onClick={onOpen}>
                                    Currently Playing
                                </MenuItem>
                                <MenuItem onClick={onPlayedOpen}>
                                    Played
                                </MenuItem>
                                <MenuItem onClick={onDroppedOpen}>
                                    Dropped                            
                                </MenuItem>
                          </MenuList>
                      </Menu>
                      </>
                )}
                {gameStatus === "Playing" && (
                      <>
                      <RemoveGameButton game={game} user={user} status={"Playing"} setGameStatus={setGameStatus} /> 
                      <Menu>
                          <MenuButton
                              as={IconButton}
                              aria-label="Options"
                              icon={<ChevronDownIcon />}
                              variant="outline"
                              background="green"
                          />
                          <MenuList>
                              <MenuItem onClick={onPlayedOpen}>
                                  Played
                              </MenuItem>
                              <MenuItem onClick={onDroppedOpen}>
                                  Dropped
                              </MenuItem>
                              <MenuItem onClick={addGame}>
                                  Want To Play                            
                              </MenuItem>
                          </MenuList>
                      </Menu>
                      </>
                )}
                {gameStatus === "Played" && (
                      <>
                      <RemoveGameButton game={game} user={user} status={"Played"} setGameStatus={setGameStatus} />  
                      <Menu>
                          <MenuButton
                              as={IconButton}
                              aria-label="Options"
                              icon={<ChevronDownIcon />}
                              variant="outline"
                              background="green"
                          />
                          <MenuList>
                              <MenuItem onClick={onOpen}>
                                  Playing
                              </MenuItem>
                              <MenuItem onClick={onDroppedOpen}>
                                  Dropped
                              </MenuItem>
                              <MenuItem onClick={addGame}>
                                  Want To Play                            
                              </MenuItem>
                          </MenuList>
                      </Menu>
                      </>
                )}
                 {gameStatus === "Dropped" && (
                      <>
                      <RemoveGameButton game={game} user={user} status={"Dropped"} setGameStatus={setGameStatus} />  
                      <Menu>
                          <MenuButton
                              as={IconButton}
                              aria-label="Options"
                              icon={<ChevronDownIcon />}
                              variant="outline"
                              background="green"
                          />
                          <MenuList>
                              <MenuItem onClick={onOpen}>
                                  Playing
                              </MenuItem>
                              <MenuItem onClick={onPlayedOpen}>
                                  Played
                              </MenuItem>
                              <MenuItem onClick={addGame}>
                                  Want To Play                            
                              </MenuItem>
                          </MenuList>
                      </Menu>
                      </>
                )}
             
            </Box>
                <GameScore score={game.score} totalRatings={game['scored by']} disableOutOf10={false}/>  
                <YourGameScore rating={rating} onOpen={onRatingOpen}/> 
             </Box>
             <Box alignSelf={"start"} width={"75%"}>
             <Heading>{game.name}</Heading>
                <Text>{getReleaseDate(dayjs.unix(game.first_release_date).format('DD MMM, YYYY'))}</Text>
                <Text>{game.platforms.join(", ")}</Text>
                <Text>{game.description}</Text>
                <Divider/>   
                <Heading as="h5" size="sm" padding={3}> Developer <Link color="red" paddingLeft={1}>{game.developer}</Link> </Heading>  
                <Divider/>
                <Heading as="h5" size="sm" padding={3}> Publisher <Link color="red" paddingLeft={1}>{game.publisher}</Link> </Heading>  
                <Divider/>
                <Heading as="h5" size="sm" padding={3}> Genres <Link color="red" paddingLeft={1}>{game.genre}</Link> </Heading>  
                <Divider/>
                <Heading as="h5" size="sm" padding={3}> Game Modes <Link color="red" paddingLeft={1}>{game['game modes']}</Link> </Heading>  
                {game.series !== null &&
                   <>
                   <Divider/>
                   <Heading as="h5" size="sm" padding={3}> Series <Link color="red" paddingLeft={1}>{game.series}</Link> </Heading>  
                   </>
                }
             </Box>
        </Box>
       
       <Box alignItems={"center"} paddingLeft={255}>
           <Heading>Reviews</Heading>
           {game['user reviews'] !== null
               ? <Text>{game['user reviews']}</Text>
               : <Text>No reviews have been submitted for this title. Be the first to make a review here!</Text>
           }
       </Box>
       </>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const game = await (await fetch(`${process.env.NEXT_PUBLIC_HOST}game/${params.id}`)).json();
    // const status = user ? await (await fetch(`${process.env.NEXT_PUBLIC_HOST}backlog/${user.username}`)) : false
    return { props: { game } }
  }
  