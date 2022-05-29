import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import CardList from '../../components/CardList/CardList';
import Button from '../../components/UI/Button/Button';
import Container from '../../components/UI/Container';
import { archiveFecth } from '../../helper/archiveFetch';
import { getFetch } from '../../helper/getFect';
import css from '../Bills/Bills.module.scss'

function Bills() {
    const history = useHistory();
    const { registerid } = useParams();
    const [billsArc, setBillsArc] = useState([]);
    const [storedBills, setStoredBills] = useState();
    const [storeArchives, setStoreArchives] = useState([])
    const [displayExpenses, setDisplayExpenses] = useState("")

    useEffect(() => {
      getBills();
    }, []);
      async function getBills() {
        const skillFromDB = await getFetch(`bills/` + registerid);
        setBillsArc(skillFromDB.data);
        console.log('killFromDB.data===', skillFromDB.data);
        const Expneses = skillFromDB.data
        const billArray = Expneses.map((str) => {return Number(str.Expenses)})
        const sumbills = billArray.reduce((a, b) => a = a + b, 0)
        setDisplayExpenses(sumbills)
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
      console.log('ArchiveRegisters===', ArchiveRegisters.data);
      if(ArchiveRegisters.data.changedRows === 1) {
        history.push('/')
      }
      }



      console.log('billsArc===', billsArc);
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
          <Button onClick={ArchiveRegisters} dissable={billsArc.length === 0}> Complete</Button>
          <h2>Total expenses:{displayExpenses === 0 ? 'Currently there is 0 expenses' : `$${displayExpenses}`}</h2>
          </div>
        </Container>
      );
    }

export default Bills