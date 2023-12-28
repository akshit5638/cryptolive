import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Box, Container, HStack, VStack, Image, Heading, Text } from '@chakra-ui/react'
import Loader from './Loader.jsx'
import ErrorComponent from './ErrorComponent.jsx'
const Exchanges = () => {
    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    useEffect(() => {
        const fetchExchanges = async () => {
            try {
                const { data } = await axios.get(`${server}/exchanges`);
                setExchanges(data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchExchanges();
    }, []);

    if (error)
        return <ErrorComponent message={"Error While Fetching Exchanges"} />;



    return (
        <Box m={'0'} w={'full'} >
            {loading ? <Loader /> : <>

                <HStack wrap={"wrap"} w={'full'} gap={'50'} justifyContent={"space-evenly"}>
                    {exchanges.map((i) => (
                        <ExchangeCard
                            key={i.id}
                            name={i.name}
                            img={i.image}
                            rank={i.trust_score_rank}
                            url={i.url}
                        />
                    ))}
                </HStack>
            </>}
        </Box>
    )
}
const ExchangeCard = ({ name, img, rank, url }) => (
    <a href={url} target={"blank"}>
        <VStack
            w={'250px'} m={'2'} p={'8'} shadow={"lg"} transition={'all 0.3s'}
            css={{
                "&:hover": {
                    transform: "scale(1.1)",
                    cursor: 'pointer',
                    backgroundColor: 'rgb(211,211,211)'
                },
            }}
        >

            <Image src={img}
                w={"10"}
                h={"10"}
                objectFit={"contain"}
            ></Image>
            <Heading size={"md"}
                noOfLines={1}>
                {rank}
            </Heading>

            <Text noOfLines={1}>{name}</Text>
        </VStack>
    </a>


)
export default Exchanges