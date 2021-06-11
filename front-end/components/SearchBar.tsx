import { Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { SearchIcon } from '@chakra-ui/icons'

const SearchBar = () => {
    return (
            <InputGroup>
                <Input 
                type="search" 
                placeholder="Search MyGameList" 
                borderColor={'grey'} 
                />
                <InputRightElement children={ <SearchIcon /> } />
            </InputGroup>
    )
}

export default SearchBar;