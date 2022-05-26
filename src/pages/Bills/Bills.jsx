import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CardList from '../../components/CardList/CardList';
import Container from '../../components/UI/Container';
import { getFetch } from '../../helper/getFect';

function Bills() {
    const { registerid } = useParams();
    const [billsArc, setBillsArc] = useState([]);

    useEffect(() => {
        async function getBills() {
            const skillFromDB = await getFetch(`bills/${registerid}`);
            console.log('registerid===', registerid);
            setBillsArc(skillFromDB.data);
            console.log('skillFromDB===', skillFromDB.data);
          }
          getBills()
      }, [registerid]);


    //   async function getBills() {
    //     const skillFromDB = await getFetch(`bills/` + registerId);
    //     setBillsArc(skillFromDB.data);
    //     console.log('skillFromDB===', skillFromDB.data);
    //   }

      return (
        <Container>
          <h1>Bills</h1>
          <CardList cardType='bills' item={billsArc} />
        </Container>
      );
    }

export default Bills