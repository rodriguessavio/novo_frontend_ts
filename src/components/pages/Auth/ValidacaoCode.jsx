import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../../../context/UserContext'; 
import styles from './validacao.module.css';

function ValidacaoCode() {
  const [code, setCode] = useState(new Array(6).fill("")); 
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(299); 
  const { verifyEmail, user } = useContext(Context); 

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value.slice(-1);
    if (value.match(/^[a-zA-Z0-9]$/)) { 
      let newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      
      if (index < 5 && value !== "") {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Verifica se o código e o email estão preenchidos
    const verificationCode = code.join("");
    console.log(user);
    if (!email) {
      setError("Email não encontrado.");
      console.log(email);
      return;
    }
    if (verificationCode.length < 6) {
      setError("Código de verificação inválido.");
      return;
    }

    setError(""); 

    
    verifyEmail({ email, verificationCode });
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.infor}>
        <p className={styles.t1}>Insira o código enviado por e-mail</p>
        <p className={styles.emailText}>Enviamos o código para o email associado à sua conta: <strong>{email}</strong></p>
        <form className={styles.formulario_code} onSubmit={handleSubmit}>
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              maxLength={1}
              className={styles.input_digit}
            />
          ))}
          <button type="submit" className={styles.btn_enviar}>Enviar Código</button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.footer}>
         
          <p className={styles.timer}>{formatTime(timer)}</p>
        </div>
      </div>
    </div>
  );
}

export default ValidacaoCode;
