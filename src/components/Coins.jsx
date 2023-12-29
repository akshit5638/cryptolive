import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { server } from '../index'
import Loader from './Loader';
import { Box, Button, HStack, Heading, RadioGroup, Radio } from '@chakra-ui/react';
import CoinCard from './CoinCard';

const Coins = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [currency, setCurrency] = useState('inr');
    const currencySymbol =
        currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
    const changePage = (page) => {
        setPage(page);
        setLoading(true);
        window.scrollTo(0, 0);

    }

    const btn = new Array(69).fill(1);
    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
                setCoins(data);
                setLoading(false);
                console.log(data);
            }
            catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchCoins();
    }, [currency, page])
    return (
        <Box m={'0'} w={'full'}>
            {loading ? <Loader /> :
                <>
                    <RadioGroup value={currency} onChange={setCurrency} p={'12'}>
                        <HStack spacing={"4"}>
                            <Radio value={"inr"}>INR</Radio>
                            <Radio value={"usd"}>USD</Radio>
                            <Radio value={"eur"}>EUR</Radio>
                        </HStack>
                    </RadioGroup>
                    <HStack w={'full'} wrap={'wrap'} justifyContent={'space-evenly'}>
                        {coins.map((i) => (
                            <CoinCard
                                id={i.id}
                                key={i.id}
                                name={i.name}
                                price={i.current_price}
                                img={i.image}
                                symbol={i.symbol}
                                currencySymbol={currencySymbol}
                            />
                        )
                        )}
                    </HStack>
                    <HStack w={"full"} overflowX={"auto"} p={"8"}>

                        {
                            btn.map((item, index) => (
                                <Button key={index} backgroundColor={'black'} color={'white'} onClick={() => changePage(index + 1)} css={{
                                    "&:hover": {
                                        transform: "scale(1.1)",
                                        cursor: 'pointer',
                                        backgroundColor: 'rgb(211,211,211)',
                                        color: 'black'

                                    },
                                }}>{index + 1}</Button>
                            ))
                        }
                    </HStack>



                </>
            }

        </Box>
    )
}


export default Coins