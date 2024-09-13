import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputMask from 'react-input-mask';
import { CiLocationOn } from "react-icons/ci";
import { FaSpinner } from 'react-icons/fa'; // Ícone de carregamento
import styles from './modalcep.module.css';

function ModalCep() {
  const [show, setShow] = useState(false);
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false); // Estado para controlar o ícone de carregamento no botão "Confirmar"
  const [error, setError] = useState(null);

  const handleClose = () => {
    setShow(false);
    setCep('');
    setAddress(null);
    setError(null);
    setConfirming(false); // Reseta o estado do botão "Confirmar"
  };
  const handleShow = () => setShow(true);

  const fetchAddress = async () => {
    if (cep.length === 9) { 
      setLoading(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (data.erro) {
          setAddress(null);
          setError('CEP não encontrado.');
        } else {
          setAddress(data);
          setError(null);
        }
      } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
        setAddress(null);
        setError('Erro ao buscar o CEP.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleConfirm = async () => {
    if (!address) {
      setError('Por favor, preencha um CEP válido.');
      return;
    }

    setConfirming(true); // Inicia o estado de carregamento do botão "Confirmar"

    const enderecoData = {
      cep: cep,   
      rua: address.logradouro,
      bairro: address.bairro,
      cidade: address.localidade,
      estado: address.uf,
      id_usuario: 1               
    };

    try {
      const response = await fetch('http://localhost:3000/adress/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enderecoData),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar o endereço.');
      }

      const data = await response.json();
      console.log('Endereço salvo com sucesso:', data);

      // Limpa o modal e os campos após sucesso
      handleClose();
    } catch (error) {
      console.error('Erro ao salvar o endereço:', error);
      setError('Erro ao salvar o endereço.');
    } finally {
      setConfirming(false); // Finaliza o estado de carregamento do botão "Confirmar"
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className={styles.btn_cep}>
        <p>Informe seu CEP <CiLocationOn /></p>
      </Button>

      <Modal show={show} onHide={handleClose} className={styles.modal_custom}>
        <Modal.Header closeButton className={styles.modal_header}>
          <Modal.Title>Selecione onde deseja receber suas compras</Modal.Title>
        </Modal.Header>
        <p className={styles.title}>
          Você poderá ver custos e prazos de entrega precisos em tudo que procurar.
        </p>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formCep">
              <Form.Label>CEP</Form.Label>
              <InputMask
                mask="99999-999" // Máscara de CEP
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                onBlur={fetchAddress}
                className="form-control"
              />
              {loading && <p>Carregando...</p>}
              {address && (
                <div>
                  <p><strong>Logradouro:</strong> {address.logradouro}</p>
                  <p><strong>Bairro:</strong> {address.bairro}</p>
                  <p><strong>Cidade:</strong> {address.localidade}</p>
                  <p><strong>Estado:</strong> {address.uf}</p>
                </div>
              )}
              {error && <p className="text-danger">{error}</p>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className={styles.modal_footer}>
          <Button variant="secondary" onClick={handleClose} className={styles.btn_cancelar}>
            Cancelar
          </Button>
          <Button 
            variant="primary" 
            onClick={handleConfirm} 
            className={styles.btn_confirmar}
            disabled={confirming} 
          >
            {confirming ? <FaSpinner className={styles.spinner_icon} /> : 'Confirmar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCep;
