import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CardList from "../../components/CardList/CardList";
import Button from "../../components/UI/Button/Button";
import Container from "../../components/UI/Container";
import Loading from "../../components/UI/Loading";
import { archiveFecth } from "../../helper/archiveFetch";
import { getFetch } from "../../helper/getFect";
import css from "../Bills/Bills.module.scss";

function Bills() {
  const history = useHistory();
  const { registerid } = useParams();
  const [billsArc, setBillsArc] = useState([]);
  const [storedBills, setStoredBills] = useState();
  const [storeArchives, setStoreArchives] = useState([]);
  const [displayExpenses, setDisplayExpenses] = useState("");
  const [expiredToken, setExpiredToken] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getBills();
  }, []);
  async function getBills() {
    setIsLoading(true)
    const skillFromDB = await getFetch(`bills/` + registerid);
    setBillsArc(skillFromDB.data);
    setExpiredToken(skillFromDB);
    const Expneses = skillFromDB.data;
    const billArray = Expneses.map((str) => {
      return Number(str.Expenses);
    });
    const sumbills = billArray.reduce((a, b) => (a = a + b), 0);
    setDisplayExpenses(sumbills);
    if (skillFromDB.data.length >= 1) {
      const storedData = skillFromDB.data[0].register;
      setStoredBills(storedData);
    }
    setIsLoading(false)
  }

  async function ArchiveRegisters() {
    const ArchiveRegisters = await archiveFecth(
      `accounts/setarchive/` + registerid
    );
    setStoreArchives(ArchiveRegisters);
    if (ArchiveRegisters.data.changedRows === 1) {
      history.push("/registrations");
    }
  }

  if (expiredToken.error === "invalid token") {
    alert("Your login time has expired");
    localStorage.removeItem("token");
    history.push("/");
  }

  if (localStorage.getItem("token") === null) {
    alert("you are not allowed to be here");
    history.push("/");
  }

  if (isLoading) {
    return (
      <div className={css.loading}>
        <Loading />
      </div>
    );
  }

  return (
    <Container>
      <div className={css.flex}>
        <Link to={`/AddBills/${registerid}`}>
          <Button Adds>Add Bills</Button>
        </Link>
        <h1>{storedBills === undefined ? null : `Register:${storedBills}`}</h1>
      </div>
      <CardList onDelete={getBills} cardType="bills" item={billsArc} />
      <div className={css.Expenses}>
        <h2>
          Total expenses:
          {displayExpenses === 0
            ? "Currently there is 0 expenses"
            : `$${displayExpenses}`}
        </h2>
      </div>
      <div className={css.flexbutton}>
        <Button onClick={ArchiveRegisters} dissable={billsArc.length === 0}>
          {" "}
          Complete
        </Button>
      </div>
    </Container>
  );
}

export default Bills;
