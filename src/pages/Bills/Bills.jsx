import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import CardList from '../../components/CardList/CardList';
import Button from '../../components/UI/Button/Button';
import Container from '../../components/UI/Container';
import { archiveFecth } from '../../helper/archiveFetch';
import { getFetch } from '../../helper/getFect';
import css from '../Bills/Bills.module.scss'

function Bills() {
    const { registerid } = useParams();
    const [billsArc, setBillsArc] = useState([]);
    const [storedBills, setStoredBills] = useState();
    const [storeArchives, setStoreArchives] = useState([])

    useEffect(() => {
      getBills();
    }, []);
      async function getBills() {
        const skillFromDB = await getFetch(`bills/` + registerid);
        setBillsArc(skillFromDB.data);
        console.log('killFromDB.data===', skillFromDB.data);
        if(skillFromDB.data.length >= 1) {
          const storedData = skillFromDB.data[0].register
          setStoredBills(storedData)
          console.log('storedData===', storedData);
        }
        
      }

      async function ArchiveRegisters() {
      const ArchiveRegisters = await archiveFecth(`accounts/setarchive/` + registerid)
      console.log('ArchiveRegisters===', ArchiveRegisters);
      setStoreArchives(ArchiveRegisters)
      }
      console.log('storedBills===', storedBills);

      return (
        <Container>
          <div className={css.flex}>
          <h1>{storedBills === undefined ? null : storedBills}</h1>
          <Link to={`/AddBills/${registerid}`}>
            <Button Add>Add Bills</Button>
          </Link>
          </div>
          <CardList onDelete={getBills} cardType='bills' item={billsArc} />
          <div className={css.flex}>
          <Button onClick={ArchiveRegisters}> Complete</Button>
          </div>
        </Container>
      );
    }

export default Bills