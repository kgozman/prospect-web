'use client';
import Image from 'next/image'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import ProspectsList from './ProspectsList';
import SalesPipelineForm from './SalesPipelineForm';
import Modal from  './components/Modal';
import Nav from './components/Nav';

export default function Home() {

  const [data, setData] = useState(null);
  const [prospects, setProspects] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {setShowModal(true);}
  const closeModal = () => {
    console.log("Close Modal")
    setShowModal(false);
  }
  const [dataRefresh, setDataRefresh] = useState(false);
  const handleProspectAdded = () => {
    setDataRefresh(true);
  };
  
  useEffect( () => {                                                                                                                                                                                 
    const fetchData = async () => {
      console.log("response.data")
      try {
        const response = await axios.get('http://localhost:3001/api/sales-pipeline');
        setProspects( response.data);
      }catch(error) {
        console.log('Error fetching data: ', error);
      }
    }
    fetchData();
  }, [dataRefresh,showModal])


  useEffect(() => {
    if (dataRefresh) {
      // Logic to refresh data or perform other actions

      setDataRefresh(false); // Reset the flag
    }
  }, [dataRefresh]);
  const dialogRef = useRef(null); 

  return (
    <div>
      <Nav>
        <button className="btn" onClick={openModal}>Add</button>
      </Nav>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <ProspectsList prospects={prospects} />
      </main>
      <Modal showModal={showModal} onClose={closeModal}>
          <h3 className="font-bold text-lg pl-0">New Prospect</h3>
          <hr/><br/>
          <SalesPipelineForm onClose={closeModal}/>
      </Modal>
    </div>
  )
}
