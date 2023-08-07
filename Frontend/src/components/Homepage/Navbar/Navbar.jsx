import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {useNavigate } from 'react-router-dom';
import { logout } from '../../../utils'
import useAuth from "../../../hooks/useAuth"
import { useSelector } from 'react-redux';

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const {isLoggedIn:auth} = useSelector(state=>state.auth);
  
  useAuth();
  const nav = useNavigate()
  const Logout =()=>{
    logout().then(()=>{
      nav("/login");
    })
  }

  return (
    <>
      <Box zIndex={1000} position={"fixed"} top={0} w={"100%"}  boxShadow={"rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;"}  bg={"yellowgreen"} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box fontWeight={"bold"} cursor={"pointer"} onClick={()=>{
            nav("/")
          }} color="white">Notes App</Box>

          <Flex alignItems={'center'}>
            <Stack alignItems={"center"} direction={'row'} spacing={7}>
                <Button display={auth===true?"block":"none"}  bg={"yellow"}m color={"green"} onClick={()=>{
                    nav("/notes")
                }}>All Notes</Button>
                <Button display={auth===true?"none":"block"}  bg={"yellow"}m color={"green"} onClick={()=>{
                    nav("/register")
                }}>Sign up</Button>
                <Button display={auth===true?"none":"block"} bg={"yellow"}m color={"green"} onClick={()=>{
                    nav("/login")
                }}>Login</Button>
              <Button bg={"yellow"} onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  border="2px solid yellow"
                  padding={2}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem onClick={()=>{
                    Logout()
                  }}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}