'use client';
import Image from 'next/image'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProspectsList from './ProspectsList';
import SalesPipelineForm from './SalesPipelineForm';
import Modal from  './components/Modal';

export default function Home() {

  const [data, setData] = useState(null);
  const [prospects, setProspects] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  
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
  }, [])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ProspectsList prospects={prospects} />
      <button onClick={openModal}>Add New Sales Pipeline</button>
      <Modal show={showModal} onClose={closeModal}>
        <SalesPipelineForm />
      </Modal>
    </main>
  )
}
