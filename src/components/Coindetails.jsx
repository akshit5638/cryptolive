
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../index";
// import Chart from "./Chart";
import { Box, Button, HStack, Heading, RadioGroup, Progress, Radio, VStack, Text, Image, Stat, Badge, StatLabel, StatNumber, StatHelpText, StatArrow } from '@chakra-ui/react';
import ErrorComponent from "./ErrorComponent";
import Loader from "./Loader";

const Coindetails = () => {
    const params = useParams();
    const [coin, setCoin] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [currency, setCurrency] = useState('inr');
    const currencySymbol =
        currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
    useEffect(() => {
        const fetchCoin = async () => {
            try {
                const { data } = await axios.get(`${server}/coins/${params.id}`);
                console.log(data);
                // const { data: chartData } = await axios.get(
                //   `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
                // );
                setCoin(data);
                // console.log(data);
                // setChartArray(chartData.prices);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);

            }
        };
        fetchCoin();

    }, [params.id]);

    // if (error) return <ErrorComponent message={"Error While Fetching Coin"} />;
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
                    <VStack spacing={'4'} p={'16'} justifyContent={'flex-start'} alignItems={'flex-start'}>
                        <Text alignSelf={'center'}>Last Updated On{" "}
                            {Date(coin.market_data.last_updated).split("G")[0]}</Text>
                        <Image
                            src={coin.image.large}
                            w={"16"}
                            h={"16"}
                            objectFit={"contain"}
                        />
                        <Stat>
                            <StatLabel>{coin.name}</StatLabel>
                            <StatNumber>
                                {currencySymbol}
                                {coin.market_data.current_price[currency]}
                            </StatNumber>
                            <StatHelpText>
                                <StatArrow
                                    type={
                                        coin.market_data.price_change_percentage_24h > 0
                                            ? "increase"
                                            : "decrease"
                                    }
                                />
                                {coin.market_data.price_change_percentage_24h}%
                            </StatHelpText>
                        </Stat>
                        <Badge
                            fontSize={"2xl"}
                            bgColor={"blackAlpha.800"}
                            color={"white"}
                        >{`#${coin.market_cap_rank}`}</Badge>
                        <CustomBar
                            high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
                            low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
                            curr={((coin.market_data.current_price[currency] - coin.market_data.low_24h[currency]) / (coin.market_data.high_24h[currency] - coin.market_data.low_24h[currency])) * 100}
                        />


                    </VStack>




                </>
            }

        </Box>
    )
}
const CustomBar = ({ high, low, curr }) => (
    <VStack w={"full"}>
        <Progress value={curr} colorScheme={"teal"} w={"full"} />
        <HStack justifyContent={"space-between"} w={"full"}>
            <Badge children={low} colorScheme={"red"} />
            <Text fontSize={"sm"}>24H Range</Text>
            <Badge children={high} colorScheme={"green"} />
        </HStack>
    </VStack>
);

export default Coindetails