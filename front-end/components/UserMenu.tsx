import { Button, Menu, MenuButton, MenuList, MenuGroup, MenuItem } from "@chakra-ui/react"
import { ChevronDownIcon } from '@chakra-ui/icons'

const UserMenu = ({ user }) => {
    return (
        <Menu>
        <MenuButton as={Button} minWidth={75}>
          {user} <ChevronDownIcon />
        </MenuButton>
        <MenuList>
          <MenuGroup>
            <MenuItem>My List</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Sign out</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    )
}

export default UserMenu;