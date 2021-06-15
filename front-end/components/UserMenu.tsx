import { Button, Menu, MenuButton, MenuList, MenuGroup, MenuItem } from "@chakra-ui/react"
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useContext } from 'react';
import { AuthContext } from '../pages/_app';

const UserMenu = ({ user }) => {
    const { setAuthSubmitted } = useContext(AuthContext);

    const handleSignOut = () => {
      window.localStorage.removeItem('gameUser')
      setAuthSubmitted(true);
    }
  
    return (
        <Menu>
        <MenuButton as={Button} minWidth={75}>
          {user} <ChevronDownIcon />
        </MenuButton>
        <MenuList>
          <MenuGroup>
            <MenuItem>My List</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    )
}

export default UserMenu;