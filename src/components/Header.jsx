import { Box, HStack, Heading } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (

        <HStack
            bgColor={"black"}

            w={'full'}
            p={'4'}
            justify={'space-between'}
            color={'white'}>

            <Heading textTransform={'uppercase'} display={{ base: 'none', sm: 'inline' }}>Cryptovista</Heading>
            <HStack p={'4'} gap={{ base: '30', md: '50' }} fontSize={'large'} justifyContent={{ base: 'flex-start', sm: 'flex-end' }}>
                <Link to={"/"}>Home</Link>
                <Link to={"/exchanges"}>Exchanges</Link>
                <Link to={"/coins"}>Coins</Link>
            </HStack>


        </HStack>
    )
}

export default Header