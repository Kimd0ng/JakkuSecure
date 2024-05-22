import React, {useEffect, useState} from "react";
import ModuleStyle from "../ModuleStyle.module.css";
import styled from "styled-components";
import Sort from "../components/Sort";
import BucketItem from "../components/bucket/BucketItem";
import Buysection from "../components/bucket/Buysection";
import {useRecoilState} from "recoil";
import { buyMoneyState, usermoneyState} from "../atoms/atom";
import api from "../axios";

const Maintool = styled.div`
  display: flex;
`

const Itemtool = styled.div`
  width: auto;
`

const Buytool = styled.div`
  width: auto;
`

function Bucket() {
    const [buymoneys, setBuyMoney] = useRecoilState(buyMoneyState);
    const [remainMoney, setRemainMoney] = useRecoilState(usermoneyState);
    const [basketItems, setBasketItems] = useState([]);

    const fetchBasketItems = async () => {
        try {
            const response = await api.get(`/customers/basket`);
            const defaultnum = 0;
            console.log(response.data);
            setBasketItems(response.data.responseDto.selectbasket);
            const newMap = new Map(buymoneys);
            newMap.set(response.data.responseDto.selectbasket.itemId, defaultnum);
            setBuyMoney(newMap);
        } catch (error) {
            console.error("Error fetching basket items:", error);
        }
    };

    const remainingMoney = async () => {
        try{
            const response = await api.get(`/customers/basket/point`);
            console.log("남은 돈 확인");
            setRemainMoney(response.data.responseDto);
        } catch (error) {
            console.error("Error fetching remaining money:", error);
        }
    }

    useEffect(() => {
        fetchBasketItems();
        remainingMoney();
    }, []);

    return(
        <div className={ModuleStyle.CategoriPage}>
            <Sort/>
            <Maintool>
                <Itemtool>
                    <BucketItem basketItems={basketItems}/>
                </Itemtool>
                <Buytool>
                    <Buysection remainMoney={remainMoney}/>
                </Buytool>
            </Maintool>
        </div>
    )
}

export default Bucket;