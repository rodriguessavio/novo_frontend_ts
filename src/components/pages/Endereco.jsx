import React, { useState, useEffect, useContext } from 'react';
import styles from './endereco.module.css';
import api from '../../utils/api';
import axios from 'axios';
import { Context } from '../../context/UserContext';
import EnderecoItem from './EnderecoItem'; 
import { useLocation, useNavigate } from 'react-router-dom';

const Endereco = () => {
  const { user } = useContext(Context); 
  const { state } = useLocation();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  
  // Função para buscar cidade e estado pelo CEP
  const fetchCityAndStateByCep = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      return {
        cidade: response.data.localidade,
        estado: response.data.uf,
      };
    } catch (error) {
      console.error('Error fetching data from ViaCEP:', error);
      return {
        cidade: 'Cidade não encontrada',
        estado: 'Estado não encontrado',
      };
    }
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await api.get('adress/list');
        const allAddresses = response.data.body;

        // Filtrar endereços do usuário logado
        const userAddresses = allAddresses.filter(
          (address) => address.id_usuario === user.id
        );

        // Buscar cidade e estado pelo CEP
        const updatedAddresses = await Promise.all(
          userAddresses.map(async (address) => {
            const cityState = await fetchCityAndStateByCep(address.cep);
            return {
              ...address,
              cidade: cityState.cidade,
              estado: cityState.estado,
            };
          })
        );

        setAddresses(updatedAddresses); 
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    if (user && user.id) {
      fetchAddresses();
    }
  }, [user]);

  const handleAddressSelection = (addressId) => {
    setSelectedAddressId(addressId);
  };

  const handleContinue = async () => {
    if (selectedAddressId) {
      try {
        // Busca todos os pedidos pendentes do usuário
        const response = await axios.get(`http://localhost:3000/order/list`);
        const todosResultados = response.data.body;

        // Filtra pedidos do usuário com status 'pendente'
        const pedidosUsuario = todosResultados.filter(
          pedido => pedido.id_pessoa === user.id_pessoa && pedido.status === 'pendente'
        );

        if (pedidosUsuario.length > 0) {
          const idPedido = pedidosUsuario[0].id;
          
          // Atualiza o pedido com o ID do endereço selecionado
          await axios.put(`http://localhost:3000/order/update/${idPedido}`, { id_endereco: selectedAddressId });
          
          // Navegar para a próxima página
          navigate('/pagamento', {
            state: {
              pedidos: state?.pedidos,
              total: state?.total
            }
          });
        } else {
          console.error('Não há pedidos pendentes para atualizar.');
        }
      } catch (error) {
        console.error('Erro ao atualizar o pedido:', error);
      }
    } else {
      console.error('Nenhum endereço selecionado.');
    }
  };

  return (
    <div>
      <div className={styles.corpo}>
        <h2 className={styles.title}>Escolha a forma de Entrega</h2>
        <div className={styles.conteudo_com_resumo}>
          <div className={styles.content}>  
            {addresses.map((address) => (
              <EnderecoItem
                key={address.id}
                address={address}
                onSelect={() => handleAddressSelection(address.id)}
                isSelected={selectedAddressId === address.id}
              />
            ))}
          </div>
          <div className={styles.resumo}>
            <center>
              <h3 className={styles.title}>Resumo da Compra</h3>
            </center>
            <div className={styles.dados}>
              <div className={styles.nomes}>
                <p>Produto({state?.pedidos.length})</p>
                <p>Total</p>
              </div>
              <div className={styles.desc}>
                <p>R${state?.total.toFixed(2)}</p>
                <p>R${state?.total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
        <button className={styles.btn_continuar} onClick={handleContinue}>Continuar</button>
      </div>
    </div>
  );
};

export default Endereco;
